
const apiRoute = new Routes;

const {
        apiOrigin, apiVersion, 
        createFeed, fetchFeeds, checkSession, 
        createChat, roomChatMessages, joinRoomTracker,
        createPersonalRoom, fetchCreatedPersonalRooms, 
        fetchJoinedPersonalRoom, fetchYourFriends,
        searchYourFriend, addFriend
    } = apiRoute;

const token = localStorage.getItem('@-sorosoke-webapp-token') ? JSON.parse(localStorage.getItem('@-sorosoke-webapp-token')): null;

const currentUser = localStorage.getItem('@-sorosoke-webapp-userData') ? JSON.parse(localStorage.getItem('@-sorosoke-webapp-userData')): null;


let status = null; //This handles the status code from the api result

let page = 1; //This handles the pagination page for API.

let roomIdHolder =  JSON.parse(localStorage.getItem('@_SOROSOKE_UNIQUE_HOLDER'))

let newRoomfriends = [] //Array to hold new friends that will join a room




const titleCase = (string) => {
    return string
      .split(' ')
      .map(word => word.substr(0,1).toUpperCase() + word.substr(1,word.length))
      .join(' ');
};
