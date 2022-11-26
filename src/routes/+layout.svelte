<script lang="ts">
  import "../app.css";
  import type { LayoutData } from "./$types";
  export let data: LayoutData;
</script>

<nav class="bg-green-500 text-white text-center flex">
  <a class="p-4 flex-1 cursor-pointer" href="/">Home</a>
  <a
    class="p-4 flex-1 cursor-pointer"
    href={data?.username ? "/tactics" : "/login"}>Tactics</a
  >
  {#if data.username}
    <a class="p-4 flex-1 cursor-pointer" href="/profile">{data.username}</a>
  {:else}
    <a class="p-4 flex-1 cursor-pointer" href="/login">Log in</a>
  {/if}
</nav>
<slot />
