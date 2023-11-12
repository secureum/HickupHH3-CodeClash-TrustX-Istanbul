<script>
import { 
  initPublicClient, publicClient, loaded, 
  epochNum,epochMintsRemaining,totalMintsRemaining, colors,
  fetchData 
} from './lib/store';
import {
  pixels, loadPixeles
} from './lib/storePixels';

import { parseAbiItem } from 'viem' 

import { onMount } from 'svelte';
import { toast } from '@zerodevx/svelte-toast'

import { Xist, contractAddresses } from './interface'
import RenderPixelData from './lib/RenderPixelData.svelte';
import Countdown from './lib/Countdown.svelte';
  import TablePainters from './lib/TablePainters.svelte';
  import TableMiners from './lib/TableMiners.svelte';

let selectedPixel = -1;
let focusPixel = -1;
let gameEndTime = 0n;

let hoverPixels = [];

let showPixelNumber = false;

let selected = null;
$: if(selectedPixel > -1) {
  selected = {...$pixels[selectedPixel], pixel: selectedPixel};
} else if(focusPixel > -1) {
  selected = {...$pixels[focusPixel], pixel: focusPixel};
} else {
  selected = null;
}


onMount(async () => {
  initPublicClient();
  
  await fetchData(await $publicClient.getBlockNumber());

  // this reads can be groups in a multicall
  gameEndTime = await $publicClient.readContract({
    address: contractAddresses.XIST,
    abi: Xist,
    functionName: 'gameEndTime',
  });
  
  await loadPixeles();

  $publicClient.watchBlockNumber({ onBlockNumber: (n) => {
    fetchData(n);
  }})

  $loaded = true;


  $publicClient.watchEvent({
    address: contractAddresses.XIST,
    event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'), 
    onLogs: logs => {
      logs.forEach((l) => {
        if (l.args.from == "0x0000000000000000000000000000000000000000" && l.args.to !== contractAddresses.pixelsMap){
          // new team
          // use addressRegistrar(l.arfs.to) to know the team number
          
          toast.push('New team registered!');
        } else if(l.args.to == contractAddresses.pixelsMap) {
          loadPixeles();
        }
      })
      logs.filter((l) => {
        return l.args.from == "0x0000000000000000000000000000000000000000"
      })
      // console.log(logs)
    }
  })
})

</script>

<h1 class="mx-auto text-4xl text-center mt-2 mb-6">Welcome to CodeClash</h1>

<div class="flex flex-row max-md:flex-col justify-between">
  <div class="w-1/5 px-2 mb-10 max-md:w-auto mx-auto ">
    <div class="mt-5 flex justify-between border-b">
      <span>Total Mints Left:</span> 
      {#if $loaded}
        <b>{$totalMintsRemaining}</b>
      {:else}
        <div class="animate-pulse rounded mt-0.5 h-5 block bg-slate-200 w-10"></div>
      {/if}
    </div>
    <div class="mt-5 flex justify-between border-b ">
      <span>Epoch:</span>
      {#if $loaded}
        <b>{$epochNum}</b>
      {:else}
        <div class="animate-pulse rounded mt-0.5 h-5 block bg-slate-200 w-10"></div>
      {/if}
    </div>
    <div class="mt-5 flex justify-between border-b ">
      <span>Epoch Mints Left:</span>
      {#if $loaded}
        <b>{$epochMintsRemaining}</b>
      {:else}
        <div class="animate-pulse rounded mt-0.5 h-5 block bg-slate-200 w-10"></div>
      {/if}
    </div>
    <div class="mt-5 flex flex-col justify-between border-b ">
      <span>Game ends in:</span>
      {#if $loaded}
          <Countdown {gameEndTime} />
      {:else}
        <div class="animate-pulse rounded mt-0.5 h-5 block bg-slate-200 w-30"></div>
      {/if}
    </div>
    <div class="max-md:hidden">
      <table>
        <thead>
          <tr>
            <th>Color code number</th>
            <th>Hex value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {#each Object.keys(colors) as k}
          <tr>
            <td>{k}</td>
            <td>{colors[k]}</td>
            <td class="w-10 h-10" style="background-color: {colors[k]};"></td>
          </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <div class="flex flex-col max-md:justify-center mt-10 w-3/5 max-md:w-auto max-md:mx-auto ">
    <div class="pixel-art-container" class:loading={!$loaded}>
      {#each $pixels as e,i}
        <div 
          style="background-color: {(e ? colors[e.color] : '#ffffff')}"
          class:text-transparent={!showPixelNumber && !hoverPixels.includes(i) } 
          class:selected={ hoverPixels.length ? hoverPixels.includes(i) : i == selectedPixel } 
        on:mouseenter={() => { if($loaded) focusPixel = i}}
        on:mouseleave={() => { if($loaded) focusPixel = -1}}
        on:click={() => { if($loaded) selectedPixel = i == selectedPixel ? -1 : i}}>{i}</div>    
      {/each}
    </div>
    <label class="mx-auto">
      <input type="checkbox" bind:checked={showPixelNumber} />
      Show Pixel Number
    </label>
    
    {#if $loaded && selected}
      <RenderPixelData {selected} />
    {/if}
  </div>
  <div class="w-1/5 px-2 mb-10 max-md:w-auto mx-auto">
    <div class="my-4">
      <TablePainters bind:hoverPixels /> 
    </div>
    <hr />
    <div class="my-4">
      <TableMiners bind:hoverPixels /> 
    </div>
    <hr />

    <div class="MuiSheet-root MuiSheet-variantPlain MuiSheet-colorNeutral tables-container css-riejvv-JoySheet-root"><table class="MuiTable-root MuiTable-stickyHeader MuiTable-hoverRow MuiTable-borderAxisXBetween MuiTable-variantPlain MuiTable-colorNeutral MuiTable-sizeSm css-eo04a7-JoyTable-root"><caption>Top Miners</caption><thead><tr><th>Address</th><th>Team</th><th>Count</th><th>Pixels</th></tr></thead><tbody></tbody></table></div>
    
  </div>
</div>

<style>
  .loading {
    @apply animate-pulse;
  }
  .pixel-art-container.loading > div {
    @apply bg-slate-300;
  }

  .pixel-art-container {
    @apply grid grid-cols-8 w-[500px] h-[500px] mx-auto border-2 p-1 touch-none select-none;
    grid-column-gap:1px;
		grid-row-gap: 1px;
	}
  .pixel-art-container > div {
    @apply items-center flex justify-center cursor-pointer outline-transparent;
  }
  .pixel-art-container > div:hover {
    @apply outline-dotted outline-blue-100 z-10;
  }

  .pixel-art-container > div.selected {
    @apply outline outline-blue-800 z-10;
  }
</style>