const uploadFileBtn = document.querySelector('[data-target-file-uploadbtn]');
const locationField = document.querySelector('[data-target-location]')
const descriptionField = document.querySelector('[data-target-description]')
const fileInfo = document.querySelector('[data-target-file-info]')


console.log(uploadFileBtn)


const uploadFileErrorHandling = (status, result) => {
    console.log(status, result)
    if (status !== 201) {
        alertify.set('notifier','position', 'top-right');
        alertify.error(`Upload Failed : ${result.info ? result.info : result.message}`);
        result.hint ? alertify.error(`Upload Failed : ${result.hint}`) : null
        return false;   
    }
}

const titleCase = (string) => {
    return string
      .split(' ')
      .map(word => word.substr(0,1).toUpperCase() + word.substr(1,word.length))
      .join(' ');
};

const validateFormInput = () => {

    alertify.set('notifier','position', 'top-right');

    if(!file) {
        alertify.error(`Upload Failed : A File is need to create a feed.`) 
        return false;
    }

    if(descriptionField.value === '') {
        alertify.error(`Upload Failed : Please write a brief information about the feed.`)
        return false;
    }

    return true;
}


const triggerCreateFeedApi = async (e) => {
    e.preventDefault()
    
    const validation = validateFormInput();//Validation of the input
    if(!validation) {return false;}


    uploadFileBtn.innerHTML = `<div class="spinner-grow" style="color: #fff;" role="status"></div>`;
    uploadFileBtn.disabled = true;

    let data = new FormData();
    data.append('location', titleCase(locationField.value));
    data.append('description', titleCase(descriptionField.value));
    data.append('file_url', file);

    console.log(`${apiOrigin}${apiVersion}${createFeed}`)

    try {

        const response = await fetch(`${apiOrigin}${apiVersion}${createFeed}`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: data
        });
        if (!response.ok) {
            uploadFileBtn.disabled = false;
            uploadFileBtn.innerHTML = `Upload`;
            status = response.status
        }

            const result = await response.json(); 

        if (result.success) {
            uploadFileBtn.disabled = false;
            uploadFileBtn.innerHTML = `Upload`;
            resetUpload(false)
            fileInfo.innerHTML = `<span>Your file is uploaded successfully!<span>`
            alertify.set('notifier','position', 'top-right');
            alertify.success(`Upload Successfully : Upload done successfully.`);
            return true;
        }

        uploadFileBtn.disabled = false;
        uploadFileBtn.innerHTML = `Upload`;
        
        uploadFileErrorHandling(status, result);

    } catch (error) {
        console.log(error)
        uploadFileBtn.disabled = false;
        uploadFileBtn.innerHTML = `Upload`;
        alertify.set('notifier','position', 'top-right');
        alertify.error(`Upload Failed: An error occured while authenticating account.`);
    }
}

uploadFileBtn.addEventListener('click', (e) => triggerCreateFeedApi(e))