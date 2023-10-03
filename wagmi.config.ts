import { defineConfig } from '@wagmi/cli'
import { foundry, react } from '@wagmi/cli/plugins'
import * as chains from 'wagmi/chains'

export default defineConfig({
  out: 'src/generated.ts',
  plugins: [
    foundry({
      deployments: {
        X_IST: {
          // [chains.sepolia.id]: '0x148412086B279215e2F7feC41A912cBcE4B4c37f',
          [chains.foundry.id]: '0x148412086B279215e2F7feC41A912cBcE4B4c37f',
        },
        IPixelsMap: {
          // [chains.sepolia.id]: '0xDAA3fE43209090BDcf8453faa8A1ADdb040686bf',
          [chains.foundry.id]: '0xDAA3fE43209090BDcf8453faa8A1ADdb040686bf',
        }
      },
      project: './contracts',
    }),
    react(),
  ],
})
