

const roomAndChatViewToggle = (action) => {

    if(action === 'room-view') {
        Array.from(document.querySelector('.select-room-section'))[0].style.display = 'none';
        Array.from(document.querySelector('.chat-view'))[0].style.display = 'block';
    }

    if(action === 'chat-view') {
        Array.from(document.querySelector('.chat-view'))[0].style.display = 'none';
        Array.from(document.querySelector('.select-room-section'))[0].style.display = 'block';
    }
}