
var gNetMaxLatency = 300;
var gParts = { "1":0, "2":0, "3":0 };

wsclient = function (data) {
    const parts = data.split(' ');
    switch (parts[0]) {
        case 'BYE':
            console.log ("conductor receive", data);
            let clients = gParts[parts[1]] - 1;
            if (clients <= 0) {
                inscore.postMessageStrStr("/ITL/scene/parts/p" + parts[1], 'color', 'white');
                gParts[parts[1]] = 0;
            }
            else gParts[parts[1]] = clients;
            break;
        case 'PART':
            console.log ("conductor receive", data);
            gParts[parts[1]]++;
            inscore.postMessageStrStr("/ITL/scene/parts/p" + parts[1], 'color', 'green');
           break;
        case 'GOTOMARK':
            console.log ("conductor receive", data);
            inscore.postMessageStrStr("/ITL/scene", 'event', 'GOTOMARK');
            break;
        case 'CPLAY':
            console.log ("conductor receive", data);
            inscore.postMessageStrStr("/ITL/scene", 'event', 'PLAY');
            break;
        case 'CSTOP':
            console.log ("conductor receive", data);
            inscore.postMessageStrStr("/ITL/scene", 'event', 'STOP');
            break;
        case 'CPAUSE':
            console.log ("conductor receive", data);
            inscore.postMessageStrStr("/ITL/scene", 'event', 'PAUSE');
            break;
        default:
            checkInscoreMsg (data);
            break;
    }
}

function checkInscoreMsg(data) {
    const parts = data.split(' ');
    switch (parts[0]) {
        case 'INSCORE':
            console.log ("conductor receive", data);
            let msg = atob (parts[1]);
            console.log ("Receive INSCORE:", msg)
            inscore.loadInscore (msg);
            break;
        }
}

function play() {
    setTimeout( function(){ inscore.postMessageStrF("/ITL/scene/cursor", 'tempo', 60); }, gNetMaxLatency);
    wsSend('PLAY ' + (gTime.now() + gNetMaxLatency));
}

function pause() {
    setTimeout( function(){ inscore.postMessageStrF("/ITL/scene/cursor", 'tempo', 0); }, gNetMaxLatency);
    wsSend('PAUSE ' + (gTime.now() + gNetMaxLatency));
}

function goto(date) {
    const n = date.split(' ');
    let datef = n[0]/n[1];
    setTimeout( function(){ inscore.postMessageStrF("/ITL/scene/cursor", 'date', datef); }, gNetMaxLatency);
    wsSend('DATE ' + datef + ' ' + (gTime.now() + gNetMaxLatency));
}

