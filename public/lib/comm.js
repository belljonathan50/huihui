
var ws = null;
var wsclient = null;

function connect (url) {
    if (!url)
        url = location.origin.replace(/^http/, 'ws');
    ws = new WebSocket(url);
    if (ws) {
        ws.onmessage = function(msg) { receive (msg.data); };
        console.log ("Connected to", url)
        setInterval(() => { ws.send ('dummy'); }, 20000);
    }
}

function wsSend (data) { 
    ws.send (data); 
}

function receive (data) {
    if (wsclient) wsclient (data);
}
