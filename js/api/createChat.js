
const chatForm = document.querySelector('#chatMessageForm');
const chatFileInfo = document.querySelector('[data-chat-file-info]')
const chatMessageValue = document.querySelector('#chatMessageValue');

const uploadFileErrorHandling = (status, result) => {
    if (status !== 201) {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error(`Upload Failed : ${result.info ? result.info : result.message}`);
        result.hint ? alertify.error(`Upload Failed : ${result.hint}`) : null
        return false;
    }
}

const validateCreateChatError = () => {

    alertify.set('notifier', 'position', 'top-right');

    if (!file) {
        alertify.error(`Upload Failed : A File is need to create a feed.`)
        return false;
    }

    if (descriptionField.value === '') {
        alertify.error(`Upload Failed : Please write a brief information about the feed.`)
        return false;
    }

    return true;
}

const createChatFunc = async (e) => {
    e.preventDefault();
    //Create a new Room Name because 
    let formData = new FormData();
    const file = new File(['faker'], "@sorosoke-faker-file-763929-ignore.png", { type: 'image/png' });
    const chatDiv = document.querySelector('[data-target-chat-dom]')
    const roomType = document.querySelector('[data-room-type-holder]').textContent;
    let unique = JSON.parse(localStorage.getItem('@_SOROSOKE_UNIQUE_HOLDER'));

       
    console.log(unique, roomType)

    if(roomType !== 'friend') {
        let roomNameGet = document.querySelector('[data-room-name-holder]').textContent.split(" ").join("-");
        unique = unique ? `${roomNameGet}${unique}` : roomNameGet
        //Append the room Name 
        formData.append('room_name', titleCase(unique));
    }

    if(roomType === 'friend') {
        formData.append('room_name', null);
        formData.append('to_id', unique);
    }

    formData.append('chat', chatMessageValue.value);
    formData.append('file_url', chatFileInfo ? chatFileInfo : file);


    //Check and clear the No-chat tracker from localStorage to enable live chat embedding
    if (localStorage.getItem(`@_SOROSOKE_NO_CHAT_${unique.toLowerCase()}`)) {
         chatDiv.innerHTML = ''; 
         localStorage.removeItem(`@_SOROSOKE_NO_CHAT_${unique.toLowerCase()}`)
    }

    //Append chat to dom 
    const timeId = addMessage(chatMessageValue.value, chatDiv)

    try {
        const response = await fetch(`${apiOrigin}${apiVersion}${createChat(roomType)}`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            status = response.status
        }

        console.log(response)

        const result = await response.json();

        console.log(result)

        if (result.success) {
            document.querySelector(`#${timeId}`).innerHTML = `<i class="fa fa-check" aria-hidden="true"></i>`
            return true;
        }


    } catch (error) {
        alertify.set('notifier', 'position', 'top-right');
        alertify.error(`Oops: An error occured, please check your internet connection.`);
    }
}


const addMessage = (message, chatDiv) => {

    const timeId = `time-sent${passwordGenerator(10)}`

    $('[data-target-chat-dom]').append(`
        <div class="col-12 chat-message chat-message-right mb-3 animated__animated animated__fadeIn">
            <div class="ml-auto d-flex justify-content-start chat-author col-12 col-md-5 mt-2">
                <div class="dropdown" style="cursor: pointer;">
                <i data-back-to-room id="dropdownMenuButtonChat"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                    class="fa fa-angle-down fa-lg "></i>
                <div class="dropdown-menu menu-drop-view"
                    aria-labelledby="dropdownMenuButtonChat">
                    <a class="dropdown-item" href="#" title="Forward message">Forward message</a>
                    <a class="dropdown-item" href="#" title="Reply">Reply</a>
                    <a class="dropdown-item" href="#" title="Forward message">Important</a>
                    <a class="dropdown-item" href="#" title="Delete message">Delete message</a>
                </div>
            </div>
            <div class="m-0 p-0">
                <p class="color-white ml-1 mt-1 p-0 m-0" style="text-overflow: ellipsis; font-style: italic;
                        overflow: hidden; white-space: nowrap; font-size: 10px; width: 100px">
                    You
                </p>
            </div>
                <small class="ml-auto" style="font-size: 8px;">${dayjs().format('hh:mm a')}</small>
            </div>
            <div class="ml-auto mt-1 chat-message-con col-12 col-md-5">
                <span class="">${message}</span>
                <span id=${timeId} style="position: absolute; bottom: 2px; right: 10px; font-size: 10px; color: grey;">
                    <i class="fa fa-clock-o" aria-hidden="true"></i>
                </span>
            </div>
        </div>
    `);

    chatDiv.scrollTo({
        top: chatDiv.scrollHeight,
        behavior: 'smooth'
    });

    chatMessageValue.value = '';

    return timeId;

}

chatForm.addEventListener('submit', (e) => createChatFunc(e))

const passwordGenerator = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

