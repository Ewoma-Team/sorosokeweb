
const contentPreload = () => {
    const feedsViewPreload = document.querySelector('[data-target-feed-preload]')

    feedsViewPreload.innerHTML = `
        <div class="content-preloader col-12 mt-4">
            <div class="col-12 row mx-auto">
                <div class=" mt-2 col-10 col-sm-6 col-md-4">
                    <div class="item-image col-sm-6 col-md-12 col-lg-10"></div>
                    <div class="content col-sm-6 col-md-12 col-lg-10 mx-auto p-0 m-0 mt-2">
                        <div class="short-title"></div>
                        <div class="title"></div>
                        <div class="short-title"></div>
                        <div class="title"></div>
                    </div>
                </div>
                <div class=" mt-2 col-10 col-sm-6 col-md-4">
                    <div class="item-image col-sm-6 col-md-12 col-lg-10"></div>
                    <div class="content col-sm-6 col-md-12 col-lg-10 mx-auto p-0 m-0 mt-2">
                        <div class="short-title"></div>
                        <div class="title"></div>
                        <div class="short-title"></div>
                        <div class="title"></div>
                    </div>
                </div>
                <div class=" mt-2 col-10 col-sm-6 col-md-4">
                    <div class="item-image col-sm-6 col-md-12 col-lg-10"></div>
                    <div class="content col-sm-6 col-md-12 col-lg-10 mx-auto p-0 m-0 mt-2">
                        <div class="short-title"></div>
                        <div class="title"></div>
                        <div class="short-title"></div>
                        <div class="title"></div>
                    </div>
                </div>
            </div>
            <div class="col-12 row mx-auto mt-3">
                <div class=" mt-2 col-10 col-sm-6 col-md-4">
                    <div class="item-image col-sm-6 col-md-12 col-lg-10"></div>
                    <div class="content col-sm-6 col-md-12 col-lg-10 mx-auto p-0 m-0 mt-2">
                        <div class="short-title"></div>
                        <div class="title"></div>
                        <div class="short-title"></div>
                        <div class="title"></div>
                    </div>
                </div>
                <div class=" mt-2 col-10 col-sm-6 col-md-4">
                    <div class="item-image col-sm-6 col-md-12 col-lg-10"></div>
                    <div class="content col-sm-6 col-md-12 col-lg-10 mx-auto p-0 m-0 mt-2">
                        <div class="short-title"></div>
                        <div class="title"></div>
                        <div class="short-title"></div>
                        <div class="title"></div>
                    </div>
                </div>
                <div class=" mt-2 col-10 col-sm-6 col-md-4">
                    <div class="item-image col-sm-6 col-md-12 col-lg-10"></div>
                    <div class="content col-sm-6 col-md-12 col-lg-10 mx-auto p-0 m-0 mt-2">
                        <div class="short-title"></div>
                        <div class="title"></div>
                        <div class="short-title"></div>
                        <div class="title"></div>
                    </div>  
                </div>
            </div>
        </div>
    `;
}
contentPreload()