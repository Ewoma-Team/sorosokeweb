

const newMessageNotify = (roomNameUnique) => {

    //Display the New Message Notify
    const getRoomCount = JSON.parse(localStorage.getItem(`@_SOROSOKE_MESSAGE_COUNT_${roomNameUnique}`));
    document.querySelector(`#newMessageNotify${roomNameUnique}`).innerHTML = getRoomCount
    document.querySelector(`#newMessageNotify${roomNameUnique}`).style.visibility = 'visible';

}