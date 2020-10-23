
const apiRoute = new Routes;

const {
        apiOrigin, apiVersion, 
        createFeed, fetchFeeds, checkSession
    } = apiRoute;

const token = localStorage.getItem('@-sorosoke-webapp-token') ? JSON.parse(localStorage.getItem('@-sorosoke-webapp-token')): null;

let status = null; //This handles the status code from the api result

let page = 1; //This handles the pagination page for API.