

const {apiOrigin, apiVersion, createFeed} = apiRoute;
const status = null;

const uploadFileBtn = document.querySelector('[data-target-uploadbtn]');






const uploadFileErrorHandling = (status, result) => {
    console.log(status, result)

    if (status !== null) {
        alertify.set('notifier','position', 'top-center');
        alertify.error(`Authentication Failed : ${result.info}`);
        result.hint ? alertify.error(`Authentication Failed : ${result.hint}`) : null
        return false;   
    }
}



const triggerOrderRequestApi = async (e) => {
    e.preventDefault()
    
    const validation = validateFormInput();//Validation of the input
    if(!validation) {return false;}

    uploadFileBtn.innerHTML = `<div class="spinner-grow" style="color: #fff;" role="status"></div>
                                 <span style="color: #fff; font-weight: bold;">Loading...</span>`;
    uploadFileBtn.disabled = true;


    let data = new FormData();

    data.append('receiver_name',  titleCase(receiverNameRef.current.value));
    data.append('receiver_phone', titleCase(`${countryCodeRef.current.value}${receiverPhoneRef.current.value}`));
    data.append('receiver_photo', file);
    data.append('pick_up_address', titleCase(pickUpAddressRef.current.value));
    data.append('delivery_address', titleCase(deliveryAddressRef.current.value));

    try {
        const token = JSON.parse(localStorage.getItem("@-sorosoke-webapp-token"))

        const response = await fetch(`${apiOrigin}${apiVersion}${createFeed}`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            },
            body: data
        });
        if (!response.ok) {
            twitterLoginBtn.disabled = false;
            twitterLoginBtn.innerHTML = `Upload`;
            status = response.status
        }

            const result = await response.json(); 

        if (result.success) {
            twitterLoginBtn.disabled = false;
            twitterLoginBtn.innerHTML = `Upload`;
            return true;
        }
        
        uploadFileErrorHandling(status, result)
    } catch (error) {
        console.log(error)
        twitterLoginBtn.disabled = false;
        twitterLoginBtn.innerHTML = `Upload`;
    }
}