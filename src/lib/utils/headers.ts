const excludeRequestHeaders = ["authorization", "host", "origin", "cookie", "accept-encoding"];

export function forwardRequestHeaders(headersIn: Headers) {
  const headers = new Headers();
  headersIn.forEach((value, key) => {
    if (!excludeRequestHeaders.includes(key.toLowerCase())) {
      headers.set(key, value);
    }
  });
  return headers;
}
