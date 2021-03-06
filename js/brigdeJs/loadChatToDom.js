
const loadChatToDom = (result, roomType, unique) => {
    
    const chatView = document.querySelector('[data-target-chat-dom]');

    if(result.chats.total === 0) {
        //track This instance wth localStorage to clear when a chat begins
        localStorage.setItem(`@_SOROSOKE_NO_CHAT_${unique}`, true)
        return chatView.innerHTML = `
            <div class="mt-5">
                <p style="text-align: center; color: white;">No Message yet in this room<br>
                  <small style="color: white; text-align: center;">You can start by saying<span style="color: skyblue;"> "Hi I am ${currentUser.name}, I am new here." </span> to start a conversation.</small>
                <p>
            </div>`
        }

    chatView.innerHTML = '';

    result.chats.data.map(chatInfo => {
        //Current User Chat Check
        dataInsert(chatInfo, roomType)
    });

    previewMemberOnChatAssit(chatView)
}


const dataInsert = (chatInfo, roomType) => {
    //Filter current User chat
    let chatDiv = null;
    
    chatInfo.user.id == currentUser.id ?
        chatDiv = `<div class="col-12 chat-message chat-message-right mb-3 animated__animated animated__fadeIn">
                        <div class="ml-auto d-flex justify-content-start chat-author col-12 col-md-5 mt-2">
                            <div class="dropdown" style="cursor: pointer;">
                                <i data-back-to-room id="dropdownMenuButtonChat"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                    class="fa fa-angle-down fa-lg "></i>
                                <div class="dropdown-menu menu-drop-view"
                                    aria-labelledby="dropdownMenuButtonChat">
                                    <a class="dropdown-item" href="#" title="Forward message">Forward message</a>
                                    <a class="dropdown-item" href="#" title="Reply">Reply</a>
                                    <a class="dropdown-item" href="#" title="Forward message">Important</a>
                                    <a class="dropdown-item" href="#" title="Delete message">Delete message</a>
                                </div>
                            </div>
                            <div class="m-0 p-0">
                                <p class="color-white ml-1 mt-1 p-0 m-0" style="text-overflow: ellipsis; font-style: italic;
                                         overflow: hidden; white-space: nowrap; font-size: 10px; width: 100px">
                                    You
                                </p>
                            </div>
                            <small class="ml-auto mt-2" style="font-size: 8px;">${dayjs().format('hh:mm a')}</small>
                        </div>
                        <div class="ml-auto mt-1 chat-message-con col-12 col-md-5">
                            <span class="">${chatInfo.chat}</span>
                            <span style="position: absolute; bottom: 2px; right: 10px; font-size: 10px; color: grey;">
                                <i class="fa fa-check" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>` : null;

    //Other User Chat Check
    chatInfo.user.id != currentUser.id ?
        chatDiv = `<div class="col-12 chat-message chat-message-left mb-3 animated__animated animated__fadeIn">
                        <div class="d-flex justify-content-start chat-author col-12 col-md-5 mt-2">
                            <div class="dropdown" style="cursor: pointer;">
                                <i data-back-to-room id="dropdownMenuButtonChat"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                    class="fa fa-angle-down fa-lg mr-2"></i>
                                <div class="dropdown-menu menu-drop-view" style="z-index: 9999;"
                                    aria-labelledby="dropdownMenuButtonChat">
                                    ${
                                        roomType !== 'friend' ?
                                        `<a class="dropdown-item addFriend"
                                         data-friend-name="${chatInfo.user.name}"
                                         data-friend-screen-name="${chatInfo.user.screen_name}"
                                         data-friend-id="${chatInfo.user.id}"
                                         data-chat-id="${chatInfo.id}" title="Add as friend">Add as friend</a>` : ''
                                    }
                                    <a class="dropdown-item viewMemeberProfile" data-chat-id="${chatInfo.id}" title="View Profile">View Profile</a>
                                    <a class="dropdown-item" href="#" title="Forward message">Forward message</a>
                                    <a class="dropdown-item" href="#" title="Reply">Reply</a>
                                    <a class="dropdown-item" href="#" title="Forward message">Important</a>
                                    <a class="dropdown-item" href="#" title="Delete message">Delete message</a>
                                </div>
                            </div>
                            <div class="chat-author-image mr-1">
                                <img style="width: 20px; height: 20px; border: 1px solid #e6e6e6;" src="${chatInfo.user.photo}" onerror="this.onerror=null;this.src='images/logo.png';" alt="">
                            </div>
                            <div class="m-0 p-0" id="nameView1${chatInfo.id}">
                                <p class="color-white ml-1 p-0 m-0" style="text-overflow: ellipsis;
                                         overflow: hidden; white-space: nowrap; font-size: 10px; width: 100px">
                                    ${chatInfo.user.name}
                                </p>
                                <p style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap; 
                                                font-size: 8px; font-weight: 500; color: skyblue;" class="ml-1 m-0 p-0">
                                    @${chatInfo.user.screen_name}
                                </p>
                            </div>
                            <div class="preview" id="previewOne${chatInfo.id}">
                                <div class="to">
                                    <div class="to-contents">
                                        <div class="top">
                                            <div class="avatar-large me">
                                            <img style="border-radius: 50%; border: 1px solid #e6e6e6;" src="${chatInfo.user.photo}" onerror="this.onerror=null;this.src='images/logo.png';" alt="">
                                            </div>
                                            <div class="name-large" id="nameView2${chatInfo.id}">
                                                <p class="p-0 m-0 mt-3">${chatInfo.user.name}</p>
                                                <p class="m-0 p-0" style="font-size: 10px">@${chatInfo.user.screen_name}</p>
                                            </div>
                                            <div class="x-touch">
                                                <div class="x">
                                                    <div class="line1"></div>
                                                    <div class="line2"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="bottom">
                                            <div class="row">
                                                <textarea style="border: none; font-size: 10px; height: 75px; white-space: normal" class="form-control col-10 mx-auto p-1" readOnly>
                                                ${chatInfo.user.description}
                                                </textarea>
                                                <div class="link mr-4 col-12">
                                                    <i class="fa fa-twitter" style="font-size: 25px; color: skyblue;" aria-hidden="true"></i>
                                                    <a style="font-size: 12px;" ref="no-referrer" target="_blank" href="https://twitter.com/${chatInfo.user.screen_name}">@mikaelainalem</a>
                                                </div>

                                                <div class="link col-12 add-as-friend" style="text-align: right; cursor: pointer;">
                                                    <span class="pr-1 pl-1 mr-4 addFriend"
                                                        data-friend-name="${chatInfo.user.name}"
                                                        data-friend-screen-name="${chatInfo.user.screen_name}"
                                                        data-friend-id="${chatInfo.user.id}"
                                                        data-chat-id="${chatInfo.id}"
                                                        style="font-size: 12px; border: 1px solid grey;">
                                                        Add as friend
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <small class="ml-auto mt-2" style="font-size: 8px;">${dayjs(chatInfo.created_at).format('hh:mm a')}</small>
                        </div>
                        <div class="mt-1 chat-message-con col-12 col-md-5">
                            <span class="">${chatInfo.chat}</span>
                        </div>
                    </div>` : null;

    $('[data-target-chat-dom]').prepend(`${chatDiv}`);
}
// <div class="floating-chat-day">
//     <span class="">Yesterday</span>
// </div>

