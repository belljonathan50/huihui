
var ws = null;
var wsclient = null;

function connect (url) {
    if (!url)
        url = location.origin.replace(/^http/, 'ws');
    ws = new WebSocket(url);
    if (ws) {
        ws.onmessage = function(msg) { receive (msg.data); };
        console.log ("Connected to", url)
        // setInterval(() => { ws.send ('dummy'); }, 20000);
    }
    else console.log ("can't open websocket");
}

function wsSend (data) { 
    try {
        ws.send (data); 
    }
    catch (err) {
        console.log (err, ": reopen websocket" );
        connect();
        wsSend (data);
    }
}

function receive (data) {
    if (wsclient) wsclient (data);
}

var gTime = timesync.create({
    server: '/timesync',
    interval: 10000
});
