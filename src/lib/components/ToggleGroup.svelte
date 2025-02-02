<script lang="ts">
  interface Props {
    values: string[];
    choice: string;
  }

  let { values, choice = $bindable() }: Props = $props();
</script>

<div class="flex flex-row items-center gap-1 rounded-md bg-neutral-8 p-1 text-xs shadow-(md neutral-9/15)">
  {#each values as id}
    <input tabindex="-1" type="radio" {id} class="sr-only" onselect={() => choice = id} checked={choice === id} />
    <button onclick={() => choice = id} class="rounded px-2 py-1 transition hover:bg-neutral-7" class:on={choice === id}>{id}</button>
  {/each}
</div>

<style>
  .on {
    --uno: bg-neutral-3 text-neutral-8;
  }
</style>
