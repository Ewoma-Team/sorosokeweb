


const checkChatRoomOnDisplay = (data) => {

    console.log(data, 'test')

    let getPersitRoom = localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME') ? JSON.parse(localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME')) : null;

    if(!getPersitRoom) {
        getPersitRoom = {};
        Object.assign(getPersitRoom, {
            roomNameUnique: null
        })
    }

    if(data.room_name.toLowerCase() !== getPersitRoom.roomNameUnique) {
        const roomNameUnique = data.room_name;

        //Store a notification to localStorage
        let getRoomCount = JSON.parse(localStorage.getItem(`@_SOROSOKE_MESSAGE_COUNT_${roomNameUnique}`)) || 0;

        localStorage.setItem(`@_SOROSOKE_MESSAGE_COUNT_${roomNameUnique}`, Number(getRoomCount) + 1)

        newMessageNotify(roomNameUnique)

        let info = `<p style="font-size: 14px;">
                New Message: From ${data.user.screen_name}  - 
                <span style="font-size: 12px; color: skyblue;">@${data.user.screen_name}</span>
                in ${roomNameUnique.split("-_")[0]} Room
                <pre class="mt-0 pt-3 pb-3" style="background: #e6e6e6; text-overflow: ellipsis; 
                        overflow: hidden; white-space: nowrap;">
                        ${data.chat}
                </pre>
                </p>`;

        alertify.set('notifier', 'position', 'bottom-left');
        alertify.message(info);

        return true; 
    }
    return false;
} 





const checkChatFriendOnDisplay = (data) => {
    console.log(data)
    let getPersitRoom = localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME-FRIEND') ? 
                            JSON.parse(localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME-FRIEND')) : null;
    if(!getPersitRoom) {
        getPersitRoom = {};
        Object.assign(getPersitRoom, {
            roomToId: null
        })
    }

    if(Number(data.from_id) !== Number(getPersitRoom.roomToId)) {
        console.log('here')
        const roomToId = data.from_id;

        //Store a notification to localStorage
        let getRoomCount = JSON.parse(localStorage.getItem(`@_SOROSOKE_MESSAGE_COUNT_${roomToId}`)) || 0;

        localStorage.setItem(`@_SOROSOKE_MESSAGE_COUNT_${roomToId}`, Number(getRoomCount) + 1)

        console.log(roomToId)

        newMessageNotify(roomToId)

        let info = `<p style="font-size: 14px;">
                You have a message From ${data.user.name} - 
                <span style="font-size: 12px; color: skyblue; font-weight: 500;">@${data.user.screen_name}</span>
                <pre class="mt-0 pt-3 pb-3" style="background: #e6e6e6; text-overflow: ellipsis; 
                     overflow: hidden; white-space: nowrap;">
                     ${data.chat}
                </pre>
                </p>`;

        alertify.set('notifier', 'position', 'bottom-left');
        alertify.message(info);

        return true; 
    }
    return false;
} 