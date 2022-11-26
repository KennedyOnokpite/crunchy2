<script>
  import { store } from "./store";
  const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"];
  $: rankCoordinates = $store.hideCoordinates ? "hidden" : "";
</script>

<div
  class="col-start-1 col-end-2 row-start-2 row-end-3 flex flex-col {rankCoordinates}"
>
  {#each ranks as rank, index (rank)}
    <div
      class="flex-1 flex justify-center items-center text-white text-xs font-semibold"
      style="order: {$store.order[7 - index]};"
    >
      {rank}
    </div>
  {/each}
</div>
