import script from "./main.py?raw";
import { cacheSingleton } from "$lib/utils/cache";

export const getPy = cacheSingleton(async () => {
  const { loadPyodide, version } = await import("pyodide");
  const py = await loadPyodide({ indexURL: `https://cdn.promplate.dev/pyodide/v${version}`, packages: ["micropip"] });
  await py.pyimport("micropip.install")("markdownify");
  py.runPython(script);
  return py;
});
