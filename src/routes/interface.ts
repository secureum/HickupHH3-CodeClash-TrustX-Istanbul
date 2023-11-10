import { parseAbi } from 'viem'


const PixelsMapAbi = [
  "struct PixelData { address miner; uint32 numMinerInstancesOverwritten; uint32 numColorInstancesOverwritten; uint8 colorTeamNumber; uint8 color; }",
  "function addressRegistrar(address user) external view returns (uint16 teamNumber)",
  "function teamNames(uint16 teamNumber) external view returns (string memory teamName)", 
  "function getTeamNumbers(address[] calldata users) external view returns (uint16[] memory teamNumbers)",
  "function getTeamNames(uint16[] calldata teamNumbers) external view returns (string[] memory teams)",

  "function getSinglePixelData(uint8 pixel) external view returns (PixelData memory)",
  "function getRangePixelData(uint8 startPixel, uint8 endPixel) external view returns (PixelData[] memory)",
  "function getMultiplePixelData(uint8[] calldata pixels) external view returns (PixelData[] memory)",

  "function register(uint16 teamNumber) external",
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
  pixelsMap: '0x5D98D16BCd69aEf78474a4591e1f50B6c6C55Ca7'
}