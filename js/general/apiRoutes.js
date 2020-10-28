/*
Import Note: The base_url.js hold every every third party base url origin and api's path for the application to work
    for example: the api origin or any api origin
    this url can been use in the application as a variable
*/
//const api_origin = 'http://127.0.0.1:8200/';
//const api_origin = 'https://api-sorosoke.herokuapp.com/';

class Routes {

    get socketConnection() {
        return io('http://127.0.0.1:8200');
    }

    get apiOrigin() {
      return 'http://127.0.0.1:8200/';
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
}
  
  