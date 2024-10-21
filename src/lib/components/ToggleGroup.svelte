<script lang="ts">
  export let values: string[];
  export let choice: (typeof values)[number];
</script>

<div class="flex flex-row items-center gap-1 rounded-md bg-neutral-8 p-1 text-xs shadow-(md neutral-9/15)">
  {#each values as id}
    <input tabindex="-1" type="radio" {id} class="sr-only" on:select={() => choice = id} checked={choice === id} />
    <button on:click={() => choice = id} class="rounded px-2 py-1 transition hover:bg-neutral-7" class:on={choice === id}>{id}</button>
  {/each}
</div>

<style>
    .on {
      --uno: bg-neutral-3 text-neutral-8;
    }
  </style>
