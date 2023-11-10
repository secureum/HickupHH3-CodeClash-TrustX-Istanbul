import { writable, get } from 'svelte/store';

import { publicClient } from './store';

import { PixelsMap, Xist, contractAddresses } from '../interface'

// export an empty array with all pixels
export const pixels = writable(new Array(64));
// export an empty object with all team names
export const teamNames = writable({});

export async function loadPixeles() {
    const $publicClient = get(publicClient);
    // fetch all pixels from the contract
    const fetchedPixels = await $publicClient.readContract({
      address: contractAddresses.pixelsMap,
      abi: PixelsMap,
      functionName: 'getRangePixelData',
      args: [0n, 64n]
    });
  
    let newPixels = get(pixels);
    
    fetchedPixels.forEach((e, i) => {
        newPixels[i] = e
    });

    pixels.set(newPixels);

    const teamNumbers = [...new Set(
      fetchedPixels.map((e) => e.colorTeamNumber).filter(teamN => teamN != 0)
    )];
  
    if(teamNumbers.length == 0) return;

    const _names = await $publicClient.readContract({
        address: contractAddresses.pixelsMap,
        abi: PixelsMap,
        functionName: 'getTeamNames',
        args: [teamNumbers]
    });
    
    const _teamNames = get(teamNames);

    teamNumbers.forEach((e, i) => {
        _teamNames[e] = _names[i];
    });
    teamNames.set(_teamNames);
  }