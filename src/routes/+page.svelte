<script lang="ts">
  import type { PageServerData } from "./$types";

  import { browser } from "$app/environment";
  import Editor from "$lib/components/Editor.svelte";
  import Highlight from "$lib/components/Highlight.svelte";
  import Markdown from "$lib/components/Markdown.svelte";
  import ToggleGroup from "$lib/components/ToggleGroup.svelte";
  import { getWorker } from "$lib/worker";

  export let data: PageServerData;

  let html = data.example;
  let url = "";
  let output: string;

  async function toMarkdown(html: string) {
    output = await getWorker().toMarkdown(html);
  }

  $: browser && toMarkdown(html);

  let fetching = false;

  $: if (url) {
    fetching = true;
    fetch(`/proxy?url=${encodeURIComponent(url)}`, { headers: { accept: "text/html" } })
      .then(async (res) => {
        html = await res.text();
      })
      .finally(() => fetching = false);
  }

  let editorType: "monaco" | "simple" = "monaco";
  let previewType: "rendered" | "raw" = "rendered";
</script>

<div class="m-6 h-full w-90vw flex flex-col gap-4 [&>section]:(relative h-90vh w-full flex flex-col gap-3 overflow-x-scroll rounded-md <sm:h-[calc(50vh-2rem)]) lg:m-10 sm:m-8 sm:flex-row md:gap-6 xl:gap-8">
  <section class="h-full flex flex-col">
    <input type="url" bind:value={url} placeholder="> Input a full url here to fetch HTML" class="rounded-md bg-#121212 px-4 py-3 text-xs text-neutral-2 font-mono outline-none ring-(neutral-6 inset) transition-shadow focus:ring-1.3 placeholder-neutral-6">
    <div class:op-50={fetching} class="relative h-full overflow-scroll rounded-md bg-#121212 ring-(neutral-6 inset) transition-shadow" class:focus-within:ring-1.3={editorType === "simple"}>
      {#if editorType === "monaco"}
        <Editor showLineNum bind:source={html} lang="html" />
      {:else if editorType === "simple"}
        <div class="relative mx-5 my-4 h-[calc(100%-2rem)] min-h-fit min-w-fit w-[calc(100%-2.5rem)] text-xs [&_pre]:!bg-transparent">
          <Highlight lang="html" source={html} />
          <textarea bind:value={html} class="absolute inset-0 resize-none overflow-hidden ws-pre bg-transparent text-transparent leading-relaxed font-mono caret-white outline-none" />
        </div>
      {/if}
    </div>
    <div class="absolute bottom-5 z-10 flex flex-row gap-1.5 md:right-5 <md:(w-full justify-center)">
      <ToggleGroup values={["monaco", "simple"]} bind:choice={editorType} />
    </div>
  </section>

  <section class="bg-#121212" class:bg-transparent={previewType === "rendered"}>
    {#if output !== undefined}
      <div class="overflow-scroll px-5 py-4">
        {#if previewType === "rendered"}
          <Markdown text={output} />
        {:else if previewType === "raw"}
          <div class="contents text-sm">
            <Highlight lang="md" source={output} />
          </div>
        {/if}
      </div>
      <div class="absolute bottom-5 z-10 flex flex-row gap-1.5 md:left-5 <md:(w-full justify-center)">
        <ToggleGroup values={["rendered", "raw"]} bind:choice={previewType} />
      </div>
    {:else}
      <div class="grid h-full w-full place-items-center text-neutral-5">
        <div class="i-svg-spinners-bars-rotate-fade" />
      </div>
    {/if}
  </section>
</div>
