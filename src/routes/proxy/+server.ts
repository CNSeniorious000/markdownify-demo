import type { RequestHandler } from "./$types";

import { error, text } from "@sveltejs/kit";
import { forwardRequestHeaders } from "$lib/utils/headers";

export const GET: RequestHandler = async ({ fetch, url: { searchParams }, request: { headers } }) => {
  const url = searchParams.get("url");
  if (!url) {
    error(400);
  }

  const html = await fetch(url, { headers: forwardRequestHeaders(headers) }).then(res => res.text());

  return text(html);
};

export const config = { runtime: "edge" };
