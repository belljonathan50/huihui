
var gVideo = null;      // the video div
var gSlider = null;     // the video div
var gPartNum = 0;       // the part number - used to notify the conductor
var gVideoLatency = 0;
var gTimeULatency = 0;
var gReady = false;
var gDelay = 0;

//var gTimeOffset = 0;
// gTime.on('change', function (offset) { gTimeOffset = offset; console.log ("Time offset:", offset)});

function connectdiv (video, partnum) {
    gVideo = video;
    gPartNum = partnum;
    connect();
    window.addEventListener('unload', function(event) { wsSend ('BYE ' + gPartNum); localStorage.setItem('delay', gDelay); });
    gVideo.addEventListener('playing', videoLatency);
    gSlider = document.getElementById('delay');
    gSlider.addEventListener('change', () => { console.log("delay", gDelay = gSlider.value);})
    let delay = localStorage.getItem('delay');
    if (delay) gSlider.value = gDelay = delay;
}

wsclient = function (data) {
    if (!gVideo) {
        console.error ("Warning: incorrect initialization, div is undefined")
        return;
    }
    const parts = data.split(' ');
    switch (parts[0]) {
        case 'PLAY': 
            console.log ("client receive", data);
            playAt (parts[1]);
            break;
        case 'PAUSE': 
            console.log ("client receive", data);
            setTimeout( function(){ gVideo.pause(); }, getDelay(parts[1]));
            break;
        case 'STOP': 
            console.log ("client receive", data);
            gVideo.pause();
            gVideo.currentTime = 0;
            break;
        case 'READY':               // sent by the conductor on startup
            console.log ("client receive", data);
            if (gReady) wsSend('PART ' + gPartNum);
            break;
        case 'DATE':
            console.log ("client receive", data);
            let date = parts[1] * 4;
            setTimeout( function(){ t1 = t2 = Date.now(); gVideo.currentTime = date }, getDelay(parts[2]));
            break;
    }
}

function ready(div) {
    div.remove();
    gVideo.style.visibility = 'visible';
    gReady = true;
    wsSend('PART ' + gPartNum);
}

function getDelay(date) {
    let n = date - gTime.now() - gDelay;
// console.log("Delay to", date, "->", n );
    if (n < 0) console.log("late event detected: delay", n)
    return (n > 0) ? n : 0;
}

function playAt (date) {
    let delay = getDelay(date);
    setTimeout( () => { t1 = t2 = Date.now(); gVideo.play(); /*console.log("timeout diff",gTime.now()-date)*/}, delay);
}


var t1 = 0;
var t2 = 0;
// function getLocalLatency () {
//     gVideo.addEventListener('playing', videoLatency);
//     gSound.addEventListener('playing', soundLatency);
//     t1 = Date.now();
//     gVideo.play();
//     t2 = Date.now();
//     gSound.play();
// }

function videoLatency() {
    gVideoLatency = Date.now() - t1;
    console.log ("Local video latency:", gVideoLatency);
}
