
var ws = null;
var port = 8080;
var wsclient = null;

function connect (url) {
    if (!url)
        url = location.origin.replace(/^http/, 'ws'); //.replace(/:[0-9]+/, ':'+port);
    ws = new WebSocket(url);
    if (ws) {
        ws.onmessage = function(msg) { receive (msg.data); };
        console.log ("Connected to", url)
    }
}

function wsSend (data) { 
    ws.send (data); 
}

function receive (data) {
    if (wsclient) wsclient (data);
}
