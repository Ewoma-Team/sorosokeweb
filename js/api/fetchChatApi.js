

const fetchChatApi = async (roomType, roomName = null, toId = null) => {


    try {
        const response = await fetch(`${apiOrigin}${apiVersion}${roomChatMessages(roomType, roomName, page, toId)}`, {
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
            //Load the Chat Response To DOM
            console.log(result)
            localStorage.setItem(`@_SOROSOKE_ROOM_NEXT_CHAT_PAGINATE`, Number(result.chats.page + 1));
            if(roomType === 'friend') {
                return loadFriendChatToDom(result, roomType, toId)
            }
            loadChatToDom(result, roomType, roomName)
        }

    } catch (error) {
        alertify.set('notifier','position', 'top-center');
        alertify.error(`An expected error occured, please refresh and try again or contact us if problem persit.`);
        return false;  
    }
}



