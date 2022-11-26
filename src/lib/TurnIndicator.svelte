<script lang="ts">
  import { store } from "./store";

  $: setTurnIndicator = function () {
    const { lightSquareColor, darkSquareColor, whiteToMove, flippedBoardView } =
      $store;
    if (whiteToMove && !flippedBoardView)
      return `w-4 h-4 rounded-2xl mt-auto ${lightSquareColor}`;
    if (whiteToMove && flippedBoardView)
      return `w-4 h-4 rounded-2xl mb-auto ${lightSquareColor}`;
    if (!whiteToMove && flippedBoardView)
      return `w-4 h-4 rounded-2xl mt-auto ${darkSquareColor}`;
    if (!whiteToMove && !flippedBoardView)
      return `w-4 h-4 rounded-2xl mb-auto ${darkSquareColor}`;
  };
</script>

<div class="col-start-3 col-end-4 row-start-2 row-end-3 flex flex-col">
  <div class={setTurnIndicator()} />
</div>
