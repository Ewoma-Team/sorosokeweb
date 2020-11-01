

const roomAndChatViewResizeWithClick = ( action) => {

    var appWindow = window.matchMedia("(max-width: 768px)");

    if (appWindow.matches) {  
        
        if(action === 'room-view') {
            Array.from(document.querySelectorAll('.select-room-section'))[0].style.display = 'none';
            Array.from(document.querySelectorAll('.chat-view'))[0].style.display = 'block';
        }

        if(action === 'chat-view') {
            Array.from(document.querySelectorAll('.chat-view'))[0].style.display = 'none';
            Array.from(document.querySelectorAll('.select-room-section'))[0].style.display = 'block';
        }
    }
}


///Handle the chat and room resize toggle and alos handles the persitense

const rooomAndChatViewResizeWithRefresh = (getPersitRoom) => {
    var widthMatch = window.matchMedia("(min-width: 768px)");

    showRoomAndChatViewOnDesktop = (widthMatch) => {
        if (widthMatch.matches) {
            Array.from(document.querySelectorAll('.select-room-section'))[0].style.display = 'block';
            Array.from(document.querySelectorAll('.chat-view'))[0].style.display = 'block'
        }
        if(!widthMatch.matches) {

            getPersitRoom ? Array.from(document.querySelectorAll('.chat-view'))[0].style.display = 'block' : null

            getPersitRoom ? Array.from(document.querySelectorAll('.select-room-section'))[0].style.display = 'none' : null

            !getPersitRoom ? Array.from(document.querySelectorAll('.chat-view'))[0].style.display = 'none' : null
        }
    }

    showRoomAndChatViewOnDesktop(widthMatch)
    widthMatch.addEventListener("change", () => showRoomAndChatViewOnDesktop(widthMatch));
}

