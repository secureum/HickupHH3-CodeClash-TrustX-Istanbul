<script lang="ts">
import { onMount } from "svelte";

export let gameEndTime = 0n;
let now = +(new Date());
let countDown = '00:00:00';
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

onMount(() => {
  setInterval(() => {
    now = +(new Date());
  }, 1000);
});
</script>

<b>
    {countDown}
</b>