// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {IPixelsMap} from "./IPixelsMap.sol";
import {X_IST} from "./X_IST.sol";

contract Boilerplate {
    X_IST XIST = X_IST(0x148412086B279215e2F7feC41A912cBcE4B4c37f);
    IPixelsMap map = IPixelsMap(0x7b1E6F8771adeDFE06bad75980292d2068F55Ab4);

    // registration
    constructor(uint8 teamNum, string memory teamName) {
        map.register(teamNum);
        map.setTeamName(teamName);
        XIST.approve(address(map), type(uint256).max);
    }

    function drawPixels(
        uint8[] calldata pixels,
        uint8[] calldata colors,
        bytes calldata data
    ) external {
        map.placePixels(pixels, colors, true, data);
    }

    function placeMines(uint8[] calldata pixels) external {
        map.placeMines(pixels);
    }

    function resetPixels(uint8[] calldata pixels) external {
        map.resetPixels(pixels);
    }

    function placePixelsHook(
        uint8[] calldata /* pixels */,
        uint8[] calldata /* colors */,
        bytes calldata data) public {
    }
}