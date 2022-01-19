
// var WebSocketServer = require("ws").Server
var WebSocket = require("ws")
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/public"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocket.WebSocketServer({server: server})
// console.log("websocket server created")




// const WebSocket = require('ws');

// var port = process.env.PORT | 8080;
// if (process.argv.length == 3) port = process.argv[2];
// else if (process.argv.length != 2) {
//   console.log("usage: node server.mjs [optional port number]" );
//   console.log("default port is 8080" );
//   process.exit (1);
// }

// const wss = new WebSocket.WebSocketServer({ port: port });
console.log ("INScore Web Socket Broadcaster is running on port");

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

