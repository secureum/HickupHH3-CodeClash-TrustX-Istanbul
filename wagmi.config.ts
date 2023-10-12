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
          11791: '0x148412086B279215e2F7feC41A912cBcE4B4c37f'
        },
        IPixelsMap: {
          // [chains.sepolia.id]: '0x7b1E6F8771adeDFE06bad75980292d2068F55Ab4',
          [chains.foundry.id]: '0x7b1E6F8771adeDFE06bad75980292d2068F55Ab4',
          11791: '0x7b1E6F8771adeDFE06bad75980292d2068F55Ab4'
        }
      },
      project: './contracts',
    }),
    react(),
  ],
})
