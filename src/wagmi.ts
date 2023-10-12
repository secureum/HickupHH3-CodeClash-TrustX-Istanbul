import { configureChains, createConfig } from 'wagmi'
import { Chain } from 'wagmi/chains';
import { foundry, sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const Buildbear = {
    id: 11_791,
    name: 'Buildbear Testnet',
    network: 'Buildbear Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ['https://rpc.buildbear.io/legitimate-obi-wan-kenobi-edefbce3'] },
      default: { http: ['https://rpc.buildbear.io/legitimate-obi-wan-kenobi-edefbce3'] },
    },
    blockExplorers: {
      etherscan: { name: 'Buildbear', url: 'https://explorer.buildbear.io/legitimate-obi-wan-kenobi-edefbce3/' },
      default: { name: 'Buildbear', url: 'https://explorer.buildbear.io/legitimate-obi-wan-kenobi-edefbce3/' },
    }
  } as const satisfies Chain;

const { publicClient } = configureChains([foundry], [publicProvider()]);
// const { publicClient } = configureChains([Buildbear], [publicProvider()]);

export const config = createConfig({ publicClient })
