
var ws = null;
var wsclient = null;

function connect (url) {
    if (!url)
        url = location.origin.replace(/^http/, 'ws');
    ws = new WebSocket(url);
    if (ws) {
        ws.onmessage = function(msg) { receive (msg.data); };
        console.log ("Connected to", url)
        ws.onerror = function(msg) { 
            console.log ("websocket error:", msg); 
            console.log ("socket state:", ws.readyState); 
            connect (url);
        };
        //setInterval(() => { ws.send ('dummy'); }, 20000);
    }
    else console.log ("can't open websocket");
}

function wsSend (data) { 
    if (ws.readyState != 1) {
        console.log ("websocket ready state is", ws.readyState)
        connect();
    }
    ws.send (data); 
}

function receive (data) {
    if (wsclient) wsclient (data);
}

var gTime = timesync.create({
    server: '/timesync',
    interval: 10000
});
