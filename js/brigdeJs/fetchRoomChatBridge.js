

const fetchRoomChatBrigde = (e) => {
    e.preventDefault()

    particlesJS.load('chat-dom', 'js/packages/particles.js-master/demo/particles.js', function() {
        console.log('callback - particles.js config loaded');
    });

    const roomName = e.currentTarget.dataset.targetRoom;

    //Display room name to the chat view
    document.querySelector('[data-chat-identity]').textContent = roomName;
    document.querySelector('[data-chat-identity-view]').textContent = roomName;

    //View the chat spot on mobile screen
    roomAndChatViewResizeWithClick('room-view') 

    //Store selected room to locatorage to persitense purpose
    localStorage.setItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM', JSON.stringify(roomName));




     //get The Chat From Server
    fetchChatApi()
}


const fetchChatWithPersitRoom = () => {

    const getPersitRoom = localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM') ? JSON.parse(localStorage.getItem('@-SOROSOKE-APP-CURRENT-CHAT-ROOM')) : null;

        if(getPersitRoom) {
                document.querySelectorAll('.chat-header').display = 'block'
                document.querySelector('[data-chat-identity]').textContent = getPersitRoom;
                document.querySelector('[data-chat-identity-view]').textContent = getPersitRoom;

                //View the chat spot on mobile screen
                rooomAndChatViewResizeWithRefresh(getPersitRoom)
        
                //get The Chat From Server
                fetchChatApi()
        }

        if(!getPersitRoom) {
            /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
            // particlesJS.load('chat-dom', 'js/packages/particles.js-master/particles.json', function() {
            //     console.log('callback - particles.js config loaded');
            // });
            //Display chat menu if a room is selected
            document.querySelector('[data-target-chat-dom]').innerHTML = `
            <div class="loader-logo col-12 mx-auto animate__animated animate__fadeIn" style="margin-top: 20px;">
                <h4 style="text-align: center;">Welcome</h4>
                <img src="images/logo.png" alt="Sorosoke Logo">
                <p style="color: white; font-size: 10px">Let's build the biggest community in Nigeria Together.</p>
            </div>`;
        }
}

fetchChatWithPersitRoom();