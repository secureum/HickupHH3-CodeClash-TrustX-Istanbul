// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {IPixelsMap} from "./IPixelsMap.sol";
import {X_IST} from "./X_IST.sol";

contract TemplateStrategy {
    X_IST XIST = X_IST(0x148412086B279215e2F7feC41A912cBcE4B4c37f);
    IPixelsMap map = IPixelsMap(0x5D98D16BCd69aEf78474a4591e1f50B6c6C55Ca7);

    // registration
    constructor(uint16 teamNum, string memory teamName) {
        map.register(teamNum);
        map.setTeamName(teamName);
        XIST.approve(address(map), type(uint256).max);
        uint8[] memory pixels = new uint8[](1);
        pixels[0] = 10;
        uint8[] memory colors = new uint8[](1);
        colors[0] = 12;
        map.placePixels(pixels, colors, false, "");
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