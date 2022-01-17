
var gNetMaxLattency = 0;

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
        case 'LAT':
            // if (parts[1] > gNetMaxLattency) {
            //     gNetMaxLattency = parts[1];
            //     let div = document.getElementById('lat');
            //     div.innerHTML = "Max Latency: " + gNetMaxLattency;
            // }
            break;
    }
}

function play() {
    setTimeout( function(){ inscore.postMessageStrF("/ITL/scene/cursor", 'tempo', 60); }, gNetMaxLattency);
    wsSend('PLAY');
}

