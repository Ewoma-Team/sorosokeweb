
 
 //Socket Listeners for Feeds event 
 socket.on("new-feed", function(data) {
    console.log(data)
    loadFeedToView(data, data.fileOrigin.imageOrigin, data.fileOrigin.videoOrigin, "socket")
});