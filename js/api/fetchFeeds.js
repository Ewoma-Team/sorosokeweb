
const feedsViewPreload = document.querySelector('[data-target-feed-preload]')


const fetchFeedErrorHandling = (status, result) => {
    if (status === 500) {
        alertify.set('notifier','position', 'top-right');
        alertify.error(`Feed Fetched Failed : ${result.message}`);
        result.hint ? alertify.error(`Feed Fetched Failed : ${result.hint}`) : null
        return false;   
    }
    if (status !== null) {
        alertify.set('notifier','position', 'top-right');
        alertify.error(`Feed Fetched Failed : ${result.info}`);
        result.hint ? alertify.error(`Feed Fetched Failed : ${result.hint}`) : null
        return false;   
    }
}


const fetchFeedsApi = async () => {

    try {
        const response = await fetch(`${apiOrigin}${apiVersion}${fetchFeeds(page)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            status = response.status
        }

        const result = await response.json();
        console.log(result)
        fetchFeedErrorHandling(status, result)

        if (result.success) {
            loadFeedsToDom(result.feeds.data, result.fileOrigin.imageOrigin, result.fileOrigin.videoOrigin)
            localStorage.setItem('@-sorosoke-fetch-feed-next-page',JSON.stringify(result.feeds.page + 1))
        }

    } catch (error) {
        console.log(error)
        alertify.set('notifier','position', 'top-center');
        alertify.error(`An error occured while fetching feeds from our server, please refresh and try again or contact support`);
        return false;  
    }

}


const loadFeedsToDom = (feeds, imageOrigin, videoOrigin) => {

    feedsViewPreload.innerHTML = '';
    console.log(feeds.length)
    if(feeds.length == 0) {
        feedsViewPreload.innerHTML = `
            <div class="col-12" style="margin-top: 100px">
                <h3 style="text-align: center; color: white;">No Current Feed At The Moment</h3>
                <p style="color: white; text-align: center;">Click the upload button to share one...</p>
            </div>
        `;
        return false;
    }
 
    feeds.map(feed => {
       loadFeedToView(feed, imageOrigin, videoOrigin, "non-socket")
    })
}


const loadFeedToView = (feed, imageOrigin, videoOrigin, action) => {
    const {feed_id, file_type, description, location, file_url, user, humanreadabletime} = feed;
    const {id, screen_name, name, photo, user_id, verified} = user;

    let wallView = '';

    if(file_type === 'image') {
        wallView = `<img style="width: 100%; height: 100%; border: 1px solid grey; border-radius: 2px;" src="${imageOrigin}${file_url}" alt=""></img>`
    }

    if(file_type === 'video') {
        wallView =  `<video id="video-tag" src="${videoOrigin}${file_url}" style="width: 100%; height: 100%; border: 1px solid grey; border-radius: 2px;" 
                            controls poster="/images/logo.png">
                                Your browser does not support the video tag.
                    </video>`
    }

    const feedDiv = `
            <div class="col-10 col-sm-5 col-md-4 col-lg-3 mx-auto mx-md-0 feeds-showcase-single mb-4 p-0 p-sm-2" data-target-feed-id="${feed_id}">
                <div class="col-12 feed-image px-0">
                    ${
                        wallView
                    }
                </div>
                <div class="col-12 d-flex row justify-content-start post-author mt-2 p-0 m-0">
                    <p class="color-white col-12 mb-0 pb-0" style="font-size: 12px; font-weight: 300;">
                        <img class="post-author-image" src="${photo}" alt="U">
                        <span>&nbsp;&nbsp;${name}</span><span style="font-size: 8px"> ~ ${humanreadabletime}</span>
                    </p>
                    <p class="color-white col-12 mt-0 pt-0" style="font-size: 12px; font-weight: 300; text-align: right;">
                    <span style="font-size: 8px"> @${screen_name}</span>&nbsp;<span style="font-size: 8px;" title="Twitter Verifed">${verified ? `<i class="fa fa-check-circle" style="font-size:10px"></i>` : ''}</span>
                    </p>
                </div>
                <div class="col-12 d-flex p-0 m-0">
                    <p class="color-white" style="font-size: 10px; font-weight: 300; text-align: justify;">
                        ${description}
                    </p>
                </div>
                <div class="col-12 d-flex p-0 m-0">
                    <p class="color-white" style="font-size: 10px; font-weight: 300; text-align: justify;">
                        ${location ? location : ''}
                    </p>
                </div>
            </div>`

    if(action === 'non-socket') {
        feedsViewPreload.innerHTML += `${feedDiv}`;
    }

    if(action === 'socket') {
        $('[data-target-feed-preload]').prepend(feedDiv);
    }
}

fetchFeedsApi();
