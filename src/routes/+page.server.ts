import type { PageServerLoad } from "./$types";

import { load as loadCheerio } from "cheerio";

export const load = (async ({ fetch }) => {
  const html = (await fetch("https://pypi.org/project/markdownify/").then(res => res.text()));
  const $ = loadCheerio(html);
  const example = $(".project-description").first().html()!.trim();
  return { example };
}) satisfies PageServerLoad;
