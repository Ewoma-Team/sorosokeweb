

const favouriteRoomBtn = document.querySelector('#favourite-room-toggle')
const favouriteDom = document.querySelector('[data-target-favourite-room-dom]')

let favouriteRoomToogleSwitch = true; 

const loadFavourite = () => {
    Array.from(document.querySelectorAll('.favourite-room-class')).map(x => {
        x.addEventListener('click', (e) => loadRoomToDomBrigde(e));
    })    
}

loadFavourite()

const favouriteRoomToggle = (e) => {
    e.preventDefault();

    console.log(favouriteRoomToogleSwitch)

    if(favouriteRoomToogleSwitch) {
        favouriteDom.style.display ='none';//hide the drop down
        return favouriteRoomToogleSwitch = false;
    }
    if(!favouriteRoomToogleSwitch) {
        favouriteDom.style.display ='block';
        return favouriteRoomToogleSwitch = true;
    }

}

favouriteRoomBtn.addEventListener('click', (e) => favouriteRoomToggle(e))

