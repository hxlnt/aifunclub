### dealwithit
Detects all faces in a photo and slides on a pair of pixel shades. Truly a worthwhile use of the bountiful technological feast made possible by machine learning and artificial intelligence. Deal with it.

![GIF](test.gif)

### What's under the hood
- [Project Oxford for Node](https://github.com/felixrieseberg/project-oxford) calls the [Microsoft Face API](http://microsoft.com/cognitive) to return angle, pitch, and coordinates of eyes and eyebrows for each face detected (max. 64).
- [socket.io](https://github.com/socketio/socket.io) handles communication between the node server and client HTML.
- [JQuery](https://jquery.com/) takes care of a few things like the generation and animation of glasses.

### What's left to do
If you want to play with this code on your own, you'll need to add your own [API key](http://microsoft.com/cognitive) for the Face API. And if you're just running this on a localhost server, you'll want to modify this code to be able serve up local files (or host the static files and point paths there). That being said, you should probably wait until I fix some stuff.
- Create a not-terrible client interface. Fix "DEAL WITH IT" text to scale up and align to photo, not make input box jump, etc. 
- Allow user to choose a local image. Currently only URLs are supported.
- Provide feedback for images that won't return valid results (too big, no faces detected, etc.).
- Resize images before displaying in browser. Right now they're displayed at full size, which is bad if full size > browser window size.
- Add [Microsoft Azure Storage SDK for Node.js](https://github.com/Azure/azure-storage-node) to upload images to blob storage, allowing users to share unique URLs
- Figure out if these can be saved locally as animated GIFs?
- ????
- PROFIT

------


	The AI FUN CLUB makes AI fun!
	
	...club.
