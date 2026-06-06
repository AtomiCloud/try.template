const PORT = Number(process.env.PORT ?? 3000);

const html = Bun.file(new URL('./index.html', import.meta.url));

const server = Bun.serve({
  port: PORT,
  hostname: '0.0.0.0',
  fetch(req) {
    const { pathname } = new URL(req.url);

    if (pathname === '/healthz') {
      return new Response('ok', { status: 200 });
    }

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  },
});

console.log(`Listening on http://${server.hostname}:${server.port}`);
