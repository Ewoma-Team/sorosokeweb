
const loadChatToDom = (result, roomName) => {
    
    const chatView = document.querySelector('[data-target-chat-dom]');

    if(result.chats.total === 0) {
        //track This instance wth localStorage to clear when a chat begins
        localStorage.setItem(`@_SOROSOKE_NO_CHAT_${roomName}`, true)
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
        dataInsert(chatInfo)
    });


    chatView.scrollTo({
        top: chatView.scrollHeight 
    });
}


const dataInsert = (chatInfo) => {
    //Filter current User chat
    let chatDiv = null;
    
    chatInfo.user.id == currentUser.id ?
        chatDiv = `<div class="col-12 chat-message chat-message-right mb-3 animated__animated animated__fadeIn">
                        <div
                            class="ml-auto d-flex justify-content-start chat-author col-12 col-md-5 mt-2">
                            <div class="chat-author-image">
                                <img src="${currentUser.photo}" onerror="this.onerror=null;this.src='images/logo.png';" alt="">
                            </div>
                            <small class="color-white ml-1">${currentUser.name} 
                                <span style="font-size: 6px;">@${currentUser.screen_name}</span>
                            </small>
                            <small class="ml-auto" style="font-size: 8px;">${dayjs().format('hh:mm a')}</small>
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
                            <div class="chat-author-image">
                                <img src="${chatInfo.user.photo}" onerror="this.onerror=null;this.src='images/logo.png';" alt="">
                            </div>
                            <small class="color-white ml-1">${chatInfo.user.name} 
                            <span style="font-size: 6px;">@${chatInfo.user.screen_name}</span>
                        </small>
                            <small class="ml-auto" style="font-size: 8px;">${dayjs(chatInfo.created_at).format('hh:mm a')}</small>
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