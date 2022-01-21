
const Max = require('max-api');
const WS  = require('ws');

var ws = null;
Max.outlet("WebSocket is running");

Max.addHandler("connect", (url) => {
	ws = new WS.WebSocket (url)
	if (ws)
		Max.outlet("Connected to", url);
	else
		Max.outlet("Can't connect to", url);
});

Max.addHandler("send", (msg) => {
	if (ws)	
		ws.send(msg);
	else
		Max.outlet("Can't send '" + msg + "': websocket is not connected");
});

Max.addHandler("inscore", (msg) => {
	let b64 = Buffer.from (msg).toString('base64');
	if (ws)	
		ws.send('INSCORE ' + b64);
	else
		Max.outlet("Can't send '" + msg + "': websocket is not connected");
});
