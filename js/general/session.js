/*
Import Note: This script file should be use to hold data of the current user that is login 
*/
//Getting the user information form the browser localStorage
const onsessionUser = JSON.parse(localStorage.getItem('DevelopND-user'));
//Check if this user is real or else redirect to login
let validSession;
let certified = [];

let action = localStorage.getItem('action');

const checkUser = (token, user) => {
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
            if(res.status == 401 && action == 0){
                localStorage.clear();
                location.replace('../login.html');
            }else if (res.status == 401 && action == 1) {
                localStorage.clear();
                location.replace('../login.html');
            }else {
                certified.push(token);
                certified.push(user)

            }
        }
    })

}

if(onsessionUser){    
    let {token, user} = onsessionUser;
    checkUser(token, user);
}

//Get the user info through object destructuring


