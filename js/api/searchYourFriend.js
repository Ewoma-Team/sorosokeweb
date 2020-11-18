

const searchYourFriendApi = async (url, type = null) => {

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
            alertify.set('notifier','position', 'top-right');
            alertify.error(`Search Friend Failed : ${result.message}`);
            result.hint ? alertify.error(`Search Friend Failed : ${result.hint}`) : null
            return false;   
        }
        if (status !== null) {
            alertify.set('notifier','position', 'top-right');
            alertify.error(`Search Friend Failed : ${result.info}`);
            result.hint ? alertify.error(`Search Friend Failed : ${result.hint}`) : null
            return false;   
        }

        console.log(result)
        if (result.success) {
            if(type === 'create-room') {
                loadSearchFriendToCreateDOM(result.searchedFriend.data)
            }
            if(type === 'general') {

            }
        }

    } catch (error) {
        console.log(error)
        alertify.set('notifier','position', 'top-center');
        alertify.error(`An error occured while fetching rooms from our server, please refresh and try again or contact support`);
        return false;  
    }

}