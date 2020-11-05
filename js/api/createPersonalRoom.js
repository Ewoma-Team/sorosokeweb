
const createPersonalRoomBtn = document.querySelector("#create-personal-room-btn")
const createRoomName = document.querySelector("#create-room-name")
const createRoomDesc = document.querySelector("#create-room-desc")



const createRoomErrorHandling = (status, result) => {
    console.log(status, result)
    if (status !== 201) {
        alertify.set('notifier','position', 'top-right');
        alertify.error(`Upload Failed : ${result.info ? result.info : result.message}`);
        result.hint ? alertify.error(`Upload Failed : ${result.hint}`) : null
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
                'Authorization': `Bearer ${token}`
            },
            body: {
                room_name: createRoomName.value,
                description: description.value !== '' ? description.value : null
            }
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
            loadPersonalRoomDom()
            alertify.set('notifier','position', 'top-right');
            alertify.success(`New room created`);
            return true;
        }

        createRoomErrorHandling(status, result);

    } catch (error) {
        console.log(error)
        createPersonalRoomBtn.disabled = false;
        createPersonalRoomBtn.innerHTML = `Create`;
        alertify.set('notifier','position', 'top-center');
        alertify.error(`Error Creating Room: An error occured while creating a room, please refresh and try again or contact support.`);
    }
}



createPersonalRoomBtn.addEventListener('click', (e) => createPersonalRoomApi(e))


