import {movieCastRequest} from './request';

export function logoutUser(params){
    return movieCastRequest({
        url: '/logout',
        method: 'get',
        params
      });
}