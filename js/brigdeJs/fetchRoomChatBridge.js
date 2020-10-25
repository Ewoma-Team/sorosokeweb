

const fetchRoomChatBrigde = (e) => {
    e.preventDefault()

    const roomName = e.currentTarget.dataset.targetRoom;

    //Display room name to the chat view
    document.querySelector('[data-chat-identity]').textContent = roomName;
    document.querySelector('[data-chat-identity-view]').textContent = roomName;

    //View the chat spot on mobile screen
    roomAndChatViewToggle('room-view') 

    //Store selected room to locatorage to persitense purpose
    localStorage.setItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM', JSON.stringify(roomName));



    console.log(roomName)
    console.log('hello chat s open')




     //get The Chat From Server
    fetchChatApi()
}


const fetchChatWithPersitRoom = () => {

    const getPersitRoom = localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM') ? JSON.parse(localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM')) : null;

        if(getPersitRoom) {
                document.querySelector('[data-chat-identity]').textContent = getPersitRoom;
                document.querySelector('[data-chat-identity-view]').textContent = getPersitRoom;

                //View the chat spot on mobile screen
                roomAndChatViewToggle('room-view') 
        
                //get The Chat From Server
                fetchChatApi()
        }
}

fetchChatWithPersitRoom();