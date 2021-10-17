
// var url = location.origin.replace(/^http/, 'ws');
// var url = "wss://partitur.herokuapp.com/";
// var url = "ws://192.168.0.8:3000";
// var url = "ws://192.168.1.178:3000";

var url = location.origin.replace(/^http/, 'ws');
var ws = new WebSocket(url);

// var url = "ws://192.168.0.100:3000";


var ws = new WebSocket (url);
// console.log ("ws", ws);
ws.onmessage = function(msg) { receive (msg.data); };

function refresh(){
    setInterval(function(){send("dummy;")},10000)
}
var client = true;

function send (msg) {
    // console.log ("send", msg);
    ws.send (msg);
}

function lastTime() {
    // console.log ("send", msg);
    var msg = inscore.newMessageM("date");
    inscore.msgAddF(msg, lastDate);
    inscore.postMessage("/ITL/scene/pos", msg);
    console.log("tyuytuytuyt")
    
}

function lastStop() {
    lastDate = 0;  
}

function store (any) {
    // console.log ("send", msg);
    window.lastDate = parseFloat(any);
};



function storedSpeed(speed) {
    var msg = inscore.newMessageM('tempo');
    inscore.msgAddF(msg, speed*60);
    inscore.postMessage('/ITL/scene/pos', msg);
};

function storedDate(date) {
    var msg = inscore.newMessageM('tempo');
    inscore.msgAddF(msg, speed*60);
    inscore.postMessage('/ITL/scene/pos', msg);
}



function receive (data) {
    let n = data.search(';');
    let msg = data.substring(0, n+1);
    console.log ("receive", msg);
    if (client && (msg!="dummy;")) inscore.loadInscore (msg, false);
}
