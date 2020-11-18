
//Load the created rooms to DOM
const fetchCreatedPersonalRoomApi = async () => {

    const url = `${apiOrigin}${apiVersion}${fetchCreatedPersonalRooms(page)}`

    const pageStore = '@-sorosoke-more-created-room-next-page'

    const response = await apiCall(url)

    if(response.success) {
        //load to Dom
        const data = response.yourRoom.data;

        insertRoomToDOM(data, "createdRoomDom")

        localStorage.setItem(pageStore,JSON.stringify(data.page + 1))

        return true
    }
}



//Load the Joined Room To DOM
const fetchJoinedPersonalRoomApi = async () => {

    const url = `${apiOrigin}${apiVersion}${fetchJoinedPersonalRoom(page)}`

    const pageStore = '@-sorosoke-more-joined-room-next-page'

    const response = await apiCall(url)

    if(response.success) {

        //load to Dom
        const data = response.joinedRoom.data;

        insertRoomToDOM(data, "joinedRoomDom")
        localStorage.setItem(pageStore,JSON.stringify(data.page + 1))

        return true
    }

}



const apiCall = async (url) => {
    
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

        if (result.success) {
            return result
        }

    } catch (error) {
        alertify.set('notifier','position', 'top-center');
        alertify.error(`An error occured while fetching rooms from our server, please refresh and try again or contact support`);
        return false;  
    }

}


const insertRoomToDOM = (datas, DOMId) => {
    let roomDOM = document.querySelector(`#${DOMId}`);
    let dataTarget, roomId, roomName = null;

    roomDOM.innerHTML = '';

    if(datas.length < 0) {
        return `
           <p style="text-align: center">No Room Found </p>
        `
    }

    datas.map(data => {
        
        if(DOMId === 'createdRoomDom') {

         dataTarget = `${data.room_name}-_${data.id}`;

         roomId = data.id;
    
         roomName = data.room_name
        }

        if(DOMId === 'joinedRoomDom') {

         dataTarget = `${data.personalRoomCreator.room_name}-_${data.room_creator_id}`

         roomId = data.room_creator_id
    
         roomName = data.personalRoomCreator.room_name
        }

        roomDOM.innerHTML += `
            <li class="nav-item mb-1 roomNameClass personal-room-class" 

                data-target-${dataTarget.toLowerCase()}-room-btn

                id="personal-room-${dataTarget}"
                
                data-room-id="${roomId}" 

                data-room-type="personal"
                
                data-room-name="${roomName}">

                <span style="text-align: left; font-weight: 500;" class="nav-link state-li">
                    ${roomName.split("-").join(" ")}
                    &nbsp;
                    
                    <span id="newMessageNotify${dataTarget}"
                        style="color: black !important; font-weight: 600;" class="badge badge-light newMessageNotify">
                    </span>
                    
                    ${
                        data.room_creator_id ?
                        `<p class="m-0" style="font-size: 8px;">
                            Created By:
                            <span style="color: skyblue !important; font-size: 10px; font-weight: 500;">@Ewoma</span>
                        </p>` : ''
                    }

                </span>

            </li>`;
    });

    //Handle When a room is click and display the chat view
    Array.from(document.querySelectorAll('.personal-room-class')).map(x => {
        x.addEventListener('click', (e) => loadRoomToDomBrigde(e));
    }) 
}
