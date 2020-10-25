

const fetchRoomChatBrigde = (e) => {
    e.preventDefault()

    const roomName = e.currentTarget.dataset.targetRoom;
    //Display room name to the chat view
    document.querySelector('[data-chat-identity]').textContent = roomName;
    document.querySelector('[data-chat-identity-view]').textContent = roomName;



    //Store View room to locatorage to persist o
    console.log(roomName)
    console.log('hello chat s open')




    //get The Chat 
    fetchChatApi(e)
}