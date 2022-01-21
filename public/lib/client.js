
var gDiv = null;
var gSound = null;
var gPartNum = 0;
var gNetMaxLattency = 0;
var gLocalLattency = 0;
var gReady = false;

function connectdiv (video, sound, partnum) {
    gDiv = video;
    gSound = sound;
    gPartNum = partnum;
    connect();
    window.addEventListener('unload', function(event) { wsSend ('BYE ' + gPartNum); });
}

wsclient = function (data) {
    console.log ("client receive", data);
    if (!gDiv) {
        console.error ("Warning: incorrect initialization, div is undefined")
        return;
    }
    switch (data) {
        case 'PLAY': 
            setTimeout( function(){ gDiv.play(); }, getDelay());
            gSound.play();
            break;
        case 'PAUSE': 
            gDiv.pause();
            gSound.pause();
            break;
        case 'STOP': 
            gDiv.pause();
            gSound.pause();
            gDiv.currentTime = 0;
            gSound.currentTime = 0;
            break;
        case 'SYNC':                // request the local play latyency evaluation
            getLocalLatency();
            break;
        case 'READY':               // sent by the conductor on startup
            if (gReady) wsSend('PART ' + gPartNum);
            break;        
        default: 
            rcvOther (data);
            break;
    }
}

function rcvOther(data) {
    const parts = data.split(' ');
    switch (parts[0]) {
        case 'DATE':
            let date = parts[1] * 4 / parts[2];
            gDiv.currentTime = date;
            gSound.currentTime = date;
            break;
        case 'LAT':
            if (parts[1] > gNetMaxLattency)
                gNetMaxLattency = parts[1];
            break;
        }
}

function ready(div) {
    div.remove();
    getLocalLatency();
    gReady = true;
    wsSend('PART ' + gPartNum);
}

function getDelay() {
    return 1;
    // return (gNetMaxLattency > gLocalLattency) ? (gNetMaxLattency - gLocalLattency) : 0;
}

var t1 = 0;
function getLocalLatency () {
    gDiv.addEventListener('playing', playLatency);
    gDiv.pause();
    t1 = Date.now();
    gDiv.play();
}

function playLatency() {
    if (!t1) return;
    gLocalLattency = Date.now() - t1;
    gDiv.pause();
    gDiv.removeEventListener ('playing', playLatency);
    console.log ("Local play latency:", gLocalLattency);
    wsSend('LAT ' + gLocalLattency);
    t1 = 0;
}
