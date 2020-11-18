const personalRoomBtn = document.querySelector('#personal-room-toggle')
const createdRoomDom = document.querySelector('#createdRoomDom')
const joinedRoomDom = document.querySelector('#joinedRoomDom')

const yourRoomTitle = document.querySelector('#your-room-title')
const joinedRoomTitle = document.querySelector('#joined-room-title')

//Personal Room Toogle Switch
let personalRoomToogleSwitch = false; 

const personalRoomToggle = (e) => {
    e.preventDefault();

    if(personalRoomToogleSwitch) {
        createdRoomDom.style.display ='none';//hide the drop down+
        joinedRoomDom.style.display ='none';//hide the drop down+
        yourRoomTitle.style.display = 'none';
        joinedRoomTitle.style.display = 'none';
        return personalRoomToogleSwitch = false;
    }
    if(!personalRoomToogleSwitch) {
        fetchCreatedPersonalRoomApi()
        fetchJoinedPersonalRoomApi()
        createdRoomDom.style.display ='block';
        joinedRoomDom.style.display ='block';
        yourRoomTitle.style.display = 'block';
        joinedRoomTitle.style.display = 'block';
        return personalRoomToogleSwitch = true;
    }

}
personalRoomBtn.addEventListener('click', (e) => personalRoomToggle(e))





