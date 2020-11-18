
const searchFriendForCreateRoomInput = document.querySelector('#searchFriendForCreateRoom')


const searchFriendForCreateRoomBridge = (e) => {
    e.preventDefault()

    const query = e.currentTarget.value;

    const url = `${apiOrigin}${apiVersion}${searchYourFriend(query, page)}`

    if(query !== "") {    
         searchYourFriendApi(url, 'create-room') //Trigger the Api Call
    }

}


searchFriendForCreateRoomInput.addEventListener('keyup', (e) => searchFriendForCreateRoomBridge(e))