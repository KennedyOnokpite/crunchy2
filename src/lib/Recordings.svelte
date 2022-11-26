<script>
  import { store } from "$lib/store";
  import { puzzle } from "$lib/puzzle";

  $: color = $puzzle.solution.startsWith($puzzle.userSolution)
    ? "bg-green-500"
    : "bg-red-500";
</script>

<main class="{color} text-white">
  {$store.recordings}
</main>
