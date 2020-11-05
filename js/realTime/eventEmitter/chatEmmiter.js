
 
socket.on("formatter", function(data) {
    if(currentUser.id !== data.user.id) {
        if (localStorage.getItem(`@_SOROSOKE_NO_CHAT_${data.room_name}`)) {
            const chatDiv = document.querySelector('[data-target-chat-dom]')
            chatDiv.innerHTML = ''; 
            localStorage.removeItem(`@_SOROSOKE_NO_CHAT_${data.room_name}`)
        }
    }
})

//Socket Listeners for Feeds event 
socket.on("public", function(data) {
    if(currentUser.id !== data.user.id) {
        //Check if the user has the room on display
        const res = checkChatRoomOnDisplay(roomType = null, data);
        if(!res) {
            //Insert into DOM
            chatResponseToDOM(data)
        }
    }
});

socket.on("state", function(data) {
    console.log(data)
    if(currentUser.id !== data.user.id) {
        //Check if the user has the room on display
        const res = checkChatRoomOnDisplay(roomType = null, data);
        if(!res) {
            //Insert into DOM
            chatResponseToDOM(data)
        }
    }
});

















//Emit count vent for Room
socket.on(`userRoomCount`, function(data) {
    const roomName = JSON.parse(localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME'));
    if(data.roomName === roomName) {
        //Insert to current size to DOM
        localStorage.setItem(`@_SOROSOKE_APP_USER_ROOM_COUNT`, Number(data.countRoomUser))
        loadUserRoomCount(Number(data.countRoomUser)) 
    }
});