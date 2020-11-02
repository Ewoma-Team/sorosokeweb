
const chatForm = document.querySelector('#chatMessageForm');
const chatFileInfo = document.querySelector('[data-chat-file-info]')
const chatMessageValue = document.querySelector('#chatMessageValue');

const uploadFileErrorHandling = (status, result) => {
    console.log(status, result)
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

    const chatDiv = document.querySelector('[data-target-chat-dom]')

    const roomType = document.querySelector('[data-room-type-holder]').textContent;
    const roomName = document.querySelector('[data-room-name-holder]').textContent;

    let data = new FormData();
    data.append('chat', chatMessageValue.value);
    data.append('room_name', titleCase(roomName));
    const file = new File(['faker'], "@sorosoke-faker-file-763929-ignore.png", { type: 'image/png' });
    data.append('file_url', chatFileInfo ? chatFileInfo : file);

    //Check and clear the No-chat tracker from localStorage to enable live chat embedding
    if (localStorage.getItem(`@_SOROSOKE_NO_CHAT_${roomName}`)) { chatDiv.innerHTML = ''; }

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
            body: data
        });

        if (!response.ok) {
            status = response.status
        }

        const result = await response.json();

        if (result.success) {
            document.querySelector(`#${timeId}`).innerHTML = `<i class="fa fa-check" aria-hidden="true"></i>`
            return true;
        }


    } catch (error) {
        console.log(error)
        alertify.set('notifier', 'position', 'top-right');
        alertify.error(`Oops: An error occured, please check your internet connection.`);
    }
}


const addMessage = (message, chatDiv) => {

    const timeId = `time-sent${passwordGenerator(10)}`

    $('[data-target-chat-dom]').append(`
        <div class="col-12 chat-message chat-message-right mb-3 animated__animated animated__fadeIn">
            <div
                class="ml-auto d-flex justify-content-start chat-author col-12 col-md-5 mt-2">
                <div class="chat-author-image">
                    <img src="${currentUser.photo}" onerror="this.onerror=null;this.src='images/logo.png';" alt="">
                </div>
                <small class="color-white ml-1">${currentUser.name} 
                    <span style="font-size: 6px;">@${currentUser.screen_name}</span>
                </small>
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

