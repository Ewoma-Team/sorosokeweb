


const checkChatRoomOnDisplay = (eventName, data) => {
    const getPersitRoom = localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME') ? JSON.parse(localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME')) : null;

    if(eventName === "public") {
        if(data.room_name !== getPersitRoom) {
            const roomName = data.room_name.replace(/ /g, "_");
            console.log(roomName, 'just for show')
            //Store a notification to localStorage
            let getRoomCount = JSON.parse(localStorage.getItem(`@_SOROSOKE_MESSAGE_COUNT_${roomName}`)) || 0;

            localStorage.setItem(`@_SOROSOKE_MESSAGE_COUNT_${roomName}`, Number(getRoomCount) + 1)

            newMessageNotify(roomName)

            return true;
        }
    }

    return false;
} 