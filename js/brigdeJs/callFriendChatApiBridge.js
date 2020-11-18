


const callFriendChatApiBridge = (e) => {
    e.preventDefault()

    const roomType = e.currentTarget.dataset.roomType; 
    const friendName = e.currentTarget.dataset.name; 
    const friendScreenName = e.currentTarget.dataset.screenName; 
    const roomToId = `${e.currentTarget.dataset.toId}`

    chatContentPreload() //display Preloader to Chat DOM

    particlesJS.load('chat-dom', 'js/packages/particles.js-master/demo/chatViewParticles.json', function () { //Display the web effect
        //Load the Particle js Animation Effect
    });

    //Display Active Background To Room li Tag
    Array.from(document.querySelectorAll('.roomNameClass')).map(x => x.classList.remove('active'))

    document.querySelector(`#friend-room-frd${roomToId}`).classList.add('active');

    //Display room name to the chat view
    document.querySelector('[data-room-type-holder]').textContent = roomType;

    localStorage.setItem('@_SOROSOKE_UNIQUE_HOLDER', JSON.stringify(roomToId)) //Keep the room ID globaly

    document.querySelector('[data-room-name-holder]').innerHTML = `
        <span class="m-0 p-0">${friendName} 
            <span>@${friendScreenName}</span>
        </span>`;
    
    Array.from(document.querySelectorAll('.chat-header')).map(x => x.style.display = 'block')
    document.querySelector('[data-chat-form]').style.display = 'block'

    document.querySelector(`#newMessageNotify${roomToId}`).innerHTML = ''
    document.querySelector(`#newMessageNotify${roomToId}`).style.visibility = 'hidden';

    //View the chat spot on mobile screen
    roomAndChatViewResizeWithClick('room-view')

    //Clear room Message count notification
    localStorage.setItem(`@_SOROSOKE_MESSAGE_COUNT_${roomToId}`, 0)
    document.querySelector('#userRoomCount').innerHTML = '';

    //Clear Next Chat For Room Tracker
    localStorage.getItem(`@_SOROSOKE_ROOM_NEXT_CHAT_PAGINATE`, 0);

    //Store selected room to locatorage to persitense purpose
    localStorage.setItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-TYPE', JSON.stringify(roomType));
    localStorage.setItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME-FRIEND',  JSON.stringify({
        friendName, friendScreenName, roomToId
    }));

   setTimeout(() => {
    //get The Chat From Server
    fetchChatApi(roomType, null, roomToId)
   }, 500);
}
