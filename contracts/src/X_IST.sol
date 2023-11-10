// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {ERC20} from "oz/token/ERC20/ERC20.sol";

contract X_IST is ERC20 {
    uint256 public constant MAX_TOTAL_MINTS = 3202;
    uint256 public constant MAX_MINTS_PER_EPOCH = 15;
    uint256 internal constant EPOCH_PERIOD = 25; // each epoch = 25 blocks (5 mins)
    uint256 internal constant MIN_MINT_AMT = 400e18;
    uint256 internal constant MAX_MINT_AMT = 600e18;
    uint256 public numMints;
    uint256 internal gameStartTime;
    uint256 public gameEndTime;
    address public owner;
    address public pixelsMap;
    mapping (uint256 => uint256) mintsInEpoch;

    constructor(uint256 _gameStartTime, uint256 _gameEndTime) ERC20("TrustX-Istanbul", "X_IST") {
        owner = msg.sender;
        gameStartTime = _gameStartTime;
        gameEndTime = _gameEndTime;
    }

    function setPixelsMap(address _pixelsMap) external {
        require(msg.sender == owner, "unauthorized");
        pixelsMap = _pixelsMap;
    }

    function setGameEndTime(uint256 _gameEndTime) external {
        require(msg.sender == owner, "unauthorized");
        gameEndTime = _gameEndTime;
    }

    /// @dev mint pseudorandom amount 
    /// has a mint cap and is rate limited, will NOT mint if either limit is exceeded
    /// also mints 2x amount to pixelMap
    function mint(address to) external {
        require(msg.sender == pixelsMap, "unauthorized");
        require(block.timestamp >= gameStartTime, "too early");
        if (++numMints > MAX_TOTAL_MINTS || ++mintsInEpoch[block.number / EPOCH_PERIOD] > MAX_MINTS_PER_EPOCH) return;
        // calculate random amount to mint
        uint256 seed = uint256(keccak256(abi.encodePacked(to, block.number)));
        uint256 mintAmt = seed % (MAX_MINT_AMT - MIN_MINT_AMT) + MIN_MINT_AMT;
        _mint(to, mintAmt);
        _mint(msg.sender, mintAmt * 2);
    }

    function mint(address to, uint256 amt) external {
        require(msg.sender == pixelsMap, "unauthorized");
        _mint(to, amt);
    }

    function getRemainingMints(uint256 blockNumber) external view returns (
        uint256 epochNum,
        uint256 epochMintsRemaining,
        uint256 totalMintsRemaining
    ) {
        blockNumber != 0 ? blockNumber : block.number;
        epochNum = blockNumber / EPOCH_PERIOD;
        epochMintsRemaining = MAX_MINTS_PER_EPOCH - mintsInEpoch[epochNum];
        totalMintsRemaining = MAX_TOTAL_MINTS - numMints;
    }
}
