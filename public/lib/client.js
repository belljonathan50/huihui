
var gVideo = null;      // the video div
var gSound = null;      // the sound div
var gPartNum = 0;       // the part number - used to notify the conductor
var gVideoLatency = 0;
var gSoundLatency = 0;
var gReady = false;

//var gTimeOffset = 0;
// gTime.on('change', function (offset) { gTimeOffset = offset; console.log ("Time offset:", offset)});

function connectdiv (video, sound, partnum) {
    gVideo = video;
    gSound = sound;
    gPartNum = partnum;
    connect();
    window.addEventListener('unload', function(event) { wsSend ('BYE ' + gPartNum); });
    gVideo.addEventListener('play', () => { gSound.play() });
    gVideo.addEventListener('pause', () => { gSound.pause() });
    gVideo.addEventListener('seeked', () => { gSound.currentTime = gVideo.currentTime });
    gVideo.addEventListener('volumechange', () => { gSound.volume = gVideo.volume });
    gVideo.addEventListener('playing', videoLatency);
    gSound.addEventListener('playing', soundLatency);
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
            setTimeout( function(){ gVideo.pause(); gSound.pause() }, getDelay(parts[1]));
            break;
        case 'STOP': 
            console.log ("client receive", data);
            gVideo.pause();
            gSound.pause();
            gVideo.currentTime = 0;
            gSound.currentTime = 0;
            break;
        case 'READY':               // sent by the conductor on startup
            console.log ("client receive", data);
            if (gReady) wsSend('PART ' + gPartNum);
            break;
        case 'DATE':
            console.log ("client receive", data);
            let date = parts[1] * 4;
            setTimeout( function(){ t1 = t2 = Date.now(); /*gSound.currentTime =*/ gVideo.currentTime = date }, getDelay(parts[2]));
            break;
    }
}

function ready(div) {
    div.remove();
    gReady = true;
    wsSend('PART ' + gPartNum);
}

function getDelay(date) {
    let n = date - gTime.now();
console.log("Delay to", date, "->", n );
    if (n < 0) console.log("late event detected: delay", n)
    return (n > 0) ? n : 0;
}

function playAt (date) {
    let delay = getDelay(date);
    setTimeout( () => { t1 = t2 = Date.now(); /*gSound.play();*/ gVideo.play(); console.log("timeout diff",gTime.now()-date)}, delay);
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
    // if (!t1) return;
    gVideoLatency = Date.now() - t1;
    // gVideo.currentTime += gVideoLatency;
    // gVideo.pause();
    // gVideo.removeEventListener ('playing', videoLatency);
    console.log ("Local video latency:", gVideoLatency);
    // t1 = 0;
}

function soundLatency() {
    // if (!t2) return;
    gSoundLatency = Date.now() - t2;
    console.log ("Local sound latency:", gSoundLatency);
    // gSound.currentTime += gSoundLatency;
    // gSound.pause();
    // gSound.removeEventListener ('playing', soundLatency);
    // t2 = 0;
}
