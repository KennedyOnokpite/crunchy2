<script lang="ts">
  import { store } from "./store";

  function flipBoard() {
    $store.flippedBoardView = !$store.flippedBoardView;
    $store.order = $store.order.reverse();
  }

  function flipSideToMove() {
    $store.whiteToMove = !$store.whiteToMove;
  }

  function flipCoordinatesVisibility() {
    $store.hideCoordinates = !$store.hideCoordinates;
  }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flex w-[26rem]">
  <div
    on:click={flipBoard}
    class="flex-1 text-center bg-red-500 text-white cursor-pointer"
  >
    FLIP
  </div>
  <div
    class="flex-1 text-center bg-red-500 text-white cursor-pointer"
    on:click={flipCoordinatesVisibility}
  >
    SHOW/HIDE
  </div>
  <div
    on:click={flipSideToMove}
    class="flex-1 text-center bg-red-500 text-white cursor-pointer"
  >
    TURN
  </div>
</div>
