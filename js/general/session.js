
const checkUser = (token) => {

    
    //Redirect if not true
    const url = `${apiRoute.apiOrigin}${apiRoute.checkSession}`;

    fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Accept": 'application/json',
            "Authorization": `${token}`
        }
    })
    .then(res => {
        console.log(res)
        if(res) {
            if(res.status !== 200){ 
                // localStorage.removeItem('@-sorosoke-webapp-token')
                // localStorage.removeItem('@-sorosoke-webapp-userData')
                // location.replace(`${window.location.origin}`);
            }
        }
    })
}

token ? checkUser(token) : location.replace(`${window.location.origin}`);

//Get the user info through object destructuring


