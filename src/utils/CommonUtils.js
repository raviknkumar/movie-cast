import {loginConstants} from "./Constants";

export const randomString = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};


export const getUserName = () => {
    return localStorage.getItem(loginConstants.username);
};

export const getRoom = () => {
    return localStorage.getItem(loginConstants.room);
};

