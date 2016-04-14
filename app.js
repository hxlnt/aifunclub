// node variables
var express = require('express'); 
var app = express(); 
var server = require('http').createServer(app); 
var io = require('socket.io').listen(server);
var port = process.env.PORT || 3000;
var oxford = require('project-oxford');
var client = new oxford.Client(process.env.myoxfordkey);

server.listen(port);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) { 
    socket.on('origimgurl', function(origimgurl) {
        console.log('face url: ' + origimgurl);
        client.face.detect({
            url: origimgurl,
            analyzesFaceLandmarks: true,
            analyzesHeadPose: true
        }).then(function(error, response) {
            if (error.message != undefined){
            socket.emit('errcode', error.message);
            console.log(error.message);
            }
            else {
            socket.emit('face', response);
            console.log(response);
            }
        });
    });
});
