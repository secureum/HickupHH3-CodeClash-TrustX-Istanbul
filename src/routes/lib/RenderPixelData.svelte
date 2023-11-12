<script lang="ts">
 export let selected: {
  pixel: number | string; // as it is prefixed with 'Pixel #' it might be a number or a string representing a number
  miner: string; // used as a part of a URL and sliced, suggesting it's a string, likely an address
  numMinerInstancesOverwritten: number; // prefixed with 'Instances overwritten:', suggesting a numeric value
  numColorInstancesOverwritten: number; // prefixed with 'Color Instances Overwritten:', suggesting a numeric value
  colorTeamNumber: number | string; // as it is prefixed with 'Team Number:', it could be a number or a string representing a team number
  color: string; // just 'Color:', likely a string representing a color value
};

const address0 = '0x0000000000000000000000000000000000000000';

</script>

<div class="w-[350px] mx-auto">
    <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div class="flex space-x-4">
        <div class="rounded-full bg-slate-200 h-10 w-10"></div>
        <div class="flex-1">
            <div class="flex flex-col">
                <div>Pixel #{selected.pixel}</div>
                <div class="text-sm">
                    Miner: 
                    {#if selected.miner == address0}
                    Address(0)
                    {:else}
                    <a target="_blank" class="   text-blue-600 underline hover:text-blue-800" href="https://sepolia.etherscan.io/address/{selected.miner}">
                        {selected.miner.slice(0, 10)}...{selected.miner.slice(-10)}
                    </a>
                    {/if}
                </div>
                <div class="text-sm">Instances overwritten: {selected.numMinerInstancesOverwritten}</div>
                <div class="text-sm">Color Instances Overwritten: {selected.numColorInstancesOverwritten}</div>
                <div class="text-sm">Team Number: {selected.colorTeamNumber == 0 ? 'empty' : '#'+selected.colorTeamNumber}</div>
                <div class="text-sm">Color: {selected.color}</div>
            </div>
        </div>
        </div>
    </div>
</div>
