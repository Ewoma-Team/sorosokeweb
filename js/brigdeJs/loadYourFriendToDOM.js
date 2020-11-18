const insertFriendToDOM = (datas) => {

    let friend = null; let toID = null;

    let friendDOM = document.querySelector(`#friend-div`);
    
    friendDOM.innerHTML = '';

    if(datas.length < 0) {
        return `
            <p style="text-align: center">No Friend Found </p>
        `
    }

    datas.map(data => {
            
        if(data.sender_id === Number(currentUser.id)) {
            friend = data.accepteeFriend
            toID = data.acceptee_id
        }

        if(data.acceptee_id === Number(currentUser.id)) {
            friend = data.senderFriend
            toID = data.sender_id
        }

        friendDOM.innerHTML += `
            <li class="nav-item mb-1 roomNameClass friend-room-class"
                id="friend-room-frd${toID}" 
                data-room-type="friend"
                data-name="${friend.name}"
                data-screen-name="${friend.screen_name}"
                data-to-id="${toID}">
                
                <span style="text-align: left; font-weight: 500;" class="nav-link state-li"
                    href="#">
                    ${friend.name}&nbsp;
                    &nbsp;<span id="newMessageNotify${toID}" style="color: black !important; font-weight: 600;"
                       class="badge badge-light newMessageNotify"></span>
                    <span
                        style="font-size: 10px; font-weight: 500; color: skyblue !important;">@${friend.screen_name}</span>
                </span>
            </li>
        `;
    });

    //Handle When a room is click and display the chat view
    Array.from(document.querySelectorAll('.friend-room-class')).map(x => {
        x.addEventListener('click', (e) => callFriendChatApiBridge(e));
    }) 
}