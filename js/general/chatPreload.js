
const chatContentPreload = () => {
    const chatViewPreload = document.querySelector('#chat-dom')
    chatViewPreload.innerHTML = `
        <div class="chat-content-preloader col-12 mt-2 p-0">
            <div class="col-12 row mt-1 p-0">
                <div class="col-md-8 col-lg-6">
                    <div class="col-12">
                        <div class="item-image"></div>
                        <div class="item-name"></div>
                        <div class="item-time"></div>
                    </div>
                    <div class="content col-12 p-0 m-0 mt-4">
                        <div class="title"></div>
                    </div>
                </div>
            </div>
            <div class="col-12 row mt-1 p-0 m-0">
                <div class="col-md-8 col-lg-6 offset-md-4 offset-lg-6">
                    <div class="col-12">
                        <div class="item-image"></div>
                        <div class="item-name"></div>
                        <div class="item-time"></div>
                    </div>
                    <div class="content col-12 p-0 m-0 mt-4">
                        <div class="title"></div>
                    </div>
                </div>
            </div>
            <div class="col-12 row mt-1 p-0">
            <div class="col-md-8 col-lg-6">
                <div class="col-12">
                    <div class="item-image"></div>
                    <div class="item-name"></div>
                    <div class="item-time"></div>
                </div>
                <div class="content col-12 p-0 m-0 mt-4">
                    <div class="title"></div>
                </div>
            </div>
        </div>
        <div class="col-12 row mt-1 p-0 m-0">
            <div class="col-md-8 col-lg-6 offset-md-4 offset-lg-6">
                <div class="col-12">
                    <div class="item-image"></div>
                    <div class="item-name"></div>
                    <div class="item-time"></div>
                </div>
                <div class="content col-12 p-0 m-0 mt-4">
                    <div class="title"></div>
                </div>
            </div>
        </div>
        </div>
    `;
}
chatContentPreload()