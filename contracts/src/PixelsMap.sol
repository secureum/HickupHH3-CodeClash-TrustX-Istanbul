// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {X_IST} from "./X_IST.sol";
import {IPixelsMap} from "./IPixelsMap.sol";
import {SafeERC20} from "oz/token/ERC20/utils/SafeERC20.sol";

contract PixelsMap is IPixelsMap {
    using SafeERC20 for X_IST;

    uint256 public constant MAX_ACTION_COUNT = 10;
    uint256 public constant GAS_UNIT_COST = 1e16;
    uint256 public constant INIT_COST = 200e18;
    uint256 public constant REPLACEMENT_COST = 25e18;
    uint256 public constant REFUND_COST = 120e18;
    uint256 public constant MINE_EFFECT_MULTIPLIER = 2;
    uint256 public constant MAX_TEAM_NAME_LENGTH = 16;
    X_IST public immutable XIST;

    mapping(uint8 => PixelData) internal pixelsMap;
    mapping(address => uint8) public addressRegistrar; 
    mapping(uint8 => string) public teamNames;
    mapping(uint8 => uint8) public teamActionsCount;

    // Errors
    error AlreadyRegistered();
    error GameEnded();
    error CallFailed();
    error MaxActionsPlayed();
    error NotRegistered();
    error BadTeamNumber();
    error PixelNoChange(uint8 pixel);
    error RegistrationsEnded();
    error TeamNameAlreadySet();
    error BadTeamName();
    
    constructor(X_IST _XIST) {
        XIST = _XIST;
    }

    modifier gameIsOngoing() {
        uint256 gameEndTime = XIST.gameEndTime();
        uint8 teamNumber = getTeamNumber(msg.sender);
        if (block.timestamp > gameEndTime) revert GameEnded();
        else if (block.timestamp + 4 hours > gameEndTime) {
            // number of actions are capped in the final phase
            if (teamActionsCount[teamNumber] > MAX_ACTION_COUNT) revert MaxActionsPlayed();
        }
        _;
        if (block.timestamp + 4 hours > gameEndTime) ++teamActionsCount[teamNumber];
    }

    /// @dev user must be registered
    function getTeamNumber(address user) public view returns (uint8 teamNumber) {
        teamNumber = addressRegistrar[user];
        if (teamNumber == 0) revert NotRegistered();
    }

    /// @dev capped at 100 teams
    function register(uint8 teamNumber) external {
        if (block.timestamp + 4 hours > XIST.gameEndTime()) revert RegistrationsEnded();
        if (teamNumber == 0 || teamNumber > 100) revert BadTeamNumber();
        if (addressRegistrar[msg.sender] != 0) revert AlreadyRegistered();
        addressRegistrar[msg.sender] = teamNumber;
        XIST.mint(msg.sender);
    }

    /// @dev can only be set once
    function setTeamName(string calldata teamName) external {
        uint8 teamNumber = getTeamNumber(msg.sender);
        bytes memory storedTeamName = bytes(teamNames[teamNumber]);
        if (keccak256(storedTeamName) != keccak256("")) revert TeamNameAlreadySet();
        if (bytes(teamName).length > MAX_TEAM_NAME_LENGTH) revert BadTeamName();
        teamNames[teamNumber] = teamName;
    }

    function placePixels(
        uint8[] calldata pixels,
        uint8[] calldata colors,
        bool hook,
        bytes calldata data
    ) public gameIsOngoing {
        uint256 preGasLeft = gasleft();
        // hook with < 5k gas limit
        if (hook) {
            (bool success, ) = msg.sender.delegatecall{gas: 4999}(
                abi.encodeWithSignature(
                    "placePixelsHook(uint8[],uint8[],bytes)",
                    pixels,
                    colors,
                    data
                )
            );
            if (!success) revert CallFailed();
        }

        uint256 postGasLeft = gasleft();
        uint256 gasConsumptionCost = hook ? GAS_UNIT_COST * (preGasLeft - postGasLeft) : 0;

        uint256 totalPayable = gasConsumptionCost;
        uint8 teamNumber = _validateTeam(msg.sender);
        for (uint i; i < pixels.length; ++i) {
            // bitmasking on pixels[i] to keep it within 8x8 pixel map
            // bitmasking on colors[i] to keep it within 16 colors
            totalPayable += _processPlacePixels(pixels[i] & 63, colors[i] & 15, teamNumber);
        }
        XIST.safeTransferFrom(msg.sender, address(this), totalPayable);
    }

    function _validateTeam(address user) internal view returns (uint8 teamNumber) {
        teamNumber = getTeamNumber(user);
        bytes memory storedTeamName = bytes(teamNames[teamNumber]);
        if (
            storedTeamName.length > MAX_TEAM_NAME_LENGTH ||
            keccak256(storedTeamName) == keccak256("")
        ) revert BadTeamName();
    }

    function _processPlacePixels(
        uint8 pixel,
        uint8 color,
        uint8 teamNumber
    ) internal returns (uint256 amtPayable) {
        PixelData storage data = pixelsMap[pixel];
        // math ops unlikely to encounter overflow
        unchecked {
            uint256 numTimesOverwritten = data.numColorInstancesOverwritten++;
            // replacement base cost is cheaper, but is dependent on no. of times it's been overwritten
            amtPayable = (numTimesOverwritten == 0) ?
                INIT_COST :
                numTimesOverwritten * REPLACEMENT_COST;
        }
        
        // there must be a change occurring
        if (data.color == color && data.colorTeamNumber == teamNumber) revert PixelNoChange(pixel);

        // check if pixel is mined
        // if miner is diff team as msg.sender, miner receives amtPayable * MINE_EFFECT_MULTIPLIER (up to this contract's balance)
        address miner = data.miner;
        if (miner != address(0) && _validateTeam(miner) != teamNumber) {
            amtPayable *= MINE_EFFECT_MULTIPLIER;
            _processPayment(data.miner, amtPayable);
            // reset miner
            data.miner = address(0);
            data.numMinerInstancesOverwritten = 0;
        }

        // replace color & teamNumber
        if (data.color != color) data.color = color;
        if (data.colorTeamNumber != teamNumber) data.colorTeamNumber = teamNumber;
    }

    /// transfers whatever up to this contract's balance
    function _processPayment(address recipient, uint256 amt) internal {
        XIST.safeTransfer(
            recipient,
            XIST.balanceOf(address(this)) >= amt ?
                amt :
                XIST.balanceOf(address(this))
        );
    }

    function placeMines(uint8[] calldata pixels) public gameIsOngoing {
        _validateTeam(msg.sender);
        uint256 totalPayable;
        for (uint i; i < pixels.length; ++i) {
            // bitmasking on pixels[i] to keep it within 8x8 pixel map
            PixelData storage data = pixelsMap[pixels[i] & 63];
            uint256 mineCost;
            // math ops unlikely to encounter overflow
            unchecked {
                uint256 numTimesOverwritten = data.numMinerInstancesOverwritten++;
                // replacement base cost is cheaper, but is dependent on no. of times it's been overwritten
                mineCost = (numTimesOverwritten == 0) ?
                    INIT_COST :
                    numTimesOverwritten * REPLACEMENT_COST;
            }

            address currentMiner = data.miner;
            // if no existing miner, fixed cost
            if (currentMiner == address(0)) {
                totalPayable += mineCost;
                data.miner = msg.sender;
                continue;
            }
            
            // current miner can choose to pay at least 1/2 of mineCost to bidder to retain position
            uint256 preBal = XIST.balanceOf(msg.sender);
            (bool success, ) = currentMiner.delegatecall{gas: 4999}(abi.encodeWithSignature("incomingBid(address,uint256)", msg.sender, mineCost));
            if (!success) revert CallFailed();
            uint256 postBal = XIST.balanceOf(msg.sender);
    
            // replace miner if current miner fails to transfer sufficient tokens to new miner
            if (postBal - preBal < mineCost / 2) {
                totalPayable += mineCost;
                data.miner = msg.sender;
            }
        }
        XIST.safeTransferFrom(msg.sender, address(this), totalPayable);
    }

    function resetPixels(uint8[] calldata pixels) public gameIsOngoing {
        uint8 teamNumber = _validateTeam(msg.sender);
        uint256 totalRefund;
        for (uint i; i < pixels.length; ++i) {
            PixelData storage data = pixelsMap[pixels[i]];
            // only reset pixels that team drew on
            if (data.colorTeamNumber != teamNumber) continue;
            totalRefund += REFUND_COST;
            // miner gets MULTIPLIER * REFUND_COST if on different team
            address miner = data.miner;
            if (miner != address(0) && _validateTeam(miner) != teamNumber) {
                _processPayment(miner, MINE_EFFECT_MULTIPLIER * REFUND_COST);
            }
            // finally, reset pixel
            delete pixelsMap[pixels[i]];
        }
        _processPayment(msg.sender, totalRefund);
    }

    /**************
    *** GETTERS ***
    **************/
    function getTeamNumbers(address[] calldata users) external view returns (uint8[] memory teamNumbers) {
        uint256 arrLength = users.length;
        teamNumbers = new uint8[](arrLength);
        for (uint256 i; i < arrLength; ++i) {
            teamNumbers[i] = addressRegistrar[users[i]];
        }
    }

    function getTeamNames(uint8[] calldata teamNumbers) external view returns (string[] memory teams) {
        uint256 arrLength = teamNumbers.length;
        teams = new string[](arrLength);
        for (uint256 i; i < arrLength; ++i) {
            teams[i] = teamNames[teamNumbers[i]];
        }
    }

    function getSinglePixelData(uint8 pixel) external view returns (PixelData memory) {
        return pixelsMap[pixel];
    }

    function getRangePixelData(uint8 startPixel, uint8 endPixel) external view returns (PixelData[] memory result) {
        uint256 arrLength = endPixel - startPixel;
        result = new PixelData[](arrLength);
        for (uint8 i = startPixel; i < endPixel; ++i) {
            result[i] = pixelsMap[i];
        }
    }

    function getMultiplePixelData(uint8[] calldata pixels) external view returns (PixelData[] memory result) {
        result = new PixelData[](pixels.length);
        for (uint i; i < pixels.length; ++i) {
            result[i] = pixelsMap[pixels[i]];
        }
    }
}
