
const createPersonalRoomBtn = document.querySelector("#create-personal-room-btn")
const createRoomName = document.querySelector("#create-room-name")
const createRoomDesc = document.querySelector("#create-room-desc")


const createRoomErrorHandling = (status, result) => {

    if (status !== 201) {
        alertify.set('notifier','position', 'top-center');
        alertify.error(`Create Room Failed : ${result.info ? result.info : result.message}`);
        result.hint ? alertify.error(`Create Room Failed : ${result.hint}`) : null
        return false;   
    }
}

const validateCreateRoomFormInput = () => {

    alertify.set('notifier','position', 'top-center');

    if(createRoomName.value === "") {
        alertify.error(`Create Room Error: A room name is required to continue.`) 
        return false;
    }
    return true;
}

const createPersonalRoomApi = async (e) => {
    e.preventDefault()


    const validation = validateCreateRoomFormInput();//Validation of the input
    if(!validation) {return false;}

    createPersonalRoomBtn.innerHTML = `<div class="spinner-grow" style="color: #fff;" role="status"></div>`;
    createPersonalRoomBtn.disabled = true;

    try {

        const response = await fetch(`${apiOrigin}${apiVersion}${createPersonalRoom}`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                room_name: titleCase(createRoomName.value),
                description: createRoomDesc.value !== '' ? createRoomDesc.value : null,
                new_room_friends: newRoomfriends.length > 0 ? newRoomfriends : null
            })
        });
        if (!response.ok) {
            createPersonalRoomBtn.disabled = false;
            createPersonalRoomBtn.innerHTML = `Create`;
            status = response.status
        }

            const result = await response.json(); 

        if (result.success) {
            createPersonalRoomBtn.disabled = false;
            createPersonalRoomBtn.innerHTML = `Create`;
            fetchCreatedPersonalRoomApi()
            alertify.set('notifier','position', 'top-center');
            alertify.success(`New room created`);
            return true;
        }

        createRoomErrorHandling(status, result);

    } catch (error) {

        createPersonalRoomBtn.disabled = false;
        createPersonalRoomBtn.innerHTML = `Create`;
        alertify.set('notifier','position', 'top-center');
        alertify.error(`Error Creating Room: An error occured while creating a room, please refresh and try again or contact support.`);
    }
}



createPersonalRoomBtn.addEventListener('click', (e) => createPersonalRoomApi(e))


