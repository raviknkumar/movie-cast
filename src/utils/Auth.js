
import {logoutUser} from "./../api/endpoints"

class Auth {
    constructor() {
      this.authenticated = false;
    }
  
    login(cb) {
      this.authenticated = true;
      cb();
    }
  
    logout(cb, socket) {
      this.authenticated = false;
      console.log("Socket Id ", socket.id);
      // logoutUser({'socketId': socket.id}).then(resp => {
      //   console.log("Response From Server ", resp);
      // }).catch(err => {
      //   console.log("Error in logging out");
      // })
      cb();
    }
  
    isAuthenticated() {
      return this.authenticated;
    }
    
  }
  
  export default new Auth();
  