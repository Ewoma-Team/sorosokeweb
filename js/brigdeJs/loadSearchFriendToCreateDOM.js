


const loadSearchFriendToCreateDOM = (data) => {

    const createRoomFriedDOM = document.querySelector('#create-room-show-user-friends')

    if(data.length <= 0) {
      return createRoomFriedDOM.innerHTML = `
        <p style="color: grey; text-align: center;">No Friend Found</p>
      `;    
    }

    createRoomFriedDOM.innerHTML = '';
    data.map(friend => {
        createRoomFriedDOM.innerHTML += `
            <div class="col-12 row mb-2 p-0 m-0 create-friend-box" data-id="${friend.id}">
                <div class="col-3">
                    <img style="border-radius: 50%; max-width: 50px; max-height: 50px;" class="mt-2"
                    src="${friend.photo}" onerror="this.onerror=null;this.src='images/logo.png';" alt="friend photo">
                </div>
                <div class="nav-link col-9">
                    <p style="text-align: left; font-weight: 500; text-overflow: clip; font-size: 12px;"
                        class="nav-link m-0 p-0">
                        ${friend.name}&nbsp;
                        <span class="m-0 p-0"
                            style="font-size: 12px; font-weight: 500; color: #dc3545!important;">@${friend.screen_name}</span>
                    </p>
                    <p class="m-0 mt-2 p-0"
                        style="font-size: 10px; font-weight: 500; color: black !important;">
                        ${friend.description}
                    </p>
                    <span id="selectedFriendIcon${friend.id}" style="border: 1px solid #dc3545;position: absolute; right: 10px;  bottom: 10px;
                        border-radius: 50%; padding: 5px;height: 3px;"></span>
                </div>
            </div>
        `;
    })
    selectFriendsFromRoom()
}