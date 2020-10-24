const publicRoomBtn = document.querySelector('#public-room-toggle')
const publicDom = document.querySelector('[data-target-public-room-dom]')

let publicRoomToogleSwitch = true; 

const publicRoomToggle = (e) => {
    e.preventDefault();

    if(publicRoomToogleSwitch) {
        publicDom.style.display ='none';//hide the drop down
        return publicRoomToogleSwitch = false;
    }
    if(!publicRoomToogleSwitch) {
        publicDom.style.display ='block';
        return publicRoomToogleSwitch = true;
    }

}

publicRoomBtn.addEventListener('click', (e) => publicRoomToggle(e))

