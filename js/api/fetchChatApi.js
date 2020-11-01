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
            localStorage.setItem(`@-SOROSOKE_ROOM_NEXT_CHAT_PAGINATE-${roomName}`, Number(result.chats.page + 1));
            loadChatToDom(result, roomName)
        }

    } catch (error) {
        alertify.set('notifier','position', 'top-center');
        alertify.error(`Authentication Failed : An error occured while authenticating account.`);
        return false;  
    }
}


