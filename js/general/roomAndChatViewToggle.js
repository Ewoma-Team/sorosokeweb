

const roomAndChatViewToggle = (action) => {


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