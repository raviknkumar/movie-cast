import axios from 'axios';
import {ipConfig} from './ipConfig'

export const movieCastUrl = () => {
    return ipConfig.ip.movieCast.qa;
}

export const movieCastRequest = axios.create({
    baseURL: movieCastUrl(),
  });
