

const joinRoomTrackerFunc = async (roomName) => {
    localStorage.setItem(`@_SOROSOKE_APP_USER_ROOM_COUNT`, 0)
    try {
        const response = await fetch(`${apiOrigin}${apiVersion}${joinRoomTracker(roomName)}`, {
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

        if (result.success) {
            //Load the Chat Response To DOM
            console.log(result)
        }

    } catch (error) {
        alertify.set('notifier','position', 'top-center');
        alertify.error(`An expected error occured, please refresh and try again or contact us if problem persit.`);
        return false;  
    }
}


