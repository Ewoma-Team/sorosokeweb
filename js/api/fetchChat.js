


const chatView = document.querySelector('[data-target-chat-dom]');

const fetchChatApi = () => {


    chatView.innerHTML +=  `
        <div class="floating-chat-day">
            <span class="">Yesterday</span>
        </div>
        <div class="col-12 chat-message chat-message-right mb-3">
            <div
                class="ml-auto d-flex justify-content-start chat-author col-12 col-md-5 mt-2">
                <div class="chat-author-image">
                    <img src="images/sample-girl.png" alt="">
                </div>
                <small class="color-white ml-1">Eniduro Shade
                    Thrower</small>
                <small class="ml-auto" style="font-size: 8px;">2:30PM</small>
            </div>
            <div class="ml-auto mt-1 chat-message-con col-12 col-md-5">
                <span class=""> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reprehenderit placeat obcaecati eligendi quibusdam fugit consectetur
                    dignissimos temporibus assumenda quae atque!</span>
            </div>
        </div>
        <div class="col-12 chat-message chat-message-left mb-3">
            <div class="d-flex justify-content-start chat-author col-12 col-md-5 mt-2">
                <div class="chat-author-image">
                    <img src="images/sample-girl.png" alt="">
                </div>
                <small class="color-white ml-1">Eniduro Shade
                    Thrower</small>
                <small class="ml-auto" style="font-size: 8px;">2:30PM</small>
            </div>
            <div class="mt-1 chat-message-con col-12 col-md-5">
                <span class=""> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reprehenderit placeat obcaecati eligendi quibusdam fugit consectetur
                    dignissimos temporibus assumenda quae atque!</span>
            </div>
        </div>
    `;

}


