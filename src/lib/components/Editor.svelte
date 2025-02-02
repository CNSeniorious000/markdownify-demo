<script module>
  let firstLoad = $state(true);
</script>

<script lang="ts">
  import type monaco from "monaco-editor-core";

  import { shikiToMonaco } from "@shikijs/monaco";
  import { type BundledLanguage, type BundledTheme, getSingletonHighlighter } from "shiki/bundle/web";
  import { onDestroy, onMount } from "svelte";
  import { fade } from "svelte/transition";

  interface Props {
    source: string;
    showLineNum?: boolean;
    wrap?: boolean;
    lang: BundledLanguage;
    theme?: BundledTheme;
  }

  let {
    source = $bindable(),
    showLineNum = false,
    wrap = false,
    lang,
    theme = "vitesse-dark",
  }: Props = $props();

  let container = $state<HTMLDivElement>();
  let editor = $state<monaco.editor.IStandaloneCodeEditor>();
  let core: typeof monaco;

  function getHighlighter(language: BundledLanguage) {
    return getSingletonHighlighter({ langs: [language], themes: [theme] });
  }

  async function loadLanguage(language: BundledLanguage) {
    core.languages.register({ id: language });
    shikiToMonaco(await getHighlighter(language), core);
  }

  onMount(async () => {
    [core] = await Promise.all([import("monaco-editor-core"), getHighlighter(lang)]);
    await loadLanguage(lang);

    if (!container)
      return;

    editor = core.editor.create(container, {
      value: source,
      language: lang,
      theme,
      fontFamily: "JetBrains Mono Variable",
      fontSize: 12,
      smoothScrolling: true,
      lineHeight: 1.6,
      // minimap: { enabled: false },
      fontLigatures: true,
      lineNumbers: showLineNum ? "interval" : "off",
      roundedSelection: false,
      cursorBlinking: "phase",
      wordWrap: wrap ? "on" : "off",
      cursorSmoothCaretAnimation: "explicit",
      renderLineHighlight: "all",
      renderLineHighlightOnlyWhenFocus: true,
      padding: { top: 24 },
      scrollBeyondLastLine: false,
      automaticLayout: true,
    });

    firstLoad = false;

    editor.onDidChangeModelContent(() => source = editor!.getValue());
  });

  $effect(() => {
    editor?.setValue(source);
  });

  onDestroy(() => editor?.dispose());
</script>

<div bind:this={container} class="h-full w-full overflow-hidden transition-opacity duration-400" class:op-0={!editor && firstLoad}></div>

{#if !editor && firstLoad}
  <div class="absolute inset-0 grid place-items-center @container" out:fade>
    <div class="flex flex-row items-center gap-2 op-80">
      <div class="i-svg-spinners-90-ring-with-bg"></div>
      <div class="hidden text-sm tracking-wide @lg:block">initiating monaco editor</div>
    </div>
  </div>
{/if}
