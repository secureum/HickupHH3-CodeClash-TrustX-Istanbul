// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/PixelsMap.sol";

contract DeployScript is Script {
    error FailedDeployment();

    // XIST = X_IST();
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        X_IST XIST = new X_IST(1700006399);
        console.log("XIST addr:", address(XIST));
        PixelsMap pixelsMap;
        // use create2 just in case someone manages to destroy the contract
        pixelsMap = new PixelsMap{salt: bytes32(uint256(0x747275737458506978656c57617273))}(XIST);
        console.log("pixelsMap addr:", address(pixelsMap));
        XIST.setPixelsMap(address(pixelsMap));
        vm.stopBroadcast();
    }
}
