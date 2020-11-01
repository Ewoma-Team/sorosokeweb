

const personalRoomBtn = document.querySelector('#personal-room-toggle')
const personalDom = document.querySelector('[data-target-personal-room-dom]')

let personalRoomToogleSwitch = false; 

const loadpersonals = () => {

    
    Array.from(document.querySelectorAll('.personal-room-class')).map(x => {
        x.addEventListener('click', (e) => loadRoomToDomBrigde(e));
    }) 
}

loadpersonals()

const personalRoomToggle = (e) => {
    e.preventDefault();
    if(personalRoomToogleSwitch) {
        personalDom.style.display ='none';//hide the drop down
        return personalRoomToogleSwitch = false;
    }
    if(!personalRoomToogleSwitch) {
        personalDom.style.display ='block';
        return personalRoomToogleSwitch = true;
    }

}



personalRoomBtn.addEventListener('click', (e) => personalRoomToggle(e))



