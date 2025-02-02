<script lang="ts">
  import "@unocss/reset/tailwind.css";
  import "@fontsource-variable/jetbrains-mono";
  import "uno.css";

  interface Props {
    children?: import("svelte").Snippet;
  }

  const { children }: Props = $props();
</script>

<svelte:head>
  <link rel="icon" href="https://api.iconify.design/fluent-color:document-16.svg" />
</svelte:head>

{@render children?.()}

<style>
  :global(html) {
    --uno: flex flex-col items-center overflow-x-hidden bg-neutral-9 text-white;
  }

  :global(*)::selection {
    --uno: bg-white/15;
  }

  :global(body)::-webkit-scrollbar {
    --uno: w-1 bg-neutral-9 2xl-w-3.5 lg-w-2.5 md-w-2 sm-w-1.5 xl-w-3;
  }

  :global(body)::-webkit-scrollbar-thumb {
    --uno: rounded-l-sm bg-neutral-7/30 hover-bg-neutral-7/70;
  }

  :global(body *)::-webkit-scrollbar {
    --uno: hidden;
  }
</style>
