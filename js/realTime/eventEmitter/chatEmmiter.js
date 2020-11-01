
 
//Socket Listeners for Feeds event 
socket.on("public", function(data) {
    if(currentUser.id !== data.user.id) {
        console.log(data, 'Public-room chat')
        //Check if the user has the room on display
        const res = checkChatRoomOnDisplay("public", data);
        if(!res) {
            //Insert into DOM
            chatResponseToDOM(data)
        }
    }
});