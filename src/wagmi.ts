import { configureChains, createConfig } from 'wagmi'
import { Chain } from 'wagmi/chains';
import { foundry, sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const Buildbear = {
    id: 11_613,
    name: 'Buildbear Testnet',
    network: 'Buildbear Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: ['https://rpc.buildbear.io/eastern-qui-gon-jinn-fd75f9d5'] },
      default: { http: ['https://rpc.buildbear.io/eastern-qui-gon-jinn-fd75f9d5'] },
    },
    blockExplorers: {
      etherscan: { name: 'Buildbear', url: 'https://explorer.buildbear.io/eastern-qui-gon-jinn-fd75f9d5/' },
      default: { name: 'Buildbear', url: 'https://explorer.buildbear.io/eastern-qui-gon-jinn-fd75f9d5/' },
    }
  } as const satisfies Chain;

const { publicClient } = configureChains([foundry], [publicProvider()]);

export const config = createConfig({ publicClient })
