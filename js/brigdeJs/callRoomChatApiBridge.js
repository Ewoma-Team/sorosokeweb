const loadRoomToDomBrigde = (e) => {
    e.preventDefault()

    let roomId = null

    const roomType = e.currentTarget.dataset.roomType; 
    
    const roomName = `${e.currentTarget.dataset.roomName}`

    if(roomType == 'personal' || roomType == 'friend') {
        roomId = `-_${e.currentTarget.dataset.roomId}`
    }

    chatContentPreload() //display Preloader to Chat DOM

    particlesJS.load('chat-dom', 'js/packages/particles.js-master/demo/chatViewParticles.json', function () { //Display the web effect
        //Load the Particle js Animation Effect
    });

    //Display Active Background To Room li Tag
    Array.from(document.querySelectorAll('.roomNameClass')).map(x => x.classList.remove('active'))

    document.querySelector(`[data-target-${roomId ? `${roomName}${roomId}` : roomName}-room-btn]`).classList.add('active');

    //Display room name to the chat view
    document.querySelector('[data-room-type-holder]').textContent = roomType;

    localStorage.setItem('@_SOROSOKE_UNIQUE_HOLDER', JSON.stringify(roomId)) //Keep the room ID globaly

    document.querySelector('[data-room-name-holder]').textContent = roomName.split("-").join(" ");
    
    Array.from(document.querySelectorAll('.chat-header')).map(x => x.style.display = 'block')
    document.querySelector('[data-chat-form]').style.display = 'block'

    document.querySelector(`#newMessageNotify${roomId ? `${roomName}${roomId}` : roomName}`).innerHTML = ''
    document.querySelector(`#newMessageNotify${roomId ? `${roomName}${roomId}` : roomName}`).style.visibility = 'hidden';

    //View the chat spot on mobile screen
    roomAndChatViewResizeWithClick('room-view')

    //Clear room Message count notification
    localStorage.setItem(`@_SOROSOKE_MESSAGE_COUNT_${roomId ? `${roomName.toLowerCase()}${roomId}` : roomName}`, 0)
    document.querySelector('#userRoomCount').innerHTML = '';

    //Clear Next Chat For Room Tracker
    localStorage.getItem(`@_SOROSOKE_ROOM_NEXT_CHAT_PAGINATE`, 0);

    //Store selected room to locatorage to persitense purpose
    localStorage.setItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-TYPE', JSON.stringify(roomType));
    localStorage.setItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME',  JSON.stringify({
        roomName,
        roomNameUnique: `${roomId ? `${roomName.toLowerCase()}${roomId}` : roomName.toLowerCase()}`,
    }));

    //Load Active user in this room for the last 24 hours
    joinRoomTrackerFunc(`${roomId ? `${roomName}${roomId}` : roomName}`)

   setTimeout(() => {
    //get The Chat From Server
    fetchChatApi(roomType, `${ roomId ? `${roomName}${roomId}` : roomName}`)
   }, 500);
}


const loadRoomPersitName = async () => {

    await fetchCreatedPersonalRoomApi()
    await fetchJoinedPersonalRoomApi()
    await fetchYourFriendApi()

    const roomType = JSON.parse(localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-TYPE'));

    if (roomType && roomType !== 'friend') { 
        const roomData = localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME') ? 
                        JSON.parse(localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME')) : null;

        const roomId = roomData.roomNameUnique.split("-_")[1]

        roomId ? roomIdHolder = `-_${Number(roomId)}` : null //Update the Room Id Element

        document.querySelector(`[data-target-${roomData.roomNameUnique}-room-btn]`).classList.add('active');
        Array.from(document.querySelectorAll('.chat-header')).map(x => x.style.display = 'block')

        document.querySelector('[data-room-type-holder]').textContent = JSON.parse(localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-TYPE'));
        document.querySelector('[data-room-name-holder]').textContent = roomData.roomName.split("-").join(" ");
        document.querySelector('[data-chat-form]').style.display = 'block'

        //Load the UserRoomCoun
        if (localStorage.getItem(`@_SOROSOKE_APP_USER_ROOM_COUNT`)) {
            await loadUserRoomCount(Number(localStorage.getItem(`@_SOROSOKE_APP_USER_ROOM_COUNT`)))
        }
        //get The Chat From Server
        await fetchChatApi(roomType, roomData.roomNameUnique)
    }

    if(roomType && roomType === 'friend') {
        const persitData = localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME-FRIEND') ?
                         JSON.parse(localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME-FRIEND')) : null;
                         
        document.querySelector(`#friend-room-frd${persitData.roomToId}`).classList.add('active');
                         Array.from(document.querySelectorAll('.chat-header')).map(x => x.style.display = 'block')

        document.querySelector('[data-room-type-holder]').textContent = JSON.parse(localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-TYPE'));
        document.querySelector('[data-room-name-holder]').innerHTML = `
            <span class="m-0 p-0">${persitData.friendName} 
                <span>@${persitData.friendScreenName}</span>
            </span>`;

        document.querySelector('[data-chat-form]').style.display = 'block'
        //get The Chat From Server
        await fetchChatApi(roomType, null, persitData.roomToId) 
    }

    if (!roomType) {
        //Display chat menu if a room is selected
        document.querySelector('[data-target-chat-dom]').innerHTML = `
            <div class="loader-logo mx-auto animate__animated animate__fadeIn" style="margin-top: 20px; 
                width: 60vh; text-align: center">
                <h5 class="m-0 p-0" style="text-align: center; color: white;">Welcome To</h5>
                <img src="images/logo.png" alt="Sorosoke Logo">
                <p style="color: white; font-size: 12px">Let's build the biggest community in Nigeria Together.</p>
            </div>`;
    }
    //Load the chat view resize from the Pesist function
    rooomAndChatViewResizeWithRefresh(roomType)
}

loadRoomPersitName();