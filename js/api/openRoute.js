
const apiRoute = new Routes;

const {
        apiOrigin, apiVersion, 
        createFeed, fetchFeeds
    } = apiRoute;

const token = JSON.parse(localStorage.getItem("@-sorosoke-webapp-token"))

let status = null; //This handles the status code from the api result

let page = 1; //This handles the pagination page for API.