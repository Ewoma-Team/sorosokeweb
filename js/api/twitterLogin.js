
const apiRoute = new Routes;

const {apiOrigin, apiVersion, twitterLogin} = apiRoute;


const twitterLoginBtn = document.querySelector('[data-twitter-login]');

const loginErrorHandling = (status, result) => {
    console.log(status, result)
    if (status !== 200) {
        alertify.set('notifier','position', 'top-center');
        alertify.error(`Authentication Failed : ${result.message}`);
        result.hint ? alertify.error(`Authentication Failed : ${result.hint}`) : null
        return false;   
    }
}

const twitterLoginApi = async (e) => {
    e.preventDefault()

    const status = null;
    
    twitterLoginBtn.innerHTML = `
        <div class="spinner-grow" style="color: #fff;" role="status"></div>
        <span style="color: #fff; font-weight: bold;">Loading...</span>
    `

    try {
        const response = await fetch(`${apiOrigin}${apiVersion}${twitterLogin}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });

        if (!response.ok) {
            console.log(response.status)
            status = response.status
        }

        const result = await response.json();
        loginErrorHandling(status, result)
        console.log(result)
        if (result.success) {
            console.log(result)
        }

    } catch (error) {
        return false;  
    }

}


twitterLoginBtn.addEventListener('click', (e) => twitterLoginApi(e))