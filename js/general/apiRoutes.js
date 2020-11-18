/*
Import Note: The base_url.js hold every every third party base url origin and api's path for the application to work
    for example: the api origin or any api origin
    this url can been use in the application as a variable
*/
//const api_origin = 'http://127.0.0.1:8200/';
//const api_origin = 'https://api-sorosoke.herokuapp.com/';

class Routes {

    get socketConnection() {
        return io('https://api-sorosoke.herokuapp.com/');
    }

    get apiOrigin() {
      return 'https://api-sorosoke.herokuapp.com/';
    }

    get apiVersion() {
        return "api/v1/"
    }
    
    get checkSession() {
      return "api/v1/check/session"
    }

    get twitterLogin() {
        return "twitter/auth/url"
    }
    
    twitterCallback(oauthToken, oauthVerifier) {
        return `twitter/auth/callback?oauthToken=${oauthToken}&oauthVerifier=${oauthVerifier}`
    }

    get createFeed() {
        return "create/feed"
    }
    
    fetchFeeds(page) {
        return `feeds/${page}`
    }

    roomChatMessages(roomType, roomName, page, toId = null) {
        switch (roomType) {
            case 'public':
                return `public/room/chat/messages/${roomName}/${page}`
            case 'state':
                return `state/room/chat/messages/${roomName}/${page}`
            case 'friend':
                return `friend/room/chat/messages/${toId}/${page}`
            case 'personal':
                return `personal/room/chat/messages/${roomName}/${page}`
        }
    }

    createChat(roomType, toId =null) {
        switch (roomType) {
            case 'public':
                return "public/room/chat"
            case 'state':
                return "state/room/chat"
            case 'friend':
                return `friend/room/chat`
            case 'personal':
                return "personal/room/chat"
        }
    }

    joinRoomTracker(roomName) {
        return `room/count/${roomName}`
    }

    get createPersonalRoom() {
        return 'create-room'
    }

    fetchCreatedPersonalRooms(page) {
        return `fetch/created-rooms/${page}`
    }

    fetchJoinedPersonalRoom(page) {
        return `fetch/joined-rooms/${page}`
    }

    joinPersonalRoom(page, roomCreatorId) {
        return `join-room/${roomCreatorId}`
    }

    fetchYourFriends(page) {
        return `fetch/your-friends/${page}`
    }

    searchYourFriend(query, page) {
        return `search/your-friends/${query}/${page}`
    }

    addFriend(friendId) {
        return `add/friend/${friendId}`
    }


}
  
  