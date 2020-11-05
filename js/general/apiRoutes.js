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

    roomMessages(roomType, roomName, page, toId = null) {
        switch (roomType) {
            case 'public':
                return `public/room/messages/${roomName}/${page}`
            case 'state':
                return `state/room/messages/${roomName}/${page}`
            case 'friend':
                return `friend/room/messages/${roomName}/${toId}/${page}`
            case 'personal':
                return `personal/room/messages/${roomName}/${page}`
        }
    }

    createChat(roomType, toId =null) {
        switch (roomType) {
            case 'public':
                return "public/room/chat"
            case 'state':
                return "state/room/chat"
            case 'friend':
                return `friend/room/chat/${toId}`
            case 'personal':
                return "personal/room/chat"
        }
    }

    joinRoomTracker(roomName) {
        return `room/count/${roomName}`
    }

    get createPersonalRoom() {
        return 'personal/create-room'
    }
}
  
  