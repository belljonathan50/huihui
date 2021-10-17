const express     = require('express');
var timesyncServer = require('timesync/server');
const app         = express();
const fs = require('fs');
var os = require('os');
const editJsonFile = require("edit-json-file");



const router = express.Router();
const path = require('path');
const expressWs   = require('express-ws')(app);
const morgan      = require('morgan');
const compression = require('compression');
const serveStatic = require('serve-static');
const basicAuth   = require('basic-auth-connect');
const user = process.env.USER;
const pass = process.env.PASS;
// var networkInterfaces = os.networkInterfaces();
// console.log(networkInterfaces);


let connects = [];
let file = editJsonFile(`${__dirname}/public/libs/DistributedState/state.json`);


app.set('port', process.env.PORT || 3000);

if (user && pass) {
  app.use(basicAuth(user, pass));
}


app.use(morgan('dev'));
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

var publicPath = path.join(__dirname, 'public');


router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/"));
});

app.get('/new', function (req, res) {
    res.sendfile(publicPath + '/new.html');
});

app.get('/mezzo', function (req, res) {
    res.sendfile(publicPath + '/mezzo.html');
});

app.get('/sop', function (req, res) {
    res.sendfile(publicPath + '/sop.html');
});

app.get('/inscore3', function (req, res) {
    res.sendfile(publicPath + '/index3.html');
});

app.get('/tenor', function (req, res) {
    res.sendfile(publicPath + '/tenor.html');
});

app.get('/inscore1', function (req, res) {
    res.sendfile(publicPath + '/inscore1.html');
});

app.get('/bass', function (req, res) {
  res.sendfile(publicPath + '/bass.html');
});

app.get('/baba', function (req, res) {
  res.sendfile(publicPath + '/baba.html');
});

app.get('/c', function (req, res) {
  res.sendfile(publicPath + '/c.html');
});

app.get('/banana', function (req, res) {
  res.sendfile(publicPath + '/banana.html');
});

app.get('/ideas', function (req, res) {
  res.sendfile(publicPath + '/ideas.html');
});

app.get('/ar', function (req, res) {
  res.sendfile(publicPath + '/ar.html');
});

app.get('/leducmus', function (req, res) {
  res.sendfile(publicPath + '/leducmus.html');
});

app.get('/dos', function (req, res) {
  res.sendfile(publicPath + '/dos.html');
});

app.get('/controlvid', function (req, res) {
  res.sendfile(publicPath + '/controlvid.html');
});

app.get('/vid', function (req, res) {
  res.sendfile(publicPath + '/vid.html');
});

app.get('/sound', function (req, res) {
  res.sendfile(publicPath + '/sound.html');
});

app.get('/s', function (req, res) {
  res.sendfile(publicPath + '/s.html');
});

app.get('/smartsop', function (req, res) {
  res.sendfile(publicPath + '/smartsop.html');
});

app.get('/jsonC', function (req, res) {
  res.sendfile(publicPath + '/jsonC.html');
});

app.get('/jsonS', function (req, res) {
  res.sendfile(publicPath + '/jsonS.html');
});

app.get('/jsonA', function (req, res) {
  res.sendfile(publicPath + '/jsonA.html');
});

app.get('/jsonT', function (req, res) {
  res.sendfile(publicPath + '/jsonT.html');
});

app.get('/jsonB', function (req, res) {
  res.sendfile(publicPath + '/jsonB.html');
});



app.get('/loopc', function (req, res) {
  res.sendfile(publicPath + '/loopc.html');
});

app.get('/loops', function (req, res) {
  res.sendfile(publicPath + '/loops.html');
});

app.get('/smartex', function (req, res) {
  res.sendfile(publicPath + '/smartex.html');
});

app.get('/smartimg', function (req, res) {
  res.sendfile(publicPath + '/smartimg.html');
});

app.get('/smartvid', function (req, res) {
  res.sendfile(publicPath + '/smartvid.html');
});

app.get('/smartex', function (req, res) {
  res.sendfile(publicPath + '/smartex.html');
});

app.get('/conductor', function (req, res) {
  res.sendfile(publicPath + '/conductor.html');
});

app.get('/controller', function (req, res) {
  res.sendfile(publicPath + '/controller.html');
});

// app.use('/static', express.static(path.join(__dirname, 'public')))

app.ws('/', (ws, req) => {
  connects.push(ws);

  ws.on('message', message => {
    console.log("hi");

    // console.log('message received serverside : '+ message);

    var words = message.split(' ');
    var first = words[0];
    var second = words[1];
    // console.log('first : '+first);
    // console.log('second : '+second + ' typeof : ' + typeof second);
    // var seekValue = parseInt(words[1]);
    // var vid = document.getElementById('vid');
    



switch(first) {
  case "stop":
    console.log("totoooo");
    file.set("isPlaying", "false");
    file.set("seek", 0);
    console.log(file.get());
    break;

  case "start":
    file.set("isPlaying", "true");
    break;

  case "pause":
  file.set("isPlaying", "false");
  break;

  case "seek":
    file.set("seek", second);
    console.log(file.get());
    break;

  case "rate":
    file.set("rate", second);
    break;

  case "lag":
    file.set("lag", second);
    break;

  case "tune":
    file.set("tune", second);
    console.log("changed tune to "+ second)
    break;

  case "adjS":
      file.set("adjS", second);
      console.log("changed adjS to "+ second)
      break;

  case "adjA":
        file.set("adjA", second);
        console.log("changed adjA to "+ second)
        break;

  case "adjT":
        file.set("adjT", second);
        console.log("changed adjT  to "+ second)
        break;

  case "adjB":
        file.set("adjB", second);
        console.log("changed adjB to "+ second)
        break;

  default:
    console.log("just a sync");
    console.log(file.get());
    // code block
} 
    connects.forEach(socket => {
      
      socket.send(message + ' '+  JSON.stringify(file));
      // socket.send(file);
    
      // socket.send(file);
    });



  });
  
  ws.on('close', () => {
    connects = connects.filter(conn => {
      return (conn === ws) ? false : true;
    });
  });
});



app.use("/ws-stuff", router);

app.use('/timesync', timesyncServer.requestHandler);

app.listen(app.get('port'), () => {
  console.log('Server listening on port %s', app.get('port'));
});


