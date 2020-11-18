
 
socket.on("formatter", function(data) {
    if(currentUser.id !== data.user.id) {
        if (localStorage.getItem(`@_SOROSOKE_NO_CHAT_${data.room_name ? data.room_name.toLowerCase() : data.to_id}`)) {
            const chatDiv = document.querySelector('[data-target-chat-dom]')
            chatDiv.innerHTML = ''; 
            localStorage.removeItem(`@_SOROSOKE_NO_CHAT_${data.room_name ? data.room_name.toLowerCase() : data.to_id}`)
        }
    }
})

//Socket Listeners for chat event 
socket.on("public", function(data) {
    if(currentUser.id !== data.user.id) { //Display to all memeber exceptthe message sender
        //Check if the user has the room on display
        const res = checkChatRoomOnDisplay(data);
        if(!res) {
            //Insert into DOM
            chatResponseToDOM('public', data)
            return true
        }
    }
});

socket.on("state", function(data) {
    if(currentUser.id !== data.user.id) { //Display to all memeber exceptthe message sender
        //Check if the user has the room on display
        const res = checkChatRoomOnDisplay(data);
        if(!res) {
            //Insert into DOM
            chatResponseToDOM('state', data)
            return true
        }
    }
});



socket.on("personal", function(data) {
    if(currentUser.id !== data.user.id) { //Display to all memeber exceptthe message sender
        //Check if the user has the room on display
        const res = checkChatRoomOnDisplay(data);
        if(!res) {
            //Insert into DOM
            chatResponseToDOM('personal', data)
            return true
        }
    }
});



socket.on("friend", function(data) {
   
    if(currentUser.id === Number(data.to_id)) {
        //Check if the user has the room on display
        const res = checkChatFriendOnDisplay(data);
        if(!res) {
            //Insert into DOM
            chatResponseToDOM('personal', data)
            return true
        }
    }
});



//Emit count active for Room
socket.on(`userRoomCount`, function(data) {

    let getPersitRoom = localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME')
                      ? JSON.parse(localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME')) : null;

    if(!getPersitRoom) { //Run if there is nothing in the LocalStorage
        getPersitRoom = {};
        Object.assign(getPersitRoom, {
            roomNameUnique: null
        })
    }

    if(data.roomName.toLowerCase() === getPersitRoom.roomNameUnique) {
        //Insert to current size to DOM
        localStorage.setItem(`@_SOROSOKE_APP_USER_ROOM_COUNT`, Number(data.countRoomUser))
        loadUserRoomCount(Number(data.countRoomUser)) 
    }
    
});