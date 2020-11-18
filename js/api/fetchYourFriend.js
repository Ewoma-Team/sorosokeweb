//Load the Joined Room To DOM
const fetchYourFriendApi = async () => {

    const url = `${apiOrigin}${apiVersion}${fetchYourFriends(page)}`

    const pageStore = '@-sorosoke-more-joined-room-next-page'

    const response = await apiYourFriendCall(url)

    if(response.success) {
        //load to Dom
        const data = response.yourFriend.data;

        insertFriendToDOM(data)
        localStorage.setItem(pageStore,JSON.stringify(data.page + 1))

        return true
    }

}



const apiYourFriendCall = async (url) => {
    
    try {
        const response = await fetch(url, {
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

        if (status === 500) {
            alertify.set('notifier','position', 'top-center');
            alertify.error(`Feed Fetched Failed : ${result.message}`);
            result.hint ? alertify.error(`Feed Fetched Failed : ${result.hint}`) : null
            return false;   
        }
        if (status !== null) {
            alertify.set('notifier','position', 'top-center');
            alertify.error(`Feed Fetched Failed : ${result.info}`);
            result.hint ? alertify.error(`Feed Fetched Failed : ${result.hint}`) : null
            return false;   
        }

        if (result.success) {
            return result
        }

    } catch (error) {
        alertify.set('notifier','position', 'top-center');
        alertify.error(`An error occured while fetching rooms from our server, please refresh and try again or contact support`);
        return false;  
    }

}

