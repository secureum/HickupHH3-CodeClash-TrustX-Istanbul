import { parseAbi } from 'viem'


const PixelsMapAbi = [
  "struct PixelData { address miner; uint32 numMinerInstancesOverwritten; uint32 numColorInstancesOverwritten; uint8 colorTeamNumber; uint8 color; }",
  "function addressRegistrar(address user) external view returns (uint8 teamNumber)",
  "function teamNames(uint8 teamNumber) external view returns (string memory teamName)", 
  "function getTeamNumbers(address[] calldata users) external view returns (uint8[] memory teamNumbers)",
  "function getTeamNames(uint8[] calldata teamNumbers) external view returns (string[] memory teams)",

  "function getSinglePixelData(uint8 pixel) external view returns (PixelData memory)",
  "function getRangePixelData(uint8 startPixel, uint8 endPixel) external view returns (PixelData[] memory)",
  "function getMultiplePixelData(uint8[] calldata pixels) external view returns (PixelData[] memory)",

  "function register(uint8 teamNumber) external",
  "function setTeamName(string calldata teamName) external",
  "function placePixels(uint8[] calldata pixels, uint8[] calldata colors, bool hook, bytes calldata data) external",
  "function placeMines(uint8[] calldata pixels) external",
  "function resetPixels(uint8[] calldata pixels) external",
]

export const PixelsMap = parseAbi(PixelsMapAbi);


const xistAbi = [
  "function getRemainingMints(uint256 blockNumber) external view returns (uint256 epochNum, uint256 epochMintsRemaining, uint256 totalMintsRemaining)",
  "function gameEndTime() external view returns (uint256)"
]

export const Xist = parseAbi(xistAbi);

export const contractAddresses = {
  XIST: '0x148412086B279215e2F7feC41A912cBcE4B4c37f',
  pixelsMap: '0xEA6D13B779583edfA3ea1198ceDFd05F7Cf1bfd3'
}