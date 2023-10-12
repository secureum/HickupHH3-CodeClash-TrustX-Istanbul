// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

interface IPixelsMap {
    struct PixelData {
        address miner;
        uint32 numMinerInstancesOverwritten;
        uint32 numColorInstancesOverwritten;
        uint8 colorTeamNumber;
        uint8 color;    
    }

    /*************
    *** ERRORS ***
    *************/
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

    /**************
    *** GETTERS ***
    **************/
    function addressRegistrar(address user) external view returns (uint8 teamNumber);
    function getTeamNumbers(address[] calldata users) external view returns (uint8[] memory teamNumbers);
    function getTeamNames(uint8[] calldata teamNumbers) external view returns (string[] memory teams);

    function getSinglePixelData(uint8 pixel) external view returns (PixelData memory);
    /// range is [startPixel, endPixel)
    function getRangePixelData(uint8 startPixel, uint8 endPixel) external view returns (PixelData[] memory);
    function getMultiplePixelData(uint8[] calldata pixels) external view returns (PixelData[] memory);

    /***********************
    *** PUBLIC FUNCTIONS ***
    ************************/
    function register(uint8 teamNumber) external;
    function setTeamName(string calldata teamName) external;
    // inspired by UniV4, introduce hook
    function placePixels(uint8[] calldata pixels, uint8[] calldata colors, bool hook, bytes calldata data) external;
    function placeMines(uint8[] calldata pixels) external;
    function resetPixels(uint8[] calldata pixels) external;
}