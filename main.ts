Deno.serve((req) => {
  if (req.method === "GET") {
    const paramString = req.url.split("?")[1];
    const paramStringSplitted = paramString.split("&");
    const params = paramStringSplitted.reduce<{ [key: string]: string }>(
      (acc, it) => {
        const parsed = it.split("=");
        acc[parsed[0]] = decodeURIComponent(parsed[1]);
        return acc;
      },
      {},
    );
    console.log(params);

    const response = `
<svg version="1.1"
     width="500" height="200"
     xmlns="http://www.w3.org/2000/svg">
  <image href="${params.imageUrl}" x="200" y="0" height="100px" width="100px" />
  <line x1="150" x2="350" y1="100" y2="100" stroke="grey" stroke-width="2" />
  <text x="250" y="125"
    text-anchor="middle"
    dominant-baseline="middle"
    font-family="monospace"
    font-size="2em"
    font-size-adjust="0.5"
  >
    ${params.title}
  </text>
</svg>
    `;
    return new Response(response, {
      headers: {
        "Content-Type": "image/svg+xml",
      },
    });
  }
});
