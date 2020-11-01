//Handle the chat event to the DOM
const chatResponseToDOM = (data) => {
    
        $('[data-target-chat-dom]').append(`
                <div class="col-12 chat-message chat-message-left mb-3">
                    <div class="d-flex justify-content-start chat-author col-12 col-md-5 mt-2">
                        <div class="chat-author-image">
                            <img src="${data.user.photo}" onerror="this.onerror=null;this.src='images/logo.png';" alt="">
                        </div>
                        <small class="color-white ml-1">${data.user.name} 
                        <span style="font-size: 6px;">@${data.user.screen_name}</span>
                    </small>
                        <small class="ml-auto" style="font-size: 8px;">${dayjs(data.created_at).format('hh:mm a')}</small>
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

}