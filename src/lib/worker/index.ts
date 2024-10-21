import type { API } from "./start";

import { cacheSingleton } from "$lib/utils/cache";
import { wrap } from "comlink";

export const getWorker = cacheSingleton(() => wrap<API>(new SharedWorker(new URL("./start.ts", import.meta.url), { type: "module" }).port));
