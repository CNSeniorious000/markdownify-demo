<script lang="ts">
  import type { BundledLanguage } from "shiki/bundle/web";

  import Highlight from "./Highlight.svelte";
  import { getWorker } from "$lib/worker";
  import { onMount } from "svelte";

  export let lang: BundledLanguage | "";
  export let text: string;

  if (!lang) {
    if (text.startsWith(">>>")) {
      lang = "python";
    } else {
      onMount(async () => {
        const worker = getWorker();
        if (await worker.isPython(text)) {
          lang = "python";
        }
      });
    }
  }
</script>

<Highlight lang={lang || "text"} source={text} />
