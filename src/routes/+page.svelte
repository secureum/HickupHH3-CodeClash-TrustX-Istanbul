<script>
import { initPublicClient, publicClient, loaded, 
  epochNum,epochMintsRemaining,totalMintsRemaining, colors,
  fetchData } from './lib/store';

  import { parseAbiItem } from 'viem' 

  import { onMount } from 'svelte';
import { toast } from '@zerodevx/svelte-toast'

import { PixelsMap, Xist, contractAddresses } from './interface'


  let selectedPixel = -1;
  let focusPixel = -1;
  let gameEndTime = 0n;
  let now = +(new Date());
  let countDown = '00:00:00';

  let basePixels = new Array(64)
  let showPixelNumber = false;

  let teamNames = {};

  $: delta = Math.round(Number(gameEndTime) - (now / 1000));

  $: if(delta > 0) {
    let leftover = delta
    let days = Math.floor(leftover / (3600 * 24));
    leftover = leftover - (days * 3600 * 24);
    let hours = Math.floor(leftover / 3600);
    leftover = leftover - (hours * 3600);
    let minutes = Math.floor(leftover / 60);
    leftover = leftover - (minutes * 60);
    let seconds = leftover;
    countDown ='';
    if(days>0){
      countDown = `${days} days, `;
      if (hours>0) countDown += `${hours} hours, `;
      if(minutes>0) countDown += `${minutes} minutes, `;
      countDown += `${seconds} seconds`;
    } else {
      countDown = `${hours}:${minutes}:${seconds}`;
    }
  } else {
    countDown = 'Game Over'
  }

  $: selected = basePixels[selectedPixel];

  $: topPainters = Object.keys(colors).filter(k => k > 0).map((k) => {
    return {
      teamNumber: k,
      count: basePixels.filter((e) => e && e.colorTeamNumber == k).length,
      pixels: basePixels.filter((e) => e && e.colorTeamNumber == k).map((e, i) => i).join(', ')
    }
  }).sort((a,b) => b.count - a.count).slice(0, 10).filter(k => k.count > 0 );

  async function loadPixeles() {
    const blocks = await $publicClient.readContract({
      address: contractAddresses.pixelsMap,
      abi: PixelsMap,
      functionName: 'getRangePixelData',
      args: [0n, 64n]
    });

    blocks.forEach((e, i) => {
      basePixels[i] = e
    });
    const teamNumbers = [...new Set(
      blocks.map((e) => e.colorTeamNumber).filter(teamN => teamN != 0)
    )];

    const _names = await $publicClient.readContract({
      address: contractAddresses.pixelsMap,
      abi: PixelsMap,
      functionName: 'getTeamNames',
      args: [teamNumbers]
    });

    teamNumbers.forEach((e, i) => {
      teamNames[e] = _names[i];
    });

    teamNames = {...teamNames};
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

    setInterval(() => {
      now = +(new Date());
    }, 1000)
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

  /*
   */
</script>

<h1 class="mx-auto text-4xl text-center mt-2 mb-6">Welcome to CodeClash</h1>


<div class="flex justify-between">
  <div class="w-1/5 mx-2">
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
        <b>{countDown}</b>
      {:else}
        <div class="animate-pulse rounded mt-0.5 h-5 block bg-slate-200 w-30"></div>
      {/if}
    </div>
    <div class="hidden">
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

  <div class="flex flex-col justify-center w-3/5">
    <div class="pixel-art-container" class:loading={!$loaded}>
      {#each basePixels as e,i}
        <div 
          style="background-color: {(e ? colors[e.color] : '#ffffff')}"
          class:text-transparent={!showPixelNumber} 
          class:selected={i == selectedPixel} 
        on:click={() => { if($loaded) selectedPixel = i == selectedPixel ? -1 : i}}>{i}</div>    
      {/each}
    </div>
    <label class="mx-auto">
      <input type="checkbox" bind:checked={showPixelNumber} />
      Show Pixel Number
    </label>
    
    {#if $loaded && (selectedPixel != -1 || focusPixel != -1)}
      <div class="w-[350px] mx-auto">
        <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div class="flex space-x-4">
            <div class="rounded-full bg-slate-200 h-10 w-10"></div>
            <div class="flex-1">
                <div class="flex flex-col">
                  <div>Pixel #{selectedPixel}</div>
                  <div class="text-sm">Miner: {selected.miner}</div>
                  <div class="text-sm">Instances overwritten: {selected.numMinerInstancesOverwritten}</div>
                  <div class="text-sm">Color Instances Overwritten: {selected.numColorInstancesOverwritten}</div>
                  <div class="text-sm">Team Number: {selected.colorTeamNumber}</div>
                  <div class="text-sm">Color: {selected.color}</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
  <div class="w-1/5 mx-2">
      <div class="my-2">
        <table class="
        border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm
        ">
          <caption class="text-lg">Top Painters</caption>
          <thead class="bg-slate-50 dark:bg-slate-700">
            <tr>
              <th class="border border-slate-300">Team</th>
              <th class="border border-slate-300">Count</th>
              <th class="border border-slate-300">Pixels</th>
            </tr>
          </thead>
          <tbody>
            {#each topPainters as e}
              <tr>
                <td class="border border-slate-300"><b>#{e.teamNumber}</b> {teamNames[e.teamNumber]}</td>
                <td class="border border-slate-300">{e.count}</td>
                <td class="border border-slate-300">{e.pixels}</td>
              </tr>
            {/each}            
          </tbody></table></div>
          <hr />
          <div class="MuiSheet-root MuiSheet-variantPlain MuiSheet-colorNeutral tables-container css-riejvv-JoySheet-root"><table class="MuiTable-root MuiTable-stickyHeader MuiTable-hoverRow MuiTable-borderAxisXBetween MuiTable-variantPlain MuiTable-colorNeutral MuiTable-sizeSm css-eo04a7-JoyTable-root"><caption>Top Miner Teams</caption><thead><tr><th style="width: 40%;">Team</th><th>Count</th><th style="width: 40%;">Pixels</th></tr></thead><tbody></tbody></table></div><hr class="MuiDivider-root MuiDivider-horizontal css-1n86vx2-JoyDivider-root"><div class="MuiSheet-root MuiSheet-variantPlain MuiSheet-colorNeutral tables-container css-riejvv-JoySheet-root"><table class="MuiTable-root MuiTable-stickyHeader MuiTable-hoverRow MuiTable-borderAxisXBetween MuiTable-variantPlain MuiTable-colorNeutral MuiTable-sizeSm css-eo04a7-JoyTable-root"><caption>Top Miners</caption><thead><tr><th>Address</th><th>Team</th><th>Count</th><th>Pixels</th></tr></thead><tbody></tbody></table></div>
    
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
    @apply grid grid-cols-8 w-[400px] h-[400px] mx-auto border-2 p-1 touch-none select-none;
    grid-column-gap:1px;
		grid-row-gap: 1px;
	}
  .pixel-art-container > div {
    @apply items-center flex justify-center cursor-pointer;
  }
  .pixel-art-container > div:hover {
    @apply outline-dotted outline-blue-100 z-10;
  }

  .pixel-art-container > div.selected {
    @apply outline outline-blue-100 z-10;
  }
</style>