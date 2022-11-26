<script>
  import { store } from "./store";
  const files = ["A", "B", "C", "D", "E", "F", "G", "H"];

  $: fileCoordinates = $store.hideCoordinates ? "hidden" : "";
</script>

<div
  class="col-start-2 col-end-3 row-start-3 row-end-4 flex {fileCoordinates}"
>
  {#each files as file, index (file)}
    <div
      class="flex-1 flex justify-center items-center text-white text-xs font-semibold"
      style="order: {$store.order[index]};"
    >
      {file}
    </div>
  {/each}
</div>
