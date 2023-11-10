import { configureChains, createConfig } from 'wagmi'
import { Chain } from 'wagmi/chains';
import { foundry, sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

// const { publicClient } = configureChains([foundry], [publicProvider()]);
const { publicClient } = configureChains([sepolia], [publicProvider()]);

export const config = createConfig({ publicClient })
