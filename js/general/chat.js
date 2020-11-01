const goBackBtnToRoomBtn = document.querySelector('[data-back-to-room]')

goBackBtnToRoomBtn.addEventListener('click', (e) => {
    //Clear persit room storage
    localStorage.removeItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-TYPE');
    localStorage.removeItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME')
    roomAndChatViewResizeWithClick('chat-view')
})
