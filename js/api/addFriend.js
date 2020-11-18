

const addFriendAPI = async (elem, chatId, friendId, name, screenName) => {
    
    preloadFormatter(elem, 'preload', chatId, name, screenName) 

    try {
        const response = await fetch(`${apiOrigin}${apiVersion}${addFriend(friendId)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            console.log(response.status)
            status = response.status
        }

        const result = await response.json();

        console.log(result)

        if (status !== null) {
            preloadFormatter(elem, 'done', chatId, name, screenName) 
            alertify.set('notifier', 'position', 'bottom-left');
            alertify.error(`${result.info}`);
            result.hint ? alertify.error(`Add Friend Error: ${result.hint}`) : null
            return false;
        }

        if (result.success) {
            //Load the Chat Response To DOM
            preloadFormatter(elem, 'done', chatId, name, screenName) 
            fetchYourFriendApi()
            alertify.set('notifier', 'position', 'bottom-left');
            alertify.success(`Friend request sent to ${name} - @${screenName}`);
        }

    } catch (error) {
        preloadFormatter(elem, 'done', chatId, name, screenName) 
        alertify.set('notifier', 'position', 'bottom-left');
        alertify.error(`An expected error occured, please refresh and try again or contact us if problem persit.`);
        return false;
    }

}


const preloadFormatter = (elem, action, chatId, name, screenName) => {
    if(action === 'preload') {
        elem.classList.remove('addFriend')
        document.querySelector(`#nameView1${chatId}`).innerHTML = `
        <p style="color: white; font-style: italic; font-size: 12px;" class="ml-2 m-0 p-0 mb-1 mt-1">
            sending friend request...
        </p>`

        document.querySelector(`#nameView2${chatId}`).innerHTML = `
        <p style="color: white; font-style: italic;" class="mt-4">
            sending friend request...
        </p>`
    }

    if(action === 'done') {
        elem.classList.add('addFriend')

        document.querySelector(`#nameView1${chatId}`).innerHTML = `
        <p class="color-white ml-1 p-0 m-0" style="text-overflow: ellipsis;
            overflow: hidden; white-space: nowrap; font-size: 10px; width: 100px">
            ${name}
        </p>
        <p style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap; 
            font-size: 8px; font-weight: 500; color: skyblue;" class="ml-1 m-0 p-0">
            @${screenName}
        </p>
        `;

        document.querySelector(`#nameView2${chatId}`).innerHTML = `
        <p class="p-0 m-0 mt-3">${name}</p>
        <p class="m-0 p-0" style="font-size: 10px">@${screenName}</p>`;
    }

} 