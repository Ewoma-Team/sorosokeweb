

const newMessageNotify = (roomName) => {

    console.log(roomName)
    //Display the New Message Notify
    const getRoomCount = JSON.parse(localStorage.getItem(`@_SOROSOKE_MESSAGE_COUNT_${roomName}`));
    document.querySelector(`#newMessageNotify${roomName}`).innerHTML = getRoomCount
    document.querySelector(`#newMessageNotify${roomName}`).style.visibility = 'visible';
    
}