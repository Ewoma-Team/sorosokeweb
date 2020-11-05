
const apiRoute = new Routes;

const {
        apiOrigin, apiVersion, 
        createFeed, fetchFeeds, checkSession, 
        createChat, roomMessages, joinRoomTracker,
        createPersonalRoom
    } = apiRoute;

const token = localStorage.getItem('@-sorosoke-webapp-token') ? JSON.parse(localStorage.getItem('@-sorosoke-webapp-token')): null;

const currentUser = localStorage.getItem('@-sorosoke-webapp-userData') ? JSON.parse(localStorage.getItem('@-sorosoke-webapp-userData')): null;


let status = null; //This handles the status code from the api result

let page = 1; //This handles the pagination page for API.


const titleCase = (string) => {
    return string
      .split(' ')
      .map(word => word.substr(0,1).toUpperCase() + word.substr(1,word.length))
      .join(' ');
};
