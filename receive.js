(function() {
    var HOST = location.origin.replace(/^http/, 'ws');
    var ws = new WebSocket(HOST);
    var form = document.querySelector('.form');

ws.onmessage = function(msg) {
    var response = msg.data;
    console.log("response "+response);
    var words = response.split(' ');
    var first = words[0];
    var second = parseFloat(words[1]);
    var deuxieme = words[1];
    var vid = document.getElementById('vid');

    switch (first) {
      
      case "PLAY":
        setTimeout( function(){vid.play(); console.log("hurrayyyyy");},delay);
        break;

      case "REWIND":
        vid.pause();
        vid.currentTime = zozo;
        break;

      case "PAUSE":
        vid.pause();
        break;

      case "vdate":
          console.log(second);
        vid.currentTime = second*4;
        zozo = second*4;
        break;

      case "dummy":
        console.log("dummy");
        break;

      case "speed":
        vid.playbackRate = second;
        console.log(second);
        break;

      case "STOP":
        vid.pause();
        vid.currentTime = 0;
        zozo = 0;
        break;

      case "tune":
          console.log(deuxieme);
          vid.src= "lib/vids/"+thispath+"/"+deuxieme+'.mp4';
          console.log(vid.src);
          break;

      case "boost":
            console.log(deuxieme);
            boost = deuxieme;
            console.log('boost '+boost);
            gainNode.gain.value = boost;
            


            break;

      case  "hit":
        var NowClientSide = new Date(ts.now());
        var forsee = parseInt(words[4]);
        console.log("zob");
        console.log(NowClientSide.getTime());
        console.log(NowClientSide.value);
        console.log(typeof forsee);
        console.log(typeof tomate);
        console.log(typeof NowClientSide);
        var difference = (forsee + tomate) - NowClientSide.getTime();
        console.log("NowClientSIde "+ NowClientSide.getTime());
        console.log("forsee "+ forsee);
        console.log("difference "+ difference);
        setTimeout( function() { vid.play(); }, difference)
        break;
    }
  };

function refresh(){
    setInterval(function(){send("dummy;")},10000)
}
var client = true;
function send (msg) { ws.send (msg);}
}());


