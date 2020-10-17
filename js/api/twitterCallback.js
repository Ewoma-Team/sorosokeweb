
const apiRoute = new Routes;

const {apiOrigin, apiVersion} = apiRoute;

const dataAuthInfo = document.querySelector('[data-auth-info]');

const status = null;

//Get the Query String 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const oauthToken = urlParams.get('oauth_token');
const oauthVerifier = urlParams.get('oauth_verifier')


const callBackErrorHandling = (status, result) => {
    console.log(status, result)

    if (status !== null) {
        alertify.set('notifier','position', 'top-center');
        alertify.error(`Authentication Failed : ${result.info}`);
        result.hint ? alertify.error(`Authentication Failed : ${result.hint}`) : null
        return false;   
    }
}

const twitterCalbackApi = async () => {

    try {
        const response = await fetch(`${apiOrigin}${apiVersion}${apiRoute.twitterCallback(oauthToken, oauthVerifier)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });

        if (!response.ok) {
            dataAuthInfo.innerHTML = `An Error has Occurred while processing authentication, Please go back to login, refrsh and try again or contact support.`;
            console.log(response.status)
            status = response.status
        }

        const result = await response.json();
        console.log(result)

        callBackErrorHandling(status, result)

        if (result.success) {
            console.log(result)

            localStorage.setItem('@-sorosoke-webapp-token', JSON.stringify(result.userData.userInsert.token.token))
            localStorage.setItem('@-sorosoke-webapp-userData', JSON.stringify(result.userData.userInsert))

            //Close the auth popup
            window.close();
            window.opener.location=`${window.location.origin}/feeds.html`;
        }

    } catch (error) {
        dataAuthInfo.innerHTML.innerHTML = `An Error has Occurred while authenticating with twitter, Please go back to login, refrsh and try again or contact support.`;
        return false;  
    }

}


twitterCalbackApi()