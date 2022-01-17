
const WebSocket = require('ws');

var port = 8080;
if (process.argv.length == 3) port = process.argv[2];
else if (process.argv.length != 2) {
  console.log("usage: node server.mjs [optional port number]" );
  console.log("default port is 8080" );
  process.exit (1);
}

const wss = new WebSocket.WebSocketServer({ port: port });
console.log ("INScore Web Socket Server running on port", port);

wss.on('connection', function connection(ws) {
  console.log ("new connection - clients count", wss.clients.size)
  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

