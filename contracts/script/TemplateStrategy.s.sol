// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/TemplateStrategy.sol";

contract StrategyScript is Script {
    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        uint16 teamNum = 10;
        string memory teamName = "TEMPLATE";
        TemplateStrategy strategy = new TemplateStrategy(teamNum, teamName);
        console.log("strategy addr:", address(strategy));
        vm.stopBroadcast();
    }
}
