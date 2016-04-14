// node variables
var fs = require('fs');
var oxford = require('project-oxford');
var client = new oxford.Client(process.env.myoxfordkey);
//var Bing = require('node-bing-api')({ accKey: "V7sFqETZVIxon+asFpVgOusoE6yMsqNkU/iDMeE0iyc" });
var app = require('http').createServer(handler)
var io = require('socket.io')(app);
// var azure = require('azure-storage');
// var blobService = azure.createBlobService('aifunclub', 'foj2IOFD2pZNBk9dfv4OSe/BD3Oak/j16dAQ5uGwN7kF+iuCRYkDQ316qX8mo93nfLfsSqH5PlaD1T2arw5fbA==');
// var uuid = require('node-uuid');
// var confirmedurl;

app.listen(8081);

function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
        function(err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200);
            res.end(data);
        });
}

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
    
//     socket.on('confirmedurl', function(x) {
//         confirmedurl = x;
//         });
//     });

// var blobname = uuid.v4();

// blobService.createContainerIfNotExists('urlcontainer', {
//   publicAccessLevel: 'blob'
// }, function(error, result, response) {
//   if (!error) {
//     // if result = true, container was created.
//     // if result = false, container already existed.
//   }
// });

// blobService.createBlockBlobFromText('urlcontainer', blobname, confirmedurl, function(error, result, response){
//   if(!error){
//     // file uploaded
//   }
// });