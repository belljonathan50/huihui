
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
    switch (ws.readyState) {
        case 0:    // connecting
            setTimeout(() => { wsSend (data); }, 50);
            break;
        case 1:    // connected
            ws.send (data);
            break;
        case 2:    // closing
            setTimeout(() => { wsSend (data); }, 50);
            break;
        case 3:    // closed
            console.log ("websocket disconnected")
            connect();
            setTimeout(() => { wsSend (data); }, 50);
            break;
        default:
            console.log ("unknown socket state:", ws.readyState );
    }
    // if (ws.readyState != 1) {
    //     console.log ("websocket ready state is", ws.readyState)
    //     connect();
    //     setTimeout(() => { wsSend (data);}, 50);
    // }
    // else ws.send (data); 
}

function receive (data) {
    if (wsclient) wsclient (data);
}

var gTime = timesync.create({
    server: '/timesync',
    interval: 10000
});
