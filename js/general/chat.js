const goBackBtnToRoomBtn = document.querySelector('[data-back-to-room]')

goBackBtnToRoomBtn.addEventListener('click', (e) => {
    //Clear persit room storage
    localStorage.removeItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-TYPE');
    localStorage.removeItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME');
    localStorage.removeItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME-FRIEND');
    roomAndChatViewResizeWithClick('chat-view')
})



previewMemberOnChatAssit = (chatView) => {

    //View Member Profile Event
    Array.from(document.querySelectorAll('.viewMemeberProfile')).map(x => {
        x.addEventListener('click', (e) => {
            e.preventDefault();
            const chatID = e.currentTarget.dataset.chatId
            const elem = document.querySelector(`#previewOne${chatID}`)
            elem.classList.add('expand');
            chatView.scrollTo({
                top: chatView.scrollHeight 
            });
        })
    })

    //Close Modal of Element Event
    Array.from(document.querySelectorAll('.x-touch')).map(x => {
        x.addEventListener('click', (e) => {
            e.stopPropagation();
           Array.from(document.querySelectorAll('.preview')).map(x => {
                x.classList.remove('expand');
                chatView.scrollTo({
                    top: chatView.scrollHeight 
                });
            })
        })
    })


     //Add Friend Event
     Array.from(document.querySelectorAll('.addFriend')).map(x => {
        x.addEventListener('click', (e) => {
            e.preventDefault();

            const elem = e.currentTarget;
            const chatId = e.currentTarget.dataset.chatId
            const friendId = e.currentTarget.dataset.friendId
            const name = e.currentTarget.dataset.friendName
            const screenName = e.currentTarget.dataset.friendScreenName
            
            addFriendAPI(elem, chatId, friendId, name, screenName)
        })
    })

    chatView.scrollTo({
        top: chatView.scrollHeight 
    });
}