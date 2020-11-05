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



//------------------Create Personal Room Friend Manipulation


const createPersonalRoomFunc = () => {

    const selectedFriends = [];

    const friendDivs = Array.from(document.querySelectorAll('.create-friend-box'));
    console.log(friendDivs)
    friendDivs.map(friendDiv => {
        friendDiv.addEventListener('click', (e) => {
            e.preventDefault()
            const friendId = e.currentTarget.dataset.id
            if(selectedFriends.includes(friendId)) {

                document.querySelector(`#selectedFriendIcon${friendId}`).style.background = '#ffffff'
                //Remove from the array
                selectedFriends.splice(selectedFriends.indexOf(friendId), 1)

                return true
            }
             document.querySelector(`#selectedFriendIcon${friendId}`).style.background = '#dc3545'
             //Add to the array
             selectedFriends.push(friendId)
        })
    })




}


createPersonalRoomFunc()





