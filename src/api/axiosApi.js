/**
 * Axios Api
 */

import axios from "axios";
import {APIKEY} from "../Constanat";

/**
 *
 * To reduce redundant of typing api link
 * @type {AxiosInstance}
 */
const instance = axios.create({
    baseURL: "https://api.nytimes.com/svc/",
    params: {
        "api-key":APIKEY,
    }
});


/**
 * Request interceptors
 */
instance.interceptors.request.use(async config => {
    // get the token from redux and verify the time

    return config;

});

export default instance;