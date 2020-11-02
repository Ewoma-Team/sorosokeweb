const fetchChatApi = async (roomType, roomName) => {

    console.log(roomType, roomName)
    console.log(`${apiOrigin}${apiVersion}${roomMessages(roomType, roomName, page)}`)

    try {
        const response = await fetch(`${apiOrigin}${apiVersion}${roomMessages(roomType, roomName, page)}`, {
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

        if (result.success) {
            //Load the Chat Response To DOM
            console.log(result)
            localStorage.setItem(`@_SOROSOKE_ROOM_NEXT_CHAT_PAGINATE_${roomName}`, Number(result.chats.page + 1));
            loadChatToDom(result, roomName)
        }

    } catch (error) {
        alertify.set('notifier','position', 'top-center');
        alertify.error(`An expected error occured, please refresh and try again or contact us if problem persit.`);
        return false;  
    }
}


