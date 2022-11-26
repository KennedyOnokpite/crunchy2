<script lang="ts">
  import Board from "$lib/Board.svelte";
  import RankCoordinates from "./RankCoordinates.svelte";
  import FileCoordinates from "./FileCoordinates.svelte";
  import TurnIndicator from "./TurnIndicator.svelte";
</script>

<main
  class="bg-red-400 rounded-2xl w-[26rem] h-[26rem] grid grid-cols-[1fr_24rem_1fr] grid-rows-[1fr_24rem_1fr]"
>
  <Board />
  <FileCoordinates />
  <RankCoordinates />
  <TurnIndicator />
</main>
