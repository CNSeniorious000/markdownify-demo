<script context="module">
  import { lru } from "$lib/utils/cache";
  import { codeToHtml } from "shiki/bundle/web";

  const cachedRender = lru(codeToHtml);
</script>

<script lang="ts">
  import type { BundledLanguage, BundledTheme } from "shiki/bundle/web";

  export let lang: BundledLanguage | "ansi" | "text";
  export let source: string;
  export let theme: BundledTheme = "vitesse-dark";

  let html = "";

  $: cachedRender(source, { lang, theme }).then((out) => (html = out));
</script>

<div class="line-height-relaxed [&_*]:font-mono">
  {#if html}
    {@html html}
  {:else}
    <pre><code class="!text-#cdcabe">{source}</code></pre>
  {/if}
</div>
