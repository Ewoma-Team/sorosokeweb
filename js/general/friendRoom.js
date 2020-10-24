

const friendRoomBtn = document.querySelector('#friend-room-toggle')
const friendDom = document.querySelector('[data-target-friend-room-dom]')

let friendRoomToogleSwitch = false; 

const friendRoomToggle = (e) => {
    e.preventDefault();

    console.log(friendRoomToogleSwitch)

    if(friendRoomToogleSwitch) {
        friendDom.style.display ='none';//hide the drop down
        return friendRoomToogleSwitch = false;
    }
    if(!friendRoomToogleSwitch) {
        friendDom.style.display ='block';
        return friendRoomToogleSwitch = true;
    }

}

friendRoomBtn.addEventListener('click', (e) => friendRoomToggle(e))

