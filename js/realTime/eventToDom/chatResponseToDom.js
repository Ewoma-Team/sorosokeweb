//Handle the chat event to the DOM
const chatResponseToDOM = (roomType, data) => {

    $('[data-target-chat-dom]')
        .append(`<div class="col-12 chat-message chat-message-left mb-3 animated__animated animated__fadeIn">
                    <div class="d-flex justify-content-start chat-author col-12 col-md-5 mt-2">
                        <div class="dropdown" style="cursor: pointer; z-index: 999999;">
                            <i data-back-to-room id="dropdownMenuButtonChat"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                class="fa fa-angle-down fa-lg mr-2"></i>
                            <div class="dropdown-menu menu-drop-view"
                                aria-labelledby="dropdownMenuButtonChat">
                                ${
                                    roomType !== 'friend' ?
                                    `<a class="dropdown-item addFriend"
                                    data-friend-name="${data.user.name}"
                                    data-friend-screen-name="${data.user.screen_name}"
                                    data-friend-id="${data.user.id}"
                                    data-chat-id="${data.id}" title="Add as friend">Add as friend</a>` : ''
                                }
                                <a class="dropdown-item viewMemeberProfile" data-chat-id="${data.id}" title="View Profile">View Profile</a>
                                <a class="dropdown-item" href="#" title="Forward message">Forward message</a>
                                <a class="dropdown-item" href="#" title="Reply">Reply</a>
                                <a class="dropdown-item" href="#" title="Forward message">Important</a>
                                <a class="dropdown-item" href="#" title="Delete message">Delete message</a>
                            </div>
                        </div>
                        <div class="chat-author-image mr-1">
                            <img style="width: 20px; height: 20px; border: 1px solid #e6e6e6;" src="${data.user.photo}" onerror="this.onerror=null;this.src='images/logo.png';" alt="">
                        </div>
                        <div class="m-0 p-0" id="nameView1${data.id}">
                            <p class="color-white ml-1 p-0 m-0" style="text-overflow: ellipsis;
                                    overflow: hidden; white-space: nowrap; font-size: 10px; width: 100px">
                                ${data.user.name}
                            </p>
                            <p style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap; 
                                            font-size: 8px; font-weight: 500; color: skyblue;" class="ml-1 m-0 p-0">
                                @${data.user.screen_name}
                            </p>
                        </div>
                        <div class="preview" id="previewOne${data.id}">
                            <div class="to">
                                <div class="to-contents">
                                    <div class="top">
                                        <div class="avatar-large me">
                                           <img style="border-radius: 50%; border: 1px solid #e6e6e6;" src="${data.user.photo}" onerror="this.onerror=null;this.src='images/logo.png';" alt="">
                                        </div>
                                        <div class="name-large" id="nameView2${data.id}">
                                            <p class="p-0 m-0 mt-3">${data.user.name}</p>
                                            <p class="m-0 p-0" style="font-size: 10px">@${data.user.screen_name}</p>
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
                                            ${data.user.description}
                                            </textarea>
                                            <div class="link mr-4 col-12">
                                                <i class="fa fa-twitter" style="font-size: 25px; color: skyblue;" aria-hidden="true"></i>
                                                <a style="font-size: 12px;" ref="no-referrer" target="_blank" href="https://twitter.com/${data.user.screen_name}">@mikaelainalem</a>
                                            </div>

                                            <div class="link col-12 add-as-friend" style="text-align: right; cursor: pointer;">
                                                <span class="pr-1 pl-1 mr-4 addFriend"
                                                    data-friend-name="${data.user.name}"
                                                    data-friend-screen-name="${data.user.screen_name}"
                                                    data-friend-id="${data.user.id}"
                                                    data-chat-id="${data.id}"
                                                    style="font-size: 12px; border: 1px solid grey;">
                                                    Add as friend
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <small class="ml-auto mt-2" style="font-size: 8px;">${dayjs(data.created_at).format('hh:mm a')}</small>
                    </div>
                    <div class="mt-1 chat-message-con col-12 col-md-5">
                        <span class="">${data.chat}</span>
                    </div>
                </div>
            `);

    const chatDiv = document.querySelector('[data-target-chat-dom]')
    chatDiv.scrollTo({
        top: chatDiv.scrollHeight,
        behavior: 'smooth'
    });

    previewMemberOnChatAssit(chatDiv)

}

//Handle the chat event to the DOM
const chatFriendResponseToDOM = (roomType, data) => {

    $('[data-target-chat-dom]')
        .append(`<div class="col-12 chat-message chat-message-left mb-3 animated__animated animated__fadeIn">
        <div class="d-flex justify-content-start chat-author col-12 col-md-5 mt-2">
            <div class="dropdown" style="cursor: pointer; z-index: 999999;">
                <i data-back-to-room id="dropdownMenuButtonChat"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    class="fa fa-angle-down fa-lg mr-2"></i>
                <div class="dropdown-menu menu-drop-view"
                    aria-labelledby="dropdownMenuButtonChat">
                    <a class="dropdown-item viewMemeberProfile" data-chat-id="${data.id}" title="View Profile">View Profile</a>
                    <a class="dropdown-item" href="#" title="Forward message">Forward message</a>
                    <a class="dropdown-item" href="#" title="Reply">Reply</a>
                    <a class="dropdown-item" href="#" title="Forward message">Important</a>
                    <a class="dropdown-item" href="#" title="Delete message">Delete message</a>
                </div>
            </div>
            <div class="chat-author-image mr-1">
                <img style="width: 20px; height: 20px" src="${data.accepteeFriend.photo}" onerror="this.onerror=null;this.src='images/logo.png';" alt="">
            </div>
            <div class="m-0 p-0" id="nameView1${data.id}">
                <p class="color-white ml-1 p-0 m-0" style="text-overflow: ellipsis;
                            overflow: hidden; white-space: nowrap; font-size: 10px; width: 100px">
                    ${data.accepteeFriend.name}
                </p>
                <p style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap; 
                                font-size: 8px; font-weight: 500; color: skyblue;" class="ml-1 m-0 p-0">
                    @${data.accepteeFriend.screen_name}
                </p>
            </div>
            <div class="preview" id="previewOne${data.id}">
                <div class="to">
                    <div class="to-contents">
                        <div class="top">
                            <div class="avatar-large me">
                            <img style="border-radius: 50%;" src="${data.accepteeFriend.photo}" onerror="this.onerror=null;this.src='images/logo.png';" alt="">
                            </div>
                            <div class="name-large" id="nameView2${data.id}">
                                <p class="p-0 m-0 mt-3">${data.accepteeFriend.name}</p>
                                <p class="m-0 p-0" style="font-size: 10px">@${data.accepteeFriend.screen_name}</p>
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
                                ${data.accepteeFriend.description}
                                </textarea>
                                <div class="link mr-4 col-12">
                                    <i class="fa fa-twitter" style="font-size: 25px; color: skyblue;" aria-hidden="true"></i>
                                    <a style="font-size: 12px;" ref="no-referrer" target="_blank" href="https://twitter.com/${data.accepteeFriend.screen_name}">@mikaelainalem</a>
                                </div>

                                <div class="link col-12 add-as-friend" style="text-align: right; cursor: pointer;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <small class="ml-auto mt-2" style="font-size: 8px;">${dayjs(data.created_at).format('hh:mm a')}</small>
            </div>
                <div class="mt-1 chat-message-con col-12 col-md-5">
                    <span class="">${data.chat}</span>
                </div>
            </div>`);

    const chatDiv = document.querySelector('[data-target-chat-dom]')
    chatDiv.scrollTo({
        top: chatDiv.scrollHeight,
        behavior: 'smooth'
    });

    previewMemberOnChatAssit(chatDiv)

}