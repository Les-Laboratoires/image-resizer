addEventListener("fetch", (event) => {
  const { pathname } = new URL(event.request.url);
  if(pathname.startsWith("resize")) {
    if(event.request.method !== "POST") return new Response(null, {
      status: 405,
      statusText: "Method Not Allowed",
    })
    else return handleResizeRoute(event.request, event)
  }
  return new Response(null, {
    status: 404,
    statusText: "Page Not Found",
  })
});

async function handleResizeRoute(request, event) {

  const contentType = request.headers.get("content-type");

  if(!contentType) {
    return new Response(
      JSON.stringify({ error: "please provide 'content-type' header" }),
      {
        status: 400,
        statusText: "Bad Request",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    )
  }


  if(!contentType.includes('image/')) {
    return new Response(
      JSON.stringify({ error: "please send an image" }),
      {
        status: 400,
        statusText: "Bad Request",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    )
  }

  return new Response(request.body, {
    status: 200,
    headers: {
      "Content-Type": contentType
    }
  })
}
