
const checkUser = (token) => {
    //Redirect if not true
    const routes = new Routes();
    const url = `${routes.apiOrigin}${routes.checkSession}`;

    fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Authorization": `${token}`
        }
    })
    .then(res => {
        if(res) {
            if(res.status == 401){
                localStorage.clear();
                location.replace(`${window.location.origin}`);
            }
        }
    })
}

const token = localStorage.getItem('@-sorosoke-webapp-token') ? JSON.parse(localStorage.getItem('@-sorosoke-webapp-token'))
              : null;

token ? checkUser(token) : location.replace(`${window.location.origin}`);

//Get the user info through object destructuring


