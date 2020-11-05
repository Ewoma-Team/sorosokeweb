


const checkChatRoomOnDisplay = (roomType, data) => {
    const getPersitRoom = localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME') ? JSON.parse(localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME')) : null;
        if(data.room_name !== getPersitRoom) {
            const roomName = data.room_name;
            //Store a notification to localStorage
            let getRoomCount = JSON.parse(localStorage.getItem(`@_SOROSOKE_MESSAGE_COUNT_${roomName}`)) || 0;

            localStorage.setItem(`@_SOROSOKE_MESSAGE_COUNT_${roomName}`, Number(getRoomCount) + 1)

            newMessageNotify(roomName)
            const info = roomType == 'friend' ? `${roomName}` : `${data.user.name} in ${roomName} Room`;
            alertify.set('notifier', 'position', 'bottom-center');
            alertify.info(`A New Message from ${info}`);

            return true;
        }
    return false;
} 