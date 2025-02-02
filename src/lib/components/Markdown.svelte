<script lang="ts">
  import "../md.css";

  import code from "./CodeBlock.svelte";
  import SvelteMarkdown from "@humanspeak/svelte-markdown";

  const { text }: { text: string } = $props();
</script>

<article class="max-h-full max-w-full p-3 text-neutral-3 prose">
  <SvelteMarkdown source={text} renderers={{ code }} />
</article>
