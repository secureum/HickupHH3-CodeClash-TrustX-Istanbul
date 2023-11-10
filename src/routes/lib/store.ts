import { writable, get } from 'svelte/store';
import { createPublicClient, http} from 'viem'
import { sepolia, foundry } from 'viem/chains'

import { Xist, contractAddresses } from '../interface'


export const loaded = writable(false);
export const publicClient = writable(null);
export const blockNumber = writable(0);
export const epochNum = writable(0);
export const epochMintsRemaining = writable(0);
export const totalMintsRemaining = writable(0);

export function initPublicClient() {
  const _publicClient = get(publicClient);
  if (_publicClient) return _publicClient;

  const client = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  publicClient.set(client);
  return client;
}

export async function fetchData(blockNumber: bigint) {
  const client = initPublicClient();
  const [_epochNum, _epochMintsRemaining, _totalMintsRemaining] = await client.readContract({
    address: contractAddresses.XIST,
    abi: Xist,
    functionName: 'getRemainingMints',
    args: [blockNumber],
  });
  
  epochNum.set(_epochNum);
  epochMintsRemaining.set(_epochMintsRemaining);
  totalMintsRemaining.set(_totalMintsRemaining);
}

export const colors = {
        0: '#FFFFFF',
        1: '#F7E7CE',
        2: '#E81416',
        3: '#7B3F00',
        4: '#FFA500',
        5: '#F6C324',
        6: '#FAEB36',
        7: '#79C314',
        8: '#228B22',
        9: '#0476D0',
        10: '#191970',
        11: '#4B369D',
        12: '#70369D',
        13: '#FF69B4',
        14: '#36454F',
        15: '#000000'
    }