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
          // [chains.sepolia.id]: '0x6221F25bA49CA8d8cc42AFCDd04BB7f22e6758C6',
          [chains.foundry.id]: '0x6221F25bA49CA8d8cc42AFCDd04BB7f22e6758C6',
          11791: '0x6221F25bA49CA8d8cc42AFCDd04BB7f22e6758C6'
        }
      },
      project: './contracts',
    }),
    react(),
  ],
})
