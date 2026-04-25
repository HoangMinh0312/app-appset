const http = require('http');
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'hello-world';

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', app: APP_NAME }));
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Hello from ${APP_NAME}! 🚀\n`);
});

server.listen(PORT, () => {
  console.log(`[${APP_NAME}] listening on port ${PORT}`);
});
