/* eslint-disable no-restricted-globals */

/// <reference lib="webworker" />

import { getPy } from "./py";
import { expose } from "comlink";

(self as unknown as SharedWorkerGlobalScope).addEventListener("connect", (event) => {
  const [port] = event.ports;
  expose(workerNamespace, port);
});

const workerNamespace = {
  async toMarkdown(source: string) {
    const py = await getPy();
    const result = py.globals.get("to_markdown")(source);
    return String(result);
  },
  async isPython(source: string) {
    const py = await getPy();
    return py.globals.get("is_python")(source) as boolean;
  },
};

export type API = typeof workerNamespace;
