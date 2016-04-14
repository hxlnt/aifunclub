// node variables
var express = require('express'); 
var app = express(); 
var server = require('http').createServer(app); 
var io = require('socket.io')(app);
var port = process.env.PORT || 3000;
var oxford = require('project-oxford');
var client = new oxford.Client(process.env.myoxfordkey);

server.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) { 
    socket.on('origimgurl', function(origimgurl) {
        console.log('face url: ' + origimgurl);
        client.face.detect({
            url: origimgurl,
            analyzesFaceLandmarks: true,
            analyzesHeadPose: true
        }).then(function(response) {
            socket.emit('face', response);
            console.log(response);
        });
    });
});
