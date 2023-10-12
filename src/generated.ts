import {
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractRead,
  UseContractReadConfig,
  useContractEvent,
  UseContractEventConfig,
  useNetwork,
  useChainId,
  Address,
} from 'wagmi'
import {
  WriteContractMode,
  PrepareWriteContractResult,
  ReadContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Boilerplate
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const boilerplateABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'teamNum', internalType: 'uint8', type: 'uint8' },
      { name: 'teamName', internalType: 'string', type: 'string' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'pixels', internalType: 'uint8[]', type: 'uint8[]' },
      { name: 'colors', internalType: 'uint8[]', type: 'uint8[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'drawPixels',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'pixels', internalType: 'uint8[]', type: 'uint8[]' }],
    name: 'placeMines',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint8[]', type: 'uint8[]' },
      { name: '', internalType: 'uint8[]', type: 'uint8[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'placePixelsHook',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'pixels', internalType: 'uint8[]', type: 'uint8[]' }],
    name: 'resetPixels',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20ABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20MetadataABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Permit
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20PermitABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IPixelsMap
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const iPixelsMapABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'addressRegistrar',
    outputs: [{ name: 'teamNumber', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'pixels', internalType: 'uint8[]', type: 'uint8[]' }],
    name: 'getMultiplePixelData',
    outputs: [
      {
        name: '',
        internalType: 'struct IPixelsMap.PixelData[]',
        type: 'tuple[]',
        components: [
          { name: 'miner', internalType: 'address', type: 'address' },
          {
            name: 'numMinerInstancesOverwritten',
            internalType: 'uint32',
            type: 'uint32',
          },
          {
            name: 'numColorInstancesOverwritten',
            internalType: 'uint32',
            type: 'uint32',
          },
          { name: 'colorTeamNumber', internalType: 'uint8', type: 'uint8' },
          { name: 'color', internalType: 'uint8', type: 'uint8' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'startPixel', internalType: 'uint8', type: 'uint8' },
      { name: 'endPixel', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'getRangePixelData',
    outputs: [
      {
        name: '',
        internalType: 'struct IPixelsMap.PixelData[]',
        type: 'tuple[]',
        components: [
          { name: 'miner', internalType: 'address', type: 'address' },
          {
            name: 'numMinerInstancesOverwritten',
            internalType: 'uint32',
            type: 'uint32',
          },
          {
            name: 'numColorInstancesOverwritten',
            internalType: 'uint32',
            type: 'uint32',
          },
          { name: 'colorTeamNumber', internalType: 'uint8', type: 'uint8' },
          { name: 'color', internalType: 'uint8', type: 'uint8' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'pixel', internalType: 'uint8', type: 'uint8' }],
    name: 'getSinglePixelData',
    outputs: [
      {
        name: '',
        internalType: 'struct IPixelsMap.PixelData',
        type: 'tuple',
        components: [
          { name: 'miner', internalType: 'address', type: 'address' },
          {
            name: 'numMinerInstancesOverwritten',
            internalType: 'uint32',
            type: 'uint32',
          },
          {
            name: 'numColorInstancesOverwritten',
            internalType: 'uint32',
            type: 'uint32',
          },
          { name: 'colorTeamNumber', internalType: 'uint8', type: 'uint8' },
          { name: 'color', internalType: 'uint8', type: 'uint8' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'teamNumbers', internalType: 'uint8[]', type: 'uint8[]' }],
    name: 'getTeamNames',
    outputs: [{ name: 'teams', internalType: 'string[]', type: 'string[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'users', internalType: 'address[]', type: 'address[]' }],
    name: 'getTeamNumbers',
    outputs: [
      { name: 'teamNumbers', internalType: 'uint8[]', type: 'uint8[]' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'pixels', internalType: 'uint8[]', type: 'uint8[]' }],
    name: 'placeMines',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'pixels', internalType: 'uint8[]', type: 'uint8[]' },
      { name: 'colors', internalType: 'uint8[]', type: 'uint8[]' },
      { name: 'hook', internalType: 'bool', type: 'bool' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'placePixels',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'teamNumber', internalType: 'uint8', type: 'uint8' }],
    name: 'register',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'pixels', internalType: 'uint8[]', type: 'uint8[]' }],
    name: 'resetPixels',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'teamName', internalType: 'string', type: 'string' }],
    name: 'setTeamName',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'teamNumber', internalType: 'uint8', type: 'uint8' }],
    name: 'teamNames',
    outputs: [{ name: 'teamName', internalType: 'string', type: 'string' }],
  },
] as const

/**
 *
 */
export const iPixelsMapAddress = {
  11791: '0x7b1E6F8771adeDFE06bad75980292d2068F55Ab4',
  31337: '0x7b1E6F8771adeDFE06bad75980292d2068F55Ab4',
} as const

/**
 *
 */
export const iPixelsMapConfig = {
  address: iPixelsMapAddress,
  abi: iPixelsMapABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MoneyPrinter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const moneyPrinterABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_xist', internalType: 'contract X_IST', type: 'address' },
      { name: '_map', internalType: 'contract IPixelsMap', type: 'address' },
      { name: 'printerTeamNum', internalType: 'uint8', type: 'uint8' },
      { name: 'overwriterTeamNum', internalType: 'uint8', type: 'uint8' },
      { name: 'printerTeamName', internalType: 'string', type: 'string' },
      { name: 'overwriterTeamName', internalType: 'string', type: 'string' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'GAS_UNIT_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'INIT_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_ACTION_COUNT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_TEAM_NAME_LENGTH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MINE_EFFECT_MULTIPLIER',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'REFUND_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'REPLACEMENT_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'XIST',
    outputs: [{ name: '', internalType: 'contract X_IST', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'addressRegistrar',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'pixels', internalType: 'uint8[]', type: 'uint8[]' },
      { name: 'colors', internalType: 'uint8[]', type: 'uint8[]' },
    ],
    name: 'brrrr',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'overwriter',
    outputs: [
      { name: '', internalType: 'contract PixelOverwriter', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'teamActionsCount',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'teamNames',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'withdrawToken',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PixelOverwriter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pixelOverwriterABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_xist', internalType: 'contract X_IST', type: 'address' },
      { name: '_map', internalType: 'contract IPixelsMap', type: 'address' },
      { name: 'teamNum', internalType: 'uint8', type: 'uint8' },
      { name: 'teamName', internalType: 'string', type: 'string' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'GAS_UNIT_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'INIT_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_ACTION_COUNT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_TEAM_NAME_LENGTH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MINE_EFFECT_MULTIPLIER',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'REFUND_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'REPLACEMENT_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'XIST',
    outputs: [{ name: '', internalType: 'contract X_IST', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'addressRegistrar',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'pixelNums', internalType: 'uint8[]', type: 'uint8[]' }],
    name: 'overwritePixels',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint8[]', type: 'uint8[]' },
      { name: '', internalType: 'uint8[]', type: 'uint8[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'placePixelsHook',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    name: 'teamActionsCount',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    name: 'teamNames',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'withdrawToken',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PixelsMap
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pixelsMapABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_XIST', internalType: 'contract X_IST', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'AlreadyRegistered' },
  { type: 'error', inputs: [], name: 'BadTeamName' },
  { type: 'error', inputs: [], name: 'BadTeamNumber' },
  { type: 'error', inputs: [], name: 'CallFailed' },
  { type: 'error', inputs: [], name: 'GameEnded' },
  { type: 'error', inputs: [], name: 'MaxActionsPlayed' },
  { type: 'error', inputs: [], name: 'NotRegistered' },
  {
    type: 'error',
    inputs: [{ name: 'pixel', internalType: 'uint8', type: 'uint8' }],
    name: 'PixelNoChange',
  },
  { type: 'error', inputs: [], name: 'RegistrationsEnded' },
  { type: 'error', inputs: [], name: 'TeamNameAlreadySet' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'GAS_UNIT_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'INIT_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_ACTION_COUNT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_TEAM_NAME_LENGTH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MINE_EFFECT_MULTIPLIER',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'REFUND_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'REPLACEMENT_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'XIST',
    outputs: [{ name: '', internalType: 'contract X_IST', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'addressRegistrar',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'pixels', internalType: 'uint8[]', type: 'uint8[]' }],
    name: 'getMultiplePixelData',
    outputs: [
      {
        name: 'result',
        internalType: 'struct IPixelsMap.PixelData[]',
        type: 'tuple[]',
        components: [
          { name: 'miner', internalType: 'address', type: 'address' },
          {
            name: 'numMinerInstancesOverwritten',
            internalType: 'uint32',
            type: 'uint32',
          },
          {
            name: 'numColorInstancesOverwritten',
            internalType: 'uint32',
            type: 'uint32',
          },
          { name: 'colorTeamNumber', internalType: 'uint8', type: 'uint8' },
          { name: 'color', internalType: 'uint8', type: 'uint8' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'startPixel', internalType: 'uint8', type: 'uint8' },
      { name: 'endPixel', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'getRangePixelData',
    outputs: [
      {
        name: 'result',
        internalType: 'struct IPixelsMap.PixelData[]',
        type: 'tuple[]',
        components: [
          { name: 'miner', internalType: 'address', type: 'address' },
          {
            name: 'numMinerInstancesOverwritten',
            internalType: 'uint32',
            type: 'uint32',
          },
          {
            name: 'numColorInstancesOverwritten',
            internalType: 'uint32',
            type: 'uint32',
          },
          { name: 'colorTeamNumber', internalType: 'uint8', type: 'uint8' },
          { name: 'color', internalType: 'uint8', type: 'uint8' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'pixel', internalType: 'uint8', type: 'uint8' }],
    name: 'getSinglePixelData',
    outputs: [
      {
        name: '',
        internalType: 'struct IPixelsMap.PixelData',
        type: 'tuple',
        components: [
          { name: 'miner', internalType: 'address', type: 'address' },
          {
            name: 'numMinerInstancesOverwritten',
            internalType: 'uint32',
            type: 'uint32',
          },
          {
            name: 'numColorInstancesOverwritten',
            internalType: 'uint32',
            type: 'uint32',
          },
          { name: 'colorTeamNumber', internalType: 'uint8', type: 'uint8' },
          { name: 'color', internalType: 'uint8', type: 'uint8' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'teamNumbers', internalType: 'uint8[]', type: 'uint8[]' }],
    name: 'getTeamNames',
    outputs: [{ name: 'teams', internalType: 'string[]', type: 'string[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'getTeamNumber',
    outputs: [{ name: 'teamNumber', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'users', internalType: 'address[]', type: 'address[]' }],
    name: 'getTeamNumbers',
    outputs: [
      { name: 'teamNumbers', internalType: 'uint8[]', type: 'uint8[]' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'pixels', internalType: 'uint8[]', type: 'uint8[]' }],
    name: 'placeMines',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'pixels', internalType: 'uint8[]', type: 'uint8[]' },
      { name: 'colors', internalType: 'uint8[]', type: 'uint8[]' },
      { name: 'hook', internalType: 'bool', type: 'bool' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'placePixels',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'teamNumber', internalType: 'uint8', type: 'uint8' }],
    name: 'register',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'pixels', internalType: 'uint8[]', type: 'uint8[]' }],
    name: 'resetPixels',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'teamName', internalType: 'string', type: 'string' }],
    name: 'setTeamName',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    name: 'teamActionsCount',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    name: 'teamNames',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TeamNameMesser
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const teamNameMesserABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_xist', internalType: 'contract X_IST', type: 'address' },
      { name: '_map', internalType: 'contract IPixelsMap', type: 'address' },
      { name: 'teamNum', internalType: 'uint8', type: 'uint8' },
      { name: 'teamName', internalType: 'string', type: 'string' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'GAS_UNIT_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'INIT_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_ACTION_COUNT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_TEAM_NAME_LENGTH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MINE_EFFECT_MULTIPLIER',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'REFUND_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'REPLACEMENT_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'XIST',
    outputs: [{ name: '', internalType: 'contract X_IST', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'addressRegistrar',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'team', internalType: 'uint8', type: 'uint8' },
      { name: 'teamName', internalType: 'string', type: 'string' },
      { name: 'pixels', internalType: 'uint8[]', type: 'uint8[]' },
      { name: 'colors', internalType: 'uint8[]', type: 'uint8[]' },
    ],
    name: 'messUpTeamName',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint8[]', type: 'uint8[]' },
      { name: '', internalType: 'uint8[]', type: 'uint8[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'placePixelsHook',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    name: 'teamActionsCount',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    name: 'teamNames',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TeamNumChanger
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const teamNumChangerABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_xist', internalType: 'contract X_IST', type: 'address' },
      { name: '_map', internalType: 'contract IPixelsMap', type: 'address' },
      { name: 'teamNum', internalType: 'uint8', type: 'uint8' },
      { name: 'teamName', internalType: 'string', type: 'string' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'GAS_UNIT_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'INIT_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_ACTION_COUNT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_TEAM_NAME_LENGTH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MINE_EFFECT_MULTIPLIER',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'REFUND_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'REPLACEMENT_COST',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'XIST',
    outputs: [{ name: '', internalType: 'contract X_IST', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'addressRegistrar',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'newTeam', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'changeTeamNumber',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint8[]', type: 'uint8[]' },
      { name: '', internalType: 'uint8[]', type: 'uint8[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'placePixelsHook',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    name: 'teamActionsCount',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    name: 'teamNames',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// X_IST
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const xIstABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_gameEndTime', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_MINTS_PER_EPOCH',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_TOTAL_MINTS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'gameEndTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getRemainingMints',
    outputs: [
      { name: 'epochNum', internalType: 'uint256', type: 'uint256' },
      { name: 'epochMintsRemaining', internalType: 'uint256', type: 'uint256' },
      { name: 'totalMintsRemaining', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amt', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'numMints',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'pixelsMap',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_gameEndTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setGameEndTime',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_pixelsMap', internalType: 'address', type: 'address' }],
    name: 'setPixelsMap',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

/**
 *
 */
export const xIstAddress = {
  11791: '0x148412086B279215e2F7feC41A912cBcE4B4c37f',
  31337: '0x148412086B279215e2F7feC41A912cBcE4B4c37f',
} as const

/**
 *
 */
export const xIstConfig = { address: xIstAddress, abi: xIstABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boilerplateABI}__.
 */
export function useBoilerplateWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boilerplateABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof boilerplateABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof boilerplateABI, TFunctionName, TMode>({
    abi: boilerplateABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boilerplateABI}__ and `functionName` set to `"drawPixels"`.
 */
export function useBoilerplateDrawPixels<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boilerplateABI,
          'drawPixels'
        >['request']['abi'],
        'drawPixels',
        TMode
      > & { functionName?: 'drawPixels' }
    : UseContractWriteConfig<typeof boilerplateABI, 'drawPixels', TMode> & {
        abi?: never
        functionName?: 'drawPixels'
      } = {} as any,
) {
  return useContractWrite<typeof boilerplateABI, 'drawPixels', TMode>({
    abi: boilerplateABI,
    functionName: 'drawPixels',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boilerplateABI}__ and `functionName` set to `"placeMines"`.
 */
export function useBoilerplatePlaceMines<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boilerplateABI,
          'placeMines'
        >['request']['abi'],
        'placeMines',
        TMode
      > & { functionName?: 'placeMines' }
    : UseContractWriteConfig<typeof boilerplateABI, 'placeMines', TMode> & {
        abi?: never
        functionName?: 'placeMines'
      } = {} as any,
) {
  return useContractWrite<typeof boilerplateABI, 'placeMines', TMode>({
    abi: boilerplateABI,
    functionName: 'placeMines',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boilerplateABI}__ and `functionName` set to `"placePixelsHook"`.
 */
export function useBoilerplatePlacePixelsHook<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boilerplateABI,
          'placePixelsHook'
        >['request']['abi'],
        'placePixelsHook',
        TMode
      > & { functionName?: 'placePixelsHook' }
    : UseContractWriteConfig<
        typeof boilerplateABI,
        'placePixelsHook',
        TMode
      > & {
        abi?: never
        functionName?: 'placePixelsHook'
      } = {} as any,
) {
  return useContractWrite<typeof boilerplateABI, 'placePixelsHook', TMode>({
    abi: boilerplateABI,
    functionName: 'placePixelsHook',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link boilerplateABI}__ and `functionName` set to `"resetPixels"`.
 */
export function useBoilerplateResetPixels<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof boilerplateABI,
          'resetPixels'
        >['request']['abi'],
        'resetPixels',
        TMode
      > & { functionName?: 'resetPixels' }
    : UseContractWriteConfig<typeof boilerplateABI, 'resetPixels', TMode> & {
        abi?: never
        functionName?: 'resetPixels'
      } = {} as any,
) {
  return useContractWrite<typeof boilerplateABI, 'resetPixels', TMode>({
    abi: boilerplateABI,
    functionName: 'resetPixels',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boilerplateABI}__.
 */
export function usePrepareBoilerplateWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boilerplateABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boilerplateABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof boilerplateABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boilerplateABI}__ and `functionName` set to `"drawPixels"`.
 */
export function usePrepareBoilerplateDrawPixels(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boilerplateABI, 'drawPixels'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boilerplateABI,
    functionName: 'drawPixels',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boilerplateABI, 'drawPixels'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boilerplateABI}__ and `functionName` set to `"placeMines"`.
 */
export function usePrepareBoilerplatePlaceMines(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boilerplateABI, 'placeMines'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boilerplateABI,
    functionName: 'placeMines',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boilerplateABI, 'placeMines'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boilerplateABI}__ and `functionName` set to `"placePixelsHook"`.
 */
export function usePrepareBoilerplatePlacePixelsHook(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boilerplateABI, 'placePixelsHook'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boilerplateABI,
    functionName: 'placePixelsHook',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boilerplateABI, 'placePixelsHook'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link boilerplateABI}__ and `functionName` set to `"resetPixels"`.
 */
export function usePrepareBoilerplateResetPixels(
  config: Omit<
    UsePrepareContractWriteConfig<typeof boilerplateABI, 'resetPixels'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: boilerplateABI,
    functionName: 'resetPixels',
    ...config,
  } as UsePrepareContractWriteConfig<typeof boilerplateABI, 'resetPixels'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: erc20ABI, ...config } as UseContractReadConfig<
    typeof erc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"allowance"`.
 */
export function useErc20Allowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc20BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decimals"`.
 */
export function useErc20Decimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"name"`.
 */
export function useErc20Name<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc20Symbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useErc20TotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof erc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc20ABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof erc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc20ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc20ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, TFunctionName, TMode>({
    abi: erc20ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc20Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc20ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'approve', TMode>({
    abi: erc20ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decreaseAllowance"`.
 */
export function useErc20DecreaseAllowance<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'decreaseAllowance'
        >['request']['abi'],
        'decreaseAllowance',
        TMode
      > & { functionName?: 'decreaseAllowance' }
    : UseContractWriteConfig<typeof erc20ABI, 'decreaseAllowance', TMode> & {
        abi?: never
        functionName?: 'decreaseAllowance'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'decreaseAllowance', TMode>({
    abi: erc20ABI,
    functionName: 'decreaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"increaseAllowance"`.
 */
export function useErc20IncreaseAllowance<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'increaseAllowance'
        >['request']['abi'],
        'increaseAllowance',
        TMode
      > & { functionName?: 'increaseAllowance' }
    : UseContractWriteConfig<typeof erc20ABI, 'increaseAllowance', TMode> & {
        abi?: never
        functionName?: 'increaseAllowance'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'increaseAllowance', TMode>({
    abi: erc20ABI,
    functionName: 'increaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function useErc20Transfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof erc20ABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'transfer', TMode>({
    abi: erc20ABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc20TransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc20ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof erc20ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc20ABI, 'transferFrom', TMode>({
    abi: erc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__.
 */
export function usePrepareErc20Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc20Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"decreaseAllowance"`.
 */
export function usePrepareErc20DecreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'decreaseAllowance'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'decreaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"increaseAllowance"`.
 */
export function usePrepareErc20IncreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'increaseAllowance'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'increaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareErc20Transfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc20TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc20ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__.
 */
export function useErc20Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc20ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc20ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc20TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc20ABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc20ABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc20ABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function useIerc20Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: ierc20ABI, ...config } as UseContractReadConfig<
    typeof ierc20ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"allowance"`.
 */
export function useIerc20Allowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20ABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc20BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useIerc20TotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof ierc20ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20ABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof ierc20ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function useIerc20Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ierc20ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc20ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, TFunctionName, TMode>({
    abi: ierc20ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc20Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof ierc20ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, 'approve', TMode>({
    abi: ierc20ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function useIerc20Transfer<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20ABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof ierc20ABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, 'transfer', TMode>({
    abi: ierc20ABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc20TransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof ierc20ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20ABI, 'transferFrom', TMode>({
    abi: ierc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function usePrepareIerc20Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc20Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareIerc20Transfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20ABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20ABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20ABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc20TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20ABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20ABI}__.
 */
export function useIerc20Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ierc20ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20ABI,
    ...config,
  } as UseContractEventConfig<typeof ierc20ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20ABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc20ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc20ABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20ABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof ierc20ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc20TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc20ABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20ABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof ierc20ABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__.
 */
export function useIerc20MetadataRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"allowance"`.
 */
export function useIerc20MetadataAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc20MetadataBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"decimals"`.
 */
export function useIerc20MetadataDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"name"`.
 */
export function useIerc20MetadataName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"symbol"`.
 */
export function useIerc20MetadataSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useIerc20MetadataTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof ierc20MetadataABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MetadataABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MetadataABI,
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MetadataABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__.
 */
export function useIerc20MetadataWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20MetadataABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc20MetadataABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MetadataABI, TFunctionName, TMode>({
    abi: ierc20MetadataABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc20MetadataApprove<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20MetadataABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof ierc20MetadataABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MetadataABI, 'approve', TMode>({
    abi: ierc20MetadataABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"transfer"`.
 */
export function useIerc20MetadataTransfer<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20MetadataABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof ierc20MetadataABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MetadataABI, 'transfer', TMode>({
    abi: ierc20MetadataABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc20MetadataTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20MetadataABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<
        typeof ierc20MetadataABI,
        'transferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MetadataABI, 'transferFrom', TMode>({
    abi: ierc20MetadataABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__.
 */
export function usePrepareIerc20MetadataWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20MetadataABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MetadataABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MetadataABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc20MetadataApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MetadataABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareIerc20MetadataTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MetadataABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MetadataABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc20MetadataTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MetadataABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MetadataABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20MetadataABI}__.
 */
export function useIerc20MetadataEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ierc20MetadataABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20MetadataABI,
    ...config,
  } as UseContractEventConfig<typeof ierc20MetadataABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20MetadataABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc20MetadataApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc20MetadataABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20MetadataABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof ierc20MetadataABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20MetadataABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc20MetadataTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc20MetadataABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20MetadataABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof ierc20MetadataABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20PermitABI}__.
 */
export function useIerc20PermitRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc20PermitABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20PermitABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20PermitABI,
    ...config,
  } as UseContractReadConfig<
    typeof ierc20PermitABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20PermitABI}__ and `functionName` set to `"DOMAIN_SEPARATOR"`.
 */
export function useIerc20PermitDomainSeparator<
  TFunctionName extends 'DOMAIN_SEPARATOR',
  TSelectData = ReadContractResult<typeof ierc20PermitABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20PermitABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20PermitABI,
    functionName: 'DOMAIN_SEPARATOR',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20PermitABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20PermitABI}__ and `functionName` set to `"nonces"`.
 */
export function useIerc20PermitNonces<
  TFunctionName extends 'nonces',
  TSelectData = ReadContractResult<typeof ierc20PermitABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20PermitABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20PermitABI,
    functionName: 'nonces',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20PermitABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20PermitABI}__.
 */
export function useIerc20PermitWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20PermitABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc20PermitABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc20PermitABI, TFunctionName, TMode>({
    abi: ierc20PermitABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20PermitABI}__ and `functionName` set to `"permit"`.
 */
export function useIerc20PermitPermit<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20PermitABI,
          'permit'
        >['request']['abi'],
        'permit',
        TMode
      > & { functionName?: 'permit' }
    : UseContractWriteConfig<typeof ierc20PermitABI, 'permit', TMode> & {
        abi?: never
        functionName?: 'permit'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20PermitABI, 'permit', TMode>({
    abi: ierc20PermitABI,
    functionName: 'permit',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20PermitABI}__.
 */
export function usePrepareIerc20PermitWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20PermitABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20PermitABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20PermitABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20PermitABI}__ and `functionName` set to `"permit"`.
 */
export function usePrepareIerc20PermitPermit(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20PermitABI, 'permit'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20PermitABI,
    functionName: 'permit',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20PermitABI, 'permit'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPixelsMapABI}__.
 *
 *
 */
export function useIPixelsMapRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iPixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof iPixelsMapAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: iPixelsMapABI,
    address: iPixelsMapAddress[chainId as keyof typeof iPixelsMapAddress],
    ...config,
  } as UseContractReadConfig<typeof iPixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPixelsMapABI}__ and `functionName` set to `"addressRegistrar"`.
 *
 *
 */
export function useIPixelsMapAddressRegistrar<
  TFunctionName extends 'addressRegistrar',
  TSelectData = ReadContractResult<typeof iPixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof iPixelsMapAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: iPixelsMapABI,
    address: iPixelsMapAddress[chainId as keyof typeof iPixelsMapAddress],
    functionName: 'addressRegistrar',
    ...config,
  } as UseContractReadConfig<typeof iPixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPixelsMapABI}__ and `functionName` set to `"getMultiplePixelData"`.
 *
 *
 */
export function useIPixelsMapGetMultiplePixelData<
  TFunctionName extends 'getMultiplePixelData',
  TSelectData = ReadContractResult<typeof iPixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof iPixelsMapAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: iPixelsMapABI,
    address: iPixelsMapAddress[chainId as keyof typeof iPixelsMapAddress],
    functionName: 'getMultiplePixelData',
    ...config,
  } as UseContractReadConfig<typeof iPixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPixelsMapABI}__ and `functionName` set to `"getRangePixelData"`.
 *
 *
 */
export function useIPixelsMapGetRangePixelData<
  TFunctionName extends 'getRangePixelData',
  TSelectData = ReadContractResult<typeof iPixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof iPixelsMapAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: iPixelsMapABI,
    address: iPixelsMapAddress[chainId as keyof typeof iPixelsMapAddress],
    functionName: 'getRangePixelData',
    ...config,
  } as UseContractReadConfig<typeof iPixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPixelsMapABI}__ and `functionName` set to `"getSinglePixelData"`.
 *
 *
 */
export function useIPixelsMapGetSinglePixelData<
  TFunctionName extends 'getSinglePixelData',
  TSelectData = ReadContractResult<typeof iPixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof iPixelsMapAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: iPixelsMapABI,
    address: iPixelsMapAddress[chainId as keyof typeof iPixelsMapAddress],
    functionName: 'getSinglePixelData',
    ...config,
  } as UseContractReadConfig<typeof iPixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPixelsMapABI}__ and `functionName` set to `"getTeamNames"`.
 *
 *
 */
export function useIPixelsMapGetTeamNames<
  TFunctionName extends 'getTeamNames',
  TSelectData = ReadContractResult<typeof iPixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof iPixelsMapAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: iPixelsMapABI,
    address: iPixelsMapAddress[chainId as keyof typeof iPixelsMapAddress],
    functionName: 'getTeamNames',
    ...config,
  } as UseContractReadConfig<typeof iPixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPixelsMapABI}__ and `functionName` set to `"getTeamNumbers"`.
 *
 *
 */
export function useIPixelsMapGetTeamNumbers<
  TFunctionName extends 'getTeamNumbers',
  TSelectData = ReadContractResult<typeof iPixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof iPixelsMapAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: iPixelsMapABI,
    address: iPixelsMapAddress[chainId as keyof typeof iPixelsMapAddress],
    functionName: 'getTeamNumbers',
    ...config,
  } as UseContractReadConfig<typeof iPixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPixelsMapABI}__ and `functionName` set to `"teamNames"`.
 *
 *
 */
export function useIPixelsMapTeamNames<
  TFunctionName extends 'teamNames',
  TSelectData = ReadContractResult<typeof iPixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof iPixelsMapAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: iPixelsMapABI,
    address: iPixelsMapAddress[chainId as keyof typeof iPixelsMapAddress],
    functionName: 'teamNames',
    ...config,
  } as UseContractReadConfig<typeof iPixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPixelsMapABI}__.
 *
 *
 */
export function useIPixelsMapWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof iPixelsMapAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPixelsMapABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof iPixelsMapABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof iPixelsMapABI, TFunctionName, TMode>({
    abi: iPixelsMapABI,
    address: iPixelsMapAddress[chainId as keyof typeof iPixelsMapAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPixelsMapABI}__ and `functionName` set to `"placeMines"`.
 *
 *
 */
export function useIPixelsMapPlaceMines<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof iPixelsMapAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPixelsMapABI,
          'placeMines'
        >['request']['abi'],
        'placeMines',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'placeMines' }
    : UseContractWriteConfig<typeof iPixelsMapABI, 'placeMines', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'placeMines'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof iPixelsMapABI, 'placeMines', TMode>({
    abi: iPixelsMapABI,
    address: iPixelsMapAddress[chainId as keyof typeof iPixelsMapAddress],
    functionName: 'placeMines',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPixelsMapABI}__ and `functionName` set to `"placePixels"`.
 *
 *
 */
export function useIPixelsMapPlacePixels<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof iPixelsMapAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPixelsMapABI,
          'placePixels'
        >['request']['abi'],
        'placePixels',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'placePixels'
      }
    : UseContractWriteConfig<typeof iPixelsMapABI, 'placePixels', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'placePixels'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof iPixelsMapABI, 'placePixels', TMode>({
    abi: iPixelsMapABI,
    address: iPixelsMapAddress[chainId as keyof typeof iPixelsMapAddress],
    functionName: 'placePixels',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPixelsMapABI}__ and `functionName` set to `"register"`.
 *
 *
 */
export function useIPixelsMapRegister<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof iPixelsMapAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPixelsMapABI,
          'register'
        >['request']['abi'],
        'register',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'register' }
    : UseContractWriteConfig<typeof iPixelsMapABI, 'register', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'register'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof iPixelsMapABI, 'register', TMode>({
    abi: iPixelsMapABI,
    address: iPixelsMapAddress[chainId as keyof typeof iPixelsMapAddress],
    functionName: 'register',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPixelsMapABI}__ and `functionName` set to `"resetPixels"`.
 *
 *
 */
export function useIPixelsMapResetPixels<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof iPixelsMapAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPixelsMapABI,
          'resetPixels'
        >['request']['abi'],
        'resetPixels',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'resetPixels'
      }
    : UseContractWriteConfig<typeof iPixelsMapABI, 'resetPixels', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'resetPixels'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof iPixelsMapABI, 'resetPixels', TMode>({
    abi: iPixelsMapABI,
    address: iPixelsMapAddress[chainId as keyof typeof iPixelsMapAddress],
    functionName: 'resetPixels',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPixelsMapABI}__ and `functionName` set to `"setTeamName"`.
 *
 *
 */
export function useIPixelsMapSetTeamName<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof iPixelsMapAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPixelsMapABI,
          'setTeamName'
        >['request']['abi'],
        'setTeamName',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setTeamName'
      }
    : UseContractWriteConfig<typeof iPixelsMapABI, 'setTeamName', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setTeamName'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof iPixelsMapABI, 'setTeamName', TMode>({
    abi: iPixelsMapABI,
    address: iPixelsMapAddress[chainId as keyof typeof iPixelsMapAddress],
    functionName: 'setTeamName',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPixelsMapABI}__.
 *
 *
 */
export function usePrepareIPixelsMapWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPixelsMapABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof iPixelsMapAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: iPixelsMapABI,
    address: iPixelsMapAddress[chainId as keyof typeof iPixelsMapAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPixelsMapABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPixelsMapABI}__ and `functionName` set to `"placeMines"`.
 *
 *
 */
export function usePrepareIPixelsMapPlaceMines(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPixelsMapABI, 'placeMines'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof iPixelsMapAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: iPixelsMapABI,
    address: iPixelsMapAddress[chainId as keyof typeof iPixelsMapAddress],
    functionName: 'placeMines',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPixelsMapABI, 'placeMines'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPixelsMapABI}__ and `functionName` set to `"placePixels"`.
 *
 *
 */
export function usePrepareIPixelsMapPlacePixels(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPixelsMapABI, 'placePixels'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof iPixelsMapAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: iPixelsMapABI,
    address: iPixelsMapAddress[chainId as keyof typeof iPixelsMapAddress],
    functionName: 'placePixels',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPixelsMapABI, 'placePixels'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPixelsMapABI}__ and `functionName` set to `"register"`.
 *
 *
 */
export function usePrepareIPixelsMapRegister(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPixelsMapABI, 'register'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof iPixelsMapAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: iPixelsMapABI,
    address: iPixelsMapAddress[chainId as keyof typeof iPixelsMapAddress],
    functionName: 'register',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPixelsMapABI, 'register'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPixelsMapABI}__ and `functionName` set to `"resetPixels"`.
 *
 *
 */
export function usePrepareIPixelsMapResetPixels(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPixelsMapABI, 'resetPixels'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof iPixelsMapAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: iPixelsMapABI,
    address: iPixelsMapAddress[chainId as keyof typeof iPixelsMapAddress],
    functionName: 'resetPixels',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPixelsMapABI, 'resetPixels'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPixelsMapABI}__ and `functionName` set to `"setTeamName"`.
 *
 *
 */
export function usePrepareIPixelsMapSetTeamName(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPixelsMapABI, 'setTeamName'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof iPixelsMapAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: iPixelsMapABI,
    address: iPixelsMapAddress[chainId as keyof typeof iPixelsMapAddress],
    functionName: 'setTeamName',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPixelsMapABI, 'setTeamName'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link moneyPrinterABI}__.
 */
export function useMoneyPrinterRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof moneyPrinterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof moneyPrinterABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: moneyPrinterABI,
    ...config,
  } as UseContractReadConfig<
    typeof moneyPrinterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link moneyPrinterABI}__ and `functionName` set to `"GAS_UNIT_COST"`.
 */
export function useMoneyPrinterGasUnitCost<
  TFunctionName extends 'GAS_UNIT_COST',
  TSelectData = ReadContractResult<typeof moneyPrinterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof moneyPrinterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: moneyPrinterABI,
    functionName: 'GAS_UNIT_COST',
    ...config,
  } as UseContractReadConfig<
    typeof moneyPrinterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link moneyPrinterABI}__ and `functionName` set to `"INIT_COST"`.
 */
export function useMoneyPrinterInitCost<
  TFunctionName extends 'INIT_COST',
  TSelectData = ReadContractResult<typeof moneyPrinterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof moneyPrinterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: moneyPrinterABI,
    functionName: 'INIT_COST',
    ...config,
  } as UseContractReadConfig<
    typeof moneyPrinterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link moneyPrinterABI}__ and `functionName` set to `"MAX_ACTION_COUNT"`.
 */
export function useMoneyPrinterMaxActionCount<
  TFunctionName extends 'MAX_ACTION_COUNT',
  TSelectData = ReadContractResult<typeof moneyPrinterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof moneyPrinterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: moneyPrinterABI,
    functionName: 'MAX_ACTION_COUNT',
    ...config,
  } as UseContractReadConfig<
    typeof moneyPrinterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link moneyPrinterABI}__ and `functionName` set to `"MAX_TEAM_NAME_LENGTH"`.
 */
export function useMoneyPrinterMaxTeamNameLength<
  TFunctionName extends 'MAX_TEAM_NAME_LENGTH',
  TSelectData = ReadContractResult<typeof moneyPrinterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof moneyPrinterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: moneyPrinterABI,
    functionName: 'MAX_TEAM_NAME_LENGTH',
    ...config,
  } as UseContractReadConfig<
    typeof moneyPrinterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link moneyPrinterABI}__ and `functionName` set to `"MINE_EFFECT_MULTIPLIER"`.
 */
export function useMoneyPrinterMineEffectMultiplier<
  TFunctionName extends 'MINE_EFFECT_MULTIPLIER',
  TSelectData = ReadContractResult<typeof moneyPrinterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof moneyPrinterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: moneyPrinterABI,
    functionName: 'MINE_EFFECT_MULTIPLIER',
    ...config,
  } as UseContractReadConfig<
    typeof moneyPrinterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link moneyPrinterABI}__ and `functionName` set to `"REFUND_COST"`.
 */
export function useMoneyPrinterRefundCost<
  TFunctionName extends 'REFUND_COST',
  TSelectData = ReadContractResult<typeof moneyPrinterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof moneyPrinterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: moneyPrinterABI,
    functionName: 'REFUND_COST',
    ...config,
  } as UseContractReadConfig<
    typeof moneyPrinterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link moneyPrinterABI}__ and `functionName` set to `"REPLACEMENT_COST"`.
 */
export function useMoneyPrinterReplacementCost<
  TFunctionName extends 'REPLACEMENT_COST',
  TSelectData = ReadContractResult<typeof moneyPrinterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof moneyPrinterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: moneyPrinterABI,
    functionName: 'REPLACEMENT_COST',
    ...config,
  } as UseContractReadConfig<
    typeof moneyPrinterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link moneyPrinterABI}__ and `functionName` set to `"XIST"`.
 */
export function useMoneyPrinterXist<
  TFunctionName extends 'XIST',
  TSelectData = ReadContractResult<typeof moneyPrinterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof moneyPrinterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: moneyPrinterABI,
    functionName: 'XIST',
    ...config,
  } as UseContractReadConfig<
    typeof moneyPrinterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link moneyPrinterABI}__ and `functionName` set to `"addressRegistrar"`.
 */
export function useMoneyPrinterAddressRegistrar<
  TFunctionName extends 'addressRegistrar',
  TSelectData = ReadContractResult<typeof moneyPrinterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof moneyPrinterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: moneyPrinterABI,
    functionName: 'addressRegistrar',
    ...config,
  } as UseContractReadConfig<
    typeof moneyPrinterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link moneyPrinterABI}__ and `functionName` set to `"overwriter"`.
 */
export function useMoneyPrinterOverwriter<
  TFunctionName extends 'overwriter',
  TSelectData = ReadContractResult<typeof moneyPrinterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof moneyPrinterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: moneyPrinterABI,
    functionName: 'overwriter',
    ...config,
  } as UseContractReadConfig<
    typeof moneyPrinterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link moneyPrinterABI}__ and `functionName` set to `"teamActionsCount"`.
 */
export function useMoneyPrinterTeamActionsCount<
  TFunctionName extends 'teamActionsCount',
  TSelectData = ReadContractResult<typeof moneyPrinterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof moneyPrinterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: moneyPrinterABI,
    functionName: 'teamActionsCount',
    ...config,
  } as UseContractReadConfig<
    typeof moneyPrinterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link moneyPrinterABI}__ and `functionName` set to `"teamNames"`.
 */
export function useMoneyPrinterTeamNames<
  TFunctionName extends 'teamNames',
  TSelectData = ReadContractResult<typeof moneyPrinterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof moneyPrinterABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: moneyPrinterABI,
    functionName: 'teamNames',
    ...config,
  } as UseContractReadConfig<
    typeof moneyPrinterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link moneyPrinterABI}__.
 */
export function useMoneyPrinterWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof moneyPrinterABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof moneyPrinterABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof moneyPrinterABI, TFunctionName, TMode>({
    abi: moneyPrinterABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link moneyPrinterABI}__ and `functionName` set to `"brrrr"`.
 */
export function useMoneyPrinterBrrrr<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof moneyPrinterABI,
          'brrrr'
        >['request']['abi'],
        'brrrr',
        TMode
      > & { functionName?: 'brrrr' }
    : UseContractWriteConfig<typeof moneyPrinterABI, 'brrrr', TMode> & {
        abi?: never
        functionName?: 'brrrr'
      } = {} as any,
) {
  return useContractWrite<typeof moneyPrinterABI, 'brrrr', TMode>({
    abi: moneyPrinterABI,
    functionName: 'brrrr',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link moneyPrinterABI}__ and `functionName` set to `"withdrawToken"`.
 */
export function useMoneyPrinterWithdrawToken<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof moneyPrinterABI,
          'withdrawToken'
        >['request']['abi'],
        'withdrawToken',
        TMode
      > & { functionName?: 'withdrawToken' }
    : UseContractWriteConfig<typeof moneyPrinterABI, 'withdrawToken', TMode> & {
        abi?: never
        functionName?: 'withdrawToken'
      } = {} as any,
) {
  return useContractWrite<typeof moneyPrinterABI, 'withdrawToken', TMode>({
    abi: moneyPrinterABI,
    functionName: 'withdrawToken',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link moneyPrinterABI}__.
 */
export function usePrepareMoneyPrinterWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof moneyPrinterABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: moneyPrinterABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof moneyPrinterABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link moneyPrinterABI}__ and `functionName` set to `"brrrr"`.
 */
export function usePrepareMoneyPrinterBrrrr(
  config: Omit<
    UsePrepareContractWriteConfig<typeof moneyPrinterABI, 'brrrr'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: moneyPrinterABI,
    functionName: 'brrrr',
    ...config,
  } as UsePrepareContractWriteConfig<typeof moneyPrinterABI, 'brrrr'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link moneyPrinterABI}__ and `functionName` set to `"withdrawToken"`.
 */
export function usePrepareMoneyPrinterWithdrawToken(
  config: Omit<
    UsePrepareContractWriteConfig<typeof moneyPrinterABI, 'withdrawToken'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: moneyPrinterABI,
    functionName: 'withdrawToken',
    ...config,
  } as UsePrepareContractWriteConfig<typeof moneyPrinterABI, 'withdrawToken'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelOverwriterABI}__.
 */
export function usePixelOverwriterRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof pixelOverwriterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof pixelOverwriterABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelOverwriterABI,
    ...config,
  } as UseContractReadConfig<
    typeof pixelOverwriterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelOverwriterABI}__ and `functionName` set to `"GAS_UNIT_COST"`.
 */
export function usePixelOverwriterGasUnitCost<
  TFunctionName extends 'GAS_UNIT_COST',
  TSelectData = ReadContractResult<typeof pixelOverwriterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof pixelOverwriterABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelOverwriterABI,
    functionName: 'GAS_UNIT_COST',
    ...config,
  } as UseContractReadConfig<
    typeof pixelOverwriterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelOverwriterABI}__ and `functionName` set to `"INIT_COST"`.
 */
export function usePixelOverwriterInitCost<
  TFunctionName extends 'INIT_COST',
  TSelectData = ReadContractResult<typeof pixelOverwriterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof pixelOverwriterABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelOverwriterABI,
    functionName: 'INIT_COST',
    ...config,
  } as UseContractReadConfig<
    typeof pixelOverwriterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelOverwriterABI}__ and `functionName` set to `"MAX_ACTION_COUNT"`.
 */
export function usePixelOverwriterMaxActionCount<
  TFunctionName extends 'MAX_ACTION_COUNT',
  TSelectData = ReadContractResult<typeof pixelOverwriterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof pixelOverwriterABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelOverwriterABI,
    functionName: 'MAX_ACTION_COUNT',
    ...config,
  } as UseContractReadConfig<
    typeof pixelOverwriterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelOverwriterABI}__ and `functionName` set to `"MAX_TEAM_NAME_LENGTH"`.
 */
export function usePixelOverwriterMaxTeamNameLength<
  TFunctionName extends 'MAX_TEAM_NAME_LENGTH',
  TSelectData = ReadContractResult<typeof pixelOverwriterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof pixelOverwriterABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelOverwriterABI,
    functionName: 'MAX_TEAM_NAME_LENGTH',
    ...config,
  } as UseContractReadConfig<
    typeof pixelOverwriterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelOverwriterABI}__ and `functionName` set to `"MINE_EFFECT_MULTIPLIER"`.
 */
export function usePixelOverwriterMineEffectMultiplier<
  TFunctionName extends 'MINE_EFFECT_MULTIPLIER',
  TSelectData = ReadContractResult<typeof pixelOverwriterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof pixelOverwriterABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelOverwriterABI,
    functionName: 'MINE_EFFECT_MULTIPLIER',
    ...config,
  } as UseContractReadConfig<
    typeof pixelOverwriterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelOverwriterABI}__ and `functionName` set to `"REFUND_COST"`.
 */
export function usePixelOverwriterRefundCost<
  TFunctionName extends 'REFUND_COST',
  TSelectData = ReadContractResult<typeof pixelOverwriterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof pixelOverwriterABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelOverwriterABI,
    functionName: 'REFUND_COST',
    ...config,
  } as UseContractReadConfig<
    typeof pixelOverwriterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelOverwriterABI}__ and `functionName` set to `"REPLACEMENT_COST"`.
 */
export function usePixelOverwriterReplacementCost<
  TFunctionName extends 'REPLACEMENT_COST',
  TSelectData = ReadContractResult<typeof pixelOverwriterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof pixelOverwriterABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelOverwriterABI,
    functionName: 'REPLACEMENT_COST',
    ...config,
  } as UseContractReadConfig<
    typeof pixelOverwriterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelOverwriterABI}__ and `functionName` set to `"XIST"`.
 */
export function usePixelOverwriterXist<
  TFunctionName extends 'XIST',
  TSelectData = ReadContractResult<typeof pixelOverwriterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof pixelOverwriterABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelOverwriterABI,
    functionName: 'XIST',
    ...config,
  } as UseContractReadConfig<
    typeof pixelOverwriterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelOverwriterABI}__ and `functionName` set to `"addressRegistrar"`.
 */
export function usePixelOverwriterAddressRegistrar<
  TFunctionName extends 'addressRegistrar',
  TSelectData = ReadContractResult<typeof pixelOverwriterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof pixelOverwriterABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelOverwriterABI,
    functionName: 'addressRegistrar',
    ...config,
  } as UseContractReadConfig<
    typeof pixelOverwriterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelOverwriterABI}__ and `functionName` set to `"teamActionsCount"`.
 */
export function usePixelOverwriterTeamActionsCount<
  TFunctionName extends 'teamActionsCount',
  TSelectData = ReadContractResult<typeof pixelOverwriterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof pixelOverwriterABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelOverwriterABI,
    functionName: 'teamActionsCount',
    ...config,
  } as UseContractReadConfig<
    typeof pixelOverwriterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelOverwriterABI}__ and `functionName` set to `"teamNames"`.
 */
export function usePixelOverwriterTeamNames<
  TFunctionName extends 'teamNames',
  TSelectData = ReadContractResult<typeof pixelOverwriterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof pixelOverwriterABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelOverwriterABI,
    functionName: 'teamNames',
    ...config,
  } as UseContractReadConfig<
    typeof pixelOverwriterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pixelOverwriterABI}__.
 */
export function usePixelOverwriterWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pixelOverwriterABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof pixelOverwriterABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof pixelOverwriterABI, TFunctionName, TMode>({
    abi: pixelOverwriterABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pixelOverwriterABI}__ and `functionName` set to `"overwritePixels"`.
 */
export function usePixelOverwriterOverwritePixels<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pixelOverwriterABI,
          'overwritePixels'
        >['request']['abi'],
        'overwritePixels',
        TMode
      > & { functionName?: 'overwritePixels' }
    : UseContractWriteConfig<
        typeof pixelOverwriterABI,
        'overwritePixels',
        TMode
      > & {
        abi?: never
        functionName?: 'overwritePixels'
      } = {} as any,
) {
  return useContractWrite<typeof pixelOverwriterABI, 'overwritePixels', TMode>({
    abi: pixelOverwriterABI,
    functionName: 'overwritePixels',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pixelOverwriterABI}__ and `functionName` set to `"placePixelsHook"`.
 */
export function usePixelOverwriterPlacePixelsHook<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pixelOverwriterABI,
          'placePixelsHook'
        >['request']['abi'],
        'placePixelsHook',
        TMode
      > & { functionName?: 'placePixelsHook' }
    : UseContractWriteConfig<
        typeof pixelOverwriterABI,
        'placePixelsHook',
        TMode
      > & {
        abi?: never
        functionName?: 'placePixelsHook'
      } = {} as any,
) {
  return useContractWrite<typeof pixelOverwriterABI, 'placePixelsHook', TMode>({
    abi: pixelOverwriterABI,
    functionName: 'placePixelsHook',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pixelOverwriterABI}__ and `functionName` set to `"withdrawToken"`.
 */
export function usePixelOverwriterWithdrawToken<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pixelOverwriterABI,
          'withdrawToken'
        >['request']['abi'],
        'withdrawToken',
        TMode
      > & { functionName?: 'withdrawToken' }
    : UseContractWriteConfig<
        typeof pixelOverwriterABI,
        'withdrawToken',
        TMode
      > & {
        abi?: never
        functionName?: 'withdrawToken'
      } = {} as any,
) {
  return useContractWrite<typeof pixelOverwriterABI, 'withdrawToken', TMode>({
    abi: pixelOverwriterABI,
    functionName: 'withdrawToken',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pixelOverwriterABI}__.
 */
export function usePreparePixelOverwriterWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pixelOverwriterABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pixelOverwriterABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof pixelOverwriterABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pixelOverwriterABI}__ and `functionName` set to `"overwritePixels"`.
 */
export function usePreparePixelOverwriterOverwritePixels(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pixelOverwriterABI, 'overwritePixels'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pixelOverwriterABI,
    functionName: 'overwritePixels',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof pixelOverwriterABI,
    'overwritePixels'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pixelOverwriterABI}__ and `functionName` set to `"placePixelsHook"`.
 */
export function usePreparePixelOverwriterPlacePixelsHook(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pixelOverwriterABI, 'placePixelsHook'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pixelOverwriterABI,
    functionName: 'placePixelsHook',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof pixelOverwriterABI,
    'placePixelsHook'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pixelOverwriterABI}__ and `functionName` set to `"withdrawToken"`.
 */
export function usePreparePixelOverwriterWithdrawToken(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pixelOverwriterABI, 'withdrawToken'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pixelOverwriterABI,
    functionName: 'withdrawToken',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof pixelOverwriterABI,
    'withdrawToken'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelsMapABI}__.
 */
export function usePixelsMapRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof pixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelsMapABI,
    ...config,
  } as UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"GAS_UNIT_COST"`.
 */
export function usePixelsMapGasUnitCost<
  TFunctionName extends 'GAS_UNIT_COST',
  TSelectData = ReadContractResult<typeof pixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelsMapABI,
    functionName: 'GAS_UNIT_COST',
    ...config,
  } as UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"INIT_COST"`.
 */
export function usePixelsMapInitCost<
  TFunctionName extends 'INIT_COST',
  TSelectData = ReadContractResult<typeof pixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelsMapABI,
    functionName: 'INIT_COST',
    ...config,
  } as UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"MAX_ACTION_COUNT"`.
 */
export function usePixelsMapMaxActionCount<
  TFunctionName extends 'MAX_ACTION_COUNT',
  TSelectData = ReadContractResult<typeof pixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelsMapABI,
    functionName: 'MAX_ACTION_COUNT',
    ...config,
  } as UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"MAX_TEAM_NAME_LENGTH"`.
 */
export function usePixelsMapMaxTeamNameLength<
  TFunctionName extends 'MAX_TEAM_NAME_LENGTH',
  TSelectData = ReadContractResult<typeof pixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelsMapABI,
    functionName: 'MAX_TEAM_NAME_LENGTH',
    ...config,
  } as UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"MINE_EFFECT_MULTIPLIER"`.
 */
export function usePixelsMapMineEffectMultiplier<
  TFunctionName extends 'MINE_EFFECT_MULTIPLIER',
  TSelectData = ReadContractResult<typeof pixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelsMapABI,
    functionName: 'MINE_EFFECT_MULTIPLIER',
    ...config,
  } as UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"REFUND_COST"`.
 */
export function usePixelsMapRefundCost<
  TFunctionName extends 'REFUND_COST',
  TSelectData = ReadContractResult<typeof pixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelsMapABI,
    functionName: 'REFUND_COST',
    ...config,
  } as UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"REPLACEMENT_COST"`.
 */
export function usePixelsMapReplacementCost<
  TFunctionName extends 'REPLACEMENT_COST',
  TSelectData = ReadContractResult<typeof pixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelsMapABI,
    functionName: 'REPLACEMENT_COST',
    ...config,
  } as UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"XIST"`.
 */
export function usePixelsMapXist<
  TFunctionName extends 'XIST',
  TSelectData = ReadContractResult<typeof pixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelsMapABI,
    functionName: 'XIST',
    ...config,
  } as UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"addressRegistrar"`.
 */
export function usePixelsMapAddressRegistrar<
  TFunctionName extends 'addressRegistrar',
  TSelectData = ReadContractResult<typeof pixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelsMapABI,
    functionName: 'addressRegistrar',
    ...config,
  } as UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"getMultiplePixelData"`.
 */
export function usePixelsMapGetMultiplePixelData<
  TFunctionName extends 'getMultiplePixelData',
  TSelectData = ReadContractResult<typeof pixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelsMapABI,
    functionName: 'getMultiplePixelData',
    ...config,
  } as UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"getRangePixelData"`.
 */
export function usePixelsMapGetRangePixelData<
  TFunctionName extends 'getRangePixelData',
  TSelectData = ReadContractResult<typeof pixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelsMapABI,
    functionName: 'getRangePixelData',
    ...config,
  } as UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"getSinglePixelData"`.
 */
export function usePixelsMapGetSinglePixelData<
  TFunctionName extends 'getSinglePixelData',
  TSelectData = ReadContractResult<typeof pixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelsMapABI,
    functionName: 'getSinglePixelData',
    ...config,
  } as UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"getTeamNames"`.
 */
export function usePixelsMapGetTeamNames<
  TFunctionName extends 'getTeamNames',
  TSelectData = ReadContractResult<typeof pixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelsMapABI,
    functionName: 'getTeamNames',
    ...config,
  } as UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"getTeamNumber"`.
 */
export function usePixelsMapGetTeamNumber<
  TFunctionName extends 'getTeamNumber',
  TSelectData = ReadContractResult<typeof pixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelsMapABI,
    functionName: 'getTeamNumber',
    ...config,
  } as UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"getTeamNumbers"`.
 */
export function usePixelsMapGetTeamNumbers<
  TFunctionName extends 'getTeamNumbers',
  TSelectData = ReadContractResult<typeof pixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelsMapABI,
    functionName: 'getTeamNumbers',
    ...config,
  } as UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"teamActionsCount"`.
 */
export function usePixelsMapTeamActionsCount<
  TFunctionName extends 'teamActionsCount',
  TSelectData = ReadContractResult<typeof pixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelsMapABI,
    functionName: 'teamActionsCount',
    ...config,
  } as UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"teamNames"`.
 */
export function usePixelsMapTeamNames<
  TFunctionName extends 'teamNames',
  TSelectData = ReadContractResult<typeof pixelsMapABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: pixelsMapABI,
    functionName: 'teamNames',
    ...config,
  } as UseContractReadConfig<typeof pixelsMapABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pixelsMapABI}__.
 */
export function usePixelsMapWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pixelsMapABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof pixelsMapABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof pixelsMapABI, TFunctionName, TMode>({
    abi: pixelsMapABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"placeMines"`.
 */
export function usePixelsMapPlaceMines<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pixelsMapABI,
          'placeMines'
        >['request']['abi'],
        'placeMines',
        TMode
      > & { functionName?: 'placeMines' }
    : UseContractWriteConfig<typeof pixelsMapABI, 'placeMines', TMode> & {
        abi?: never
        functionName?: 'placeMines'
      } = {} as any,
) {
  return useContractWrite<typeof pixelsMapABI, 'placeMines', TMode>({
    abi: pixelsMapABI,
    functionName: 'placeMines',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"placePixels"`.
 */
export function usePixelsMapPlacePixels<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pixelsMapABI,
          'placePixels'
        >['request']['abi'],
        'placePixels',
        TMode
      > & { functionName?: 'placePixels' }
    : UseContractWriteConfig<typeof pixelsMapABI, 'placePixels', TMode> & {
        abi?: never
        functionName?: 'placePixels'
      } = {} as any,
) {
  return useContractWrite<typeof pixelsMapABI, 'placePixels', TMode>({
    abi: pixelsMapABI,
    functionName: 'placePixels',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"register"`.
 */
export function usePixelsMapRegister<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pixelsMapABI,
          'register'
        >['request']['abi'],
        'register',
        TMode
      > & { functionName?: 'register' }
    : UseContractWriteConfig<typeof pixelsMapABI, 'register', TMode> & {
        abi?: never
        functionName?: 'register'
      } = {} as any,
) {
  return useContractWrite<typeof pixelsMapABI, 'register', TMode>({
    abi: pixelsMapABI,
    functionName: 'register',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"resetPixels"`.
 */
export function usePixelsMapResetPixels<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pixelsMapABI,
          'resetPixels'
        >['request']['abi'],
        'resetPixels',
        TMode
      > & { functionName?: 'resetPixels' }
    : UseContractWriteConfig<typeof pixelsMapABI, 'resetPixels', TMode> & {
        abi?: never
        functionName?: 'resetPixels'
      } = {} as any,
) {
  return useContractWrite<typeof pixelsMapABI, 'resetPixels', TMode>({
    abi: pixelsMapABI,
    functionName: 'resetPixels',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"setTeamName"`.
 */
export function usePixelsMapSetTeamName<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof pixelsMapABI,
          'setTeamName'
        >['request']['abi'],
        'setTeamName',
        TMode
      > & { functionName?: 'setTeamName' }
    : UseContractWriteConfig<typeof pixelsMapABI, 'setTeamName', TMode> & {
        abi?: never
        functionName?: 'setTeamName'
      } = {} as any,
) {
  return useContractWrite<typeof pixelsMapABI, 'setTeamName', TMode>({
    abi: pixelsMapABI,
    functionName: 'setTeamName',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pixelsMapABI}__.
 */
export function usePreparePixelsMapWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pixelsMapABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pixelsMapABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof pixelsMapABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"placeMines"`.
 */
export function usePreparePixelsMapPlaceMines(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pixelsMapABI, 'placeMines'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pixelsMapABI,
    functionName: 'placeMines',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pixelsMapABI, 'placeMines'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"placePixels"`.
 */
export function usePreparePixelsMapPlacePixels(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pixelsMapABI, 'placePixels'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pixelsMapABI,
    functionName: 'placePixels',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pixelsMapABI, 'placePixels'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"register"`.
 */
export function usePreparePixelsMapRegister(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pixelsMapABI, 'register'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pixelsMapABI,
    functionName: 'register',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pixelsMapABI, 'register'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"resetPixels"`.
 */
export function usePreparePixelsMapResetPixels(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pixelsMapABI, 'resetPixels'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pixelsMapABI,
    functionName: 'resetPixels',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pixelsMapABI, 'resetPixels'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link pixelsMapABI}__ and `functionName` set to `"setTeamName"`.
 */
export function usePreparePixelsMapSetTeamName(
  config: Omit<
    UsePrepareContractWriteConfig<typeof pixelsMapABI, 'setTeamName'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: pixelsMapABI,
    functionName: 'setTeamName',
    ...config,
  } as UsePrepareContractWriteConfig<typeof pixelsMapABI, 'setTeamName'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNameMesserABI}__.
 */
export function useTeamNameMesserRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof teamNameMesserABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNameMesserABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNameMesserABI,
    ...config,
  } as UseContractReadConfig<
    typeof teamNameMesserABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNameMesserABI}__ and `functionName` set to `"GAS_UNIT_COST"`.
 */
export function useTeamNameMesserGasUnitCost<
  TFunctionName extends 'GAS_UNIT_COST',
  TSelectData = ReadContractResult<typeof teamNameMesserABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNameMesserABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNameMesserABI,
    functionName: 'GAS_UNIT_COST',
    ...config,
  } as UseContractReadConfig<
    typeof teamNameMesserABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNameMesserABI}__ and `functionName` set to `"INIT_COST"`.
 */
export function useTeamNameMesserInitCost<
  TFunctionName extends 'INIT_COST',
  TSelectData = ReadContractResult<typeof teamNameMesserABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNameMesserABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNameMesserABI,
    functionName: 'INIT_COST',
    ...config,
  } as UseContractReadConfig<
    typeof teamNameMesserABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNameMesserABI}__ and `functionName` set to `"MAX_ACTION_COUNT"`.
 */
export function useTeamNameMesserMaxActionCount<
  TFunctionName extends 'MAX_ACTION_COUNT',
  TSelectData = ReadContractResult<typeof teamNameMesserABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNameMesserABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNameMesserABI,
    functionName: 'MAX_ACTION_COUNT',
    ...config,
  } as UseContractReadConfig<
    typeof teamNameMesserABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNameMesserABI}__ and `functionName` set to `"MAX_TEAM_NAME_LENGTH"`.
 */
export function useTeamNameMesserMaxTeamNameLength<
  TFunctionName extends 'MAX_TEAM_NAME_LENGTH',
  TSelectData = ReadContractResult<typeof teamNameMesserABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNameMesserABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNameMesserABI,
    functionName: 'MAX_TEAM_NAME_LENGTH',
    ...config,
  } as UseContractReadConfig<
    typeof teamNameMesserABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNameMesserABI}__ and `functionName` set to `"MINE_EFFECT_MULTIPLIER"`.
 */
export function useTeamNameMesserMineEffectMultiplier<
  TFunctionName extends 'MINE_EFFECT_MULTIPLIER',
  TSelectData = ReadContractResult<typeof teamNameMesserABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNameMesserABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNameMesserABI,
    functionName: 'MINE_EFFECT_MULTIPLIER',
    ...config,
  } as UseContractReadConfig<
    typeof teamNameMesserABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNameMesserABI}__ and `functionName` set to `"REFUND_COST"`.
 */
export function useTeamNameMesserRefundCost<
  TFunctionName extends 'REFUND_COST',
  TSelectData = ReadContractResult<typeof teamNameMesserABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNameMesserABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNameMesserABI,
    functionName: 'REFUND_COST',
    ...config,
  } as UseContractReadConfig<
    typeof teamNameMesserABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNameMesserABI}__ and `functionName` set to `"REPLACEMENT_COST"`.
 */
export function useTeamNameMesserReplacementCost<
  TFunctionName extends 'REPLACEMENT_COST',
  TSelectData = ReadContractResult<typeof teamNameMesserABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNameMesserABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNameMesserABI,
    functionName: 'REPLACEMENT_COST',
    ...config,
  } as UseContractReadConfig<
    typeof teamNameMesserABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNameMesserABI}__ and `functionName` set to `"XIST"`.
 */
export function useTeamNameMesserXist<
  TFunctionName extends 'XIST',
  TSelectData = ReadContractResult<typeof teamNameMesserABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNameMesserABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNameMesserABI,
    functionName: 'XIST',
    ...config,
  } as UseContractReadConfig<
    typeof teamNameMesserABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNameMesserABI}__ and `functionName` set to `"addressRegistrar"`.
 */
export function useTeamNameMesserAddressRegistrar<
  TFunctionName extends 'addressRegistrar',
  TSelectData = ReadContractResult<typeof teamNameMesserABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNameMesserABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNameMesserABI,
    functionName: 'addressRegistrar',
    ...config,
  } as UseContractReadConfig<
    typeof teamNameMesserABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNameMesserABI}__ and `functionName` set to `"teamActionsCount"`.
 */
export function useTeamNameMesserTeamActionsCount<
  TFunctionName extends 'teamActionsCount',
  TSelectData = ReadContractResult<typeof teamNameMesserABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNameMesserABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNameMesserABI,
    functionName: 'teamActionsCount',
    ...config,
  } as UseContractReadConfig<
    typeof teamNameMesserABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNameMesserABI}__ and `functionName` set to `"teamNames"`.
 */
export function useTeamNameMesserTeamNames<
  TFunctionName extends 'teamNames',
  TSelectData = ReadContractResult<typeof teamNameMesserABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNameMesserABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNameMesserABI,
    functionName: 'teamNames',
    ...config,
  } as UseContractReadConfig<
    typeof teamNameMesserABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link teamNameMesserABI}__.
 */
export function useTeamNameMesserWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof teamNameMesserABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof teamNameMesserABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof teamNameMesserABI, TFunctionName, TMode>({
    abi: teamNameMesserABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link teamNameMesserABI}__ and `functionName` set to `"messUpTeamName"`.
 */
export function useTeamNameMesserMessUpTeamName<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof teamNameMesserABI,
          'messUpTeamName'
        >['request']['abi'],
        'messUpTeamName',
        TMode
      > & { functionName?: 'messUpTeamName' }
    : UseContractWriteConfig<
        typeof teamNameMesserABI,
        'messUpTeamName',
        TMode
      > & {
        abi?: never
        functionName?: 'messUpTeamName'
      } = {} as any,
) {
  return useContractWrite<typeof teamNameMesserABI, 'messUpTeamName', TMode>({
    abi: teamNameMesserABI,
    functionName: 'messUpTeamName',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link teamNameMesserABI}__ and `functionName` set to `"placePixelsHook"`.
 */
export function useTeamNameMesserPlacePixelsHook<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof teamNameMesserABI,
          'placePixelsHook'
        >['request']['abi'],
        'placePixelsHook',
        TMode
      > & { functionName?: 'placePixelsHook' }
    : UseContractWriteConfig<
        typeof teamNameMesserABI,
        'placePixelsHook',
        TMode
      > & {
        abi?: never
        functionName?: 'placePixelsHook'
      } = {} as any,
) {
  return useContractWrite<typeof teamNameMesserABI, 'placePixelsHook', TMode>({
    abi: teamNameMesserABI,
    functionName: 'placePixelsHook',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link teamNameMesserABI}__.
 */
export function usePrepareTeamNameMesserWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof teamNameMesserABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: teamNameMesserABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof teamNameMesserABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link teamNameMesserABI}__ and `functionName` set to `"messUpTeamName"`.
 */
export function usePrepareTeamNameMesserMessUpTeamName(
  config: Omit<
    UsePrepareContractWriteConfig<typeof teamNameMesserABI, 'messUpTeamName'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: teamNameMesserABI,
    functionName: 'messUpTeamName',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof teamNameMesserABI,
    'messUpTeamName'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link teamNameMesserABI}__ and `functionName` set to `"placePixelsHook"`.
 */
export function usePrepareTeamNameMesserPlacePixelsHook(
  config: Omit<
    UsePrepareContractWriteConfig<typeof teamNameMesserABI, 'placePixelsHook'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: teamNameMesserABI,
    functionName: 'placePixelsHook',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof teamNameMesserABI,
    'placePixelsHook'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNumChangerABI}__.
 */
export function useTeamNumChangerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof teamNumChangerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNumChangerABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNumChangerABI,
    ...config,
  } as UseContractReadConfig<
    typeof teamNumChangerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNumChangerABI}__ and `functionName` set to `"GAS_UNIT_COST"`.
 */
export function useTeamNumChangerGasUnitCost<
  TFunctionName extends 'GAS_UNIT_COST',
  TSelectData = ReadContractResult<typeof teamNumChangerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNumChangerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNumChangerABI,
    functionName: 'GAS_UNIT_COST',
    ...config,
  } as UseContractReadConfig<
    typeof teamNumChangerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNumChangerABI}__ and `functionName` set to `"INIT_COST"`.
 */
export function useTeamNumChangerInitCost<
  TFunctionName extends 'INIT_COST',
  TSelectData = ReadContractResult<typeof teamNumChangerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNumChangerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNumChangerABI,
    functionName: 'INIT_COST',
    ...config,
  } as UseContractReadConfig<
    typeof teamNumChangerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNumChangerABI}__ and `functionName` set to `"MAX_ACTION_COUNT"`.
 */
export function useTeamNumChangerMaxActionCount<
  TFunctionName extends 'MAX_ACTION_COUNT',
  TSelectData = ReadContractResult<typeof teamNumChangerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNumChangerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNumChangerABI,
    functionName: 'MAX_ACTION_COUNT',
    ...config,
  } as UseContractReadConfig<
    typeof teamNumChangerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNumChangerABI}__ and `functionName` set to `"MAX_TEAM_NAME_LENGTH"`.
 */
export function useTeamNumChangerMaxTeamNameLength<
  TFunctionName extends 'MAX_TEAM_NAME_LENGTH',
  TSelectData = ReadContractResult<typeof teamNumChangerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNumChangerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNumChangerABI,
    functionName: 'MAX_TEAM_NAME_LENGTH',
    ...config,
  } as UseContractReadConfig<
    typeof teamNumChangerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNumChangerABI}__ and `functionName` set to `"MINE_EFFECT_MULTIPLIER"`.
 */
export function useTeamNumChangerMineEffectMultiplier<
  TFunctionName extends 'MINE_EFFECT_MULTIPLIER',
  TSelectData = ReadContractResult<typeof teamNumChangerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNumChangerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNumChangerABI,
    functionName: 'MINE_EFFECT_MULTIPLIER',
    ...config,
  } as UseContractReadConfig<
    typeof teamNumChangerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNumChangerABI}__ and `functionName` set to `"REFUND_COST"`.
 */
export function useTeamNumChangerRefundCost<
  TFunctionName extends 'REFUND_COST',
  TSelectData = ReadContractResult<typeof teamNumChangerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNumChangerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNumChangerABI,
    functionName: 'REFUND_COST',
    ...config,
  } as UseContractReadConfig<
    typeof teamNumChangerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNumChangerABI}__ and `functionName` set to `"REPLACEMENT_COST"`.
 */
export function useTeamNumChangerReplacementCost<
  TFunctionName extends 'REPLACEMENT_COST',
  TSelectData = ReadContractResult<typeof teamNumChangerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNumChangerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNumChangerABI,
    functionName: 'REPLACEMENT_COST',
    ...config,
  } as UseContractReadConfig<
    typeof teamNumChangerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNumChangerABI}__ and `functionName` set to `"XIST"`.
 */
export function useTeamNumChangerXist<
  TFunctionName extends 'XIST',
  TSelectData = ReadContractResult<typeof teamNumChangerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNumChangerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNumChangerABI,
    functionName: 'XIST',
    ...config,
  } as UseContractReadConfig<
    typeof teamNumChangerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNumChangerABI}__ and `functionName` set to `"addressRegistrar"`.
 */
export function useTeamNumChangerAddressRegistrar<
  TFunctionName extends 'addressRegistrar',
  TSelectData = ReadContractResult<typeof teamNumChangerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNumChangerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNumChangerABI,
    functionName: 'addressRegistrar',
    ...config,
  } as UseContractReadConfig<
    typeof teamNumChangerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNumChangerABI}__ and `functionName` set to `"teamActionsCount"`.
 */
export function useTeamNumChangerTeamActionsCount<
  TFunctionName extends 'teamActionsCount',
  TSelectData = ReadContractResult<typeof teamNumChangerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNumChangerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNumChangerABI,
    functionName: 'teamActionsCount',
    ...config,
  } as UseContractReadConfig<
    typeof teamNumChangerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link teamNumChangerABI}__ and `functionName` set to `"teamNames"`.
 */
export function useTeamNumChangerTeamNames<
  TFunctionName extends 'teamNames',
  TSelectData = ReadContractResult<typeof teamNumChangerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof teamNumChangerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: teamNumChangerABI,
    functionName: 'teamNames',
    ...config,
  } as UseContractReadConfig<
    typeof teamNumChangerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link teamNumChangerABI}__.
 */
export function useTeamNumChangerWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof teamNumChangerABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof teamNumChangerABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof teamNumChangerABI, TFunctionName, TMode>({
    abi: teamNumChangerABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link teamNumChangerABI}__ and `functionName` set to `"changeTeamNumber"`.
 */
export function useTeamNumChangerChangeTeamNumber<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof teamNumChangerABI,
          'changeTeamNumber'
        >['request']['abi'],
        'changeTeamNumber',
        TMode
      > & { functionName?: 'changeTeamNumber' }
    : UseContractWriteConfig<
        typeof teamNumChangerABI,
        'changeTeamNumber',
        TMode
      > & {
        abi?: never
        functionName?: 'changeTeamNumber'
      } = {} as any,
) {
  return useContractWrite<typeof teamNumChangerABI, 'changeTeamNumber', TMode>({
    abi: teamNumChangerABI,
    functionName: 'changeTeamNumber',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link teamNumChangerABI}__ and `functionName` set to `"placePixelsHook"`.
 */
export function useTeamNumChangerPlacePixelsHook<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof teamNumChangerABI,
          'placePixelsHook'
        >['request']['abi'],
        'placePixelsHook',
        TMode
      > & { functionName?: 'placePixelsHook' }
    : UseContractWriteConfig<
        typeof teamNumChangerABI,
        'placePixelsHook',
        TMode
      > & {
        abi?: never
        functionName?: 'placePixelsHook'
      } = {} as any,
) {
  return useContractWrite<typeof teamNumChangerABI, 'placePixelsHook', TMode>({
    abi: teamNumChangerABI,
    functionName: 'placePixelsHook',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link teamNumChangerABI}__.
 */
export function usePrepareTeamNumChangerWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof teamNumChangerABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: teamNumChangerABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof teamNumChangerABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link teamNumChangerABI}__ and `functionName` set to `"changeTeamNumber"`.
 */
export function usePrepareTeamNumChangerChangeTeamNumber(
  config: Omit<
    UsePrepareContractWriteConfig<typeof teamNumChangerABI, 'changeTeamNumber'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: teamNumChangerABI,
    functionName: 'changeTeamNumber',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof teamNumChangerABI,
    'changeTeamNumber'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link teamNumChangerABI}__ and `functionName` set to `"placePixelsHook"`.
 */
export function usePrepareTeamNumChangerPlacePixelsHook(
  config: Omit<
    UsePrepareContractWriteConfig<typeof teamNumChangerABI, 'placePixelsHook'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: teamNumChangerABI,
    functionName: 'placePixelsHook',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof teamNumChangerABI,
    'placePixelsHook'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link xIstABI}__.
 *
 *
 */
export function useXIstRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof xIstABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    ...config,
  } as UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"MAX_MINTS_PER_EPOCH"`.
 *
 *
 */
export function useXIstMaxMintsPerEpoch<
  TFunctionName extends 'MAX_MINTS_PER_EPOCH',
  TSelectData = ReadContractResult<typeof xIstABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'MAX_MINTS_PER_EPOCH',
    ...config,
  } as UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"MAX_TOTAL_MINTS"`.
 *
 *
 */
export function useXIstMaxTotalMints<
  TFunctionName extends 'MAX_TOTAL_MINTS',
  TSelectData = ReadContractResult<typeof xIstABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'MAX_TOTAL_MINTS',
    ...config,
  } as UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"allowance"`.
 *
 *
 */
export function useXIstAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof xIstABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"balanceOf"`.
 *
 *
 */
export function useXIstBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof xIstABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"decimals"`.
 *
 *
 */
export function useXIstDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof xIstABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"gameEndTime"`.
 *
 *
 */
export function useXIstGameEndTime<
  TFunctionName extends 'gameEndTime',
  TSelectData = ReadContractResult<typeof xIstABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'gameEndTime',
    ...config,
  } as UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"getRemainingMints"`.
 *
 *
 */
export function useXIstGetRemainingMints<
  TFunctionName extends 'getRemainingMints',
  TSelectData = ReadContractResult<typeof xIstABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'getRemainingMints',
    ...config,
  } as UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"name"`.
 *
 *
 */
export function useXIstName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof xIstABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"numMints"`.
 *
 *
 */
export function useXIstNumMints<
  TFunctionName extends 'numMints',
  TSelectData = ReadContractResult<typeof xIstABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'numMints',
    ...config,
  } as UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"owner"`.
 *
 *
 */
export function useXIstOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof xIstABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"pixelsMap"`.
 *
 *
 */
export function useXIstPixelsMap<
  TFunctionName extends 'pixelsMap',
  TSelectData = ReadContractResult<typeof xIstABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'pixelsMap',
    ...config,
  } as UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"symbol"`.
 *
 *
 */
export function useXIstSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof xIstABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"totalSupply"`.
 *
 *
 */
export function useXIstTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof xIstABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof xIstABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link xIstABI}__.
 *
 *
 */
export function useXIstWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof xIstAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof xIstABI, string>['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof xIstABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof xIstABI, TFunctionName, TMode>({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"approve"`.
 *
 *
 */
export function useXIstApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof xIstAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof xIstABI, 'approve'>['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof xIstABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof xIstABI, 'approve', TMode>({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 *
 */
export function useXIstDecreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof xIstAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof xIstABI,
          'decreaseAllowance'
        >['request']['abi'],
        'decreaseAllowance',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'decreaseAllowance'
      }
    : UseContractWriteConfig<typeof xIstABI, 'decreaseAllowance', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'decreaseAllowance'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof xIstABI, 'decreaseAllowance', TMode>({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'decreaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 *
 */
export function useXIstIncreaseAllowance<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof xIstAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof xIstABI,
          'increaseAllowance'
        >['request']['abi'],
        'increaseAllowance',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'increaseAllowance'
      }
    : UseContractWriteConfig<typeof xIstABI, 'increaseAllowance', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'increaseAllowance'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof xIstABI, 'increaseAllowance', TMode>({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'increaseAllowance',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"mint"`.
 *
 *
 */
export function useXIstMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof xIstAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof xIstABI, 'mint'>['request']['abi'],
        'mint',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'mint' }
    : UseContractWriteConfig<typeof xIstABI, 'mint', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'mint'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof xIstABI, 'mint', TMode>({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"setGameEndTime"`.
 *
 *
 */
export function useXIstSetGameEndTime<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof xIstAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof xIstABI,
          'setGameEndTime'
        >['request']['abi'],
        'setGameEndTime',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setGameEndTime'
      }
    : UseContractWriteConfig<typeof xIstABI, 'setGameEndTime', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setGameEndTime'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof xIstABI, 'setGameEndTime', TMode>({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'setGameEndTime',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"setPixelsMap"`.
 *
 *
 */
export function useXIstSetPixelsMap<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof xIstAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof xIstABI,
          'setPixelsMap'
        >['request']['abi'],
        'setPixelsMap',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setPixelsMap'
      }
    : UseContractWriteConfig<typeof xIstABI, 'setPixelsMap', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setPixelsMap'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof xIstABI, 'setPixelsMap', TMode>({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'setPixelsMap',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"transfer"`.
 *
 *
 */
export function useXIstTransfer<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof xIstAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof xIstABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'transfer' }
    : UseContractWriteConfig<typeof xIstABI, 'transfer', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transfer'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof xIstABI, 'transfer', TMode>({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"transferFrom"`.
 *
 *
 */
export function useXIstTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof xIstAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof xIstABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<typeof xIstABI, 'transferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof xIstABI, 'transferFrom', TMode>({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link xIstABI}__.
 *
 *
 */
export function usePrepareXIstWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof xIstABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof xIstABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"approve"`.
 *
 *
 */
export function usePrepareXIstApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof xIstABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof xIstABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"decreaseAllowance"`.
 *
 *
 */
export function usePrepareXIstDecreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof xIstABI, 'decreaseAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'decreaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof xIstABI, 'decreaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"increaseAllowance"`.
 *
 *
 */
export function usePrepareXIstIncreaseAllowance(
  config: Omit<
    UsePrepareContractWriteConfig<typeof xIstABI, 'increaseAllowance'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'increaseAllowance',
    ...config,
  } as UsePrepareContractWriteConfig<typeof xIstABI, 'increaseAllowance'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"mint"`.
 *
 *
 */
export function usePrepareXIstMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof xIstABI, 'mint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof xIstABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"setGameEndTime"`.
 *
 *
 */
export function usePrepareXIstSetGameEndTime(
  config: Omit<
    UsePrepareContractWriteConfig<typeof xIstABI, 'setGameEndTime'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'setGameEndTime',
    ...config,
  } as UsePrepareContractWriteConfig<typeof xIstABI, 'setGameEndTime'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"setPixelsMap"`.
 *
 *
 */
export function usePrepareXIstSetPixelsMap(
  config: Omit<
    UsePrepareContractWriteConfig<typeof xIstABI, 'setPixelsMap'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'setPixelsMap',
    ...config,
  } as UsePrepareContractWriteConfig<typeof xIstABI, 'setPixelsMap'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"transfer"`.
 *
 *
 */
export function usePrepareXIstTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof xIstABI, 'transfer'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof xIstABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link xIstABI}__ and `functionName` set to `"transferFrom"`.
 *
 *
 */
export function usePrepareXIstTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof xIstABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof xIstABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link xIstABI}__.
 *
 *
 */
export function useXIstEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof xIstABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    ...config,
  } as UseContractEventConfig<typeof xIstABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link xIstABI}__ and `eventName` set to `"Approval"`.
 *
 *
 */
export function useXIstApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof xIstABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof xIstABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link xIstABI}__ and `eventName` set to `"Transfer"`.
 *
 *
 */
export function useXIstTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof xIstABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof xIstAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: xIstABI,
    address: xIstAddress[chainId as keyof typeof xIstAddress],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof xIstABI, 'Transfer'>)
}
