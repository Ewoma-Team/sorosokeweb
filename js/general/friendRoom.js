

const friendRoomBtn = document.querySelector('#friend-room-toggle')
const friendDom = document.querySelector('#friend-div')


let friendRoomToogleSwitch = false; 

const friendRoomToggle = (e) => {
    e.preventDefault();

    console.log(friendRoomToogleSwitch)

    if(friendRoomToogleSwitch) {
        friendDom.style.display ='none';//hide the drop down
        return friendRoomToogleSwitch = false;
    }
    if(!friendRoomToogleSwitch) {
        fetchYourFriendApi()
        friendDom.style.display ='block';
        return friendRoomToogleSwitch = true;
    }

}



friendRoomBtn.addEventListener('click', (e) => friendRoomToggle(e))



//------------------Select Friend For Room Creation
const selectFriendsFromRoom = () => {

    const friendDivs = Array.from(document.querySelectorAll('.create-friend-box'));

    friendDivs.map(friendDiv => {
        friendDiv.addEventListener('click', (e) => {
            e.preventDefault()
            const friendId = e.currentTarget.dataset.id
            if(newRoomfriends.includes(friendId)) {

                document.querySelector(`#selectedFriendIcon${friendId}`).style.background = '#ffffff'
                //Remove from the array
                newRoomfriends.splice(newRoomfriends.indexOf(friendId), 1)

                return true
            }
             document.querySelector(`#selectedFriendIcon${friendId}`).style.background = '#dc3545'
             //Add to the array
             newRoomfriends.push(friendId)
        })
    })

}



