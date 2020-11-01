const loadRoomToDomBrigde = (e) => {
    e.preventDefault()
    const roomType = e.currentTarget.dataset.roomType;
    const roomName = e.currentTarget.dataset.roomName;
    chatContentPreload()

    //Display the web effect
    particlesJS.load('chat-dom', 'js/packages/particles.js-master/demo/chatViewParticles.json', function() {
        //Load the Particle js Animation Effect
    });

    //Display Active Background To Room li Tag
    Array.from(document.querySelectorAll('.roomNameClass')).map(x => x.classList.remove('active'))
    document.querySelector(`[data-target-${roomName}-room-btn]`).classList.add('active');

    //Display room name to the chat view
    document.querySelector('[data-room-type-holder]').textContent = roomType;
    document.querySelector('[data-room-name-holder]').textContent = roomName.split("-").join(" ");
    Array.from(document.querySelectorAll('.chat-header')).map(x => x.style.display = 'block')
    document.querySelector('[data-chat-form]').style.display = 'block'

    //View the chat spot on mobile screen
    roomAndChatViewResizeWithClick('room-view') 

    //Clear room Message count notification
    localStorage.setItem(`@_SOROSOKE_MESSAGE_COUNT_${roomName}`, 0)

    //Store selected room to locatorage to persitense purpose
    localStorage.setItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-TYPE', JSON.stringify(roomType));
    localStorage.setItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME', JSON.stringify(roomName));
    
    //get The Chat From Server
    fetchChatApi(roomType, roomName)
}


const loadRoomPersitName = () => {
    const roomName = localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME') ? JSON.parse(localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-NAME')) : null;
    const roomType = JSON.parse(localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-TYPE'));
        if(roomName) {
                document.querySelector(`[data-target-${roomName}-room-btn]`).classList.add('active');
                Array.from(document.querySelectorAll('.chat-header')).map(x => x.style.display = 'block')
                document.querySelector('[data-room-type-holder]').textContent = JSON.parse(localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM-TYPE'));
                document.querySelector('[data-room-name-holder]').textContent = roomName;
                document.querySelector('[data-chat-form]').style.display = 'block'
        
                //get The Chat From Server
                fetchChatApi(roomType, roomName)
        }

        if(!roomName) {
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
        rooomAndChatViewResizeWithRefresh(roomName)
}

loadRoomPersitName();