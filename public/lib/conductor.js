
var gNetMaxLattency = 1;

wsclient = function (data) {
    console.log ("conductor receive", data);
    const parts = data.split(' ');
    switch (parts[0]) {
        case 'BYE':
            inscore.postMessageStrStr("/ITL/scene/parts/p" + parts[1], 'color', 'white');
            break;
        case 'PART':
            inscore.postMessageStrStr("/ITL/scene/parts/p" + parts[1], 'color', 'green');
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
            let msg = atob (parts[1]);
            console.log ("Receive INSCORE:", msg)
            inscore.loadInscore (msg);
            break;
        }
}

function play() {
    setTimeout( function(){ inscore.postMessageStrF("/ITL/scene/cursor", 'tempo', 60); }, gNetMaxLattency);
    wsSend('PLAY');
}

