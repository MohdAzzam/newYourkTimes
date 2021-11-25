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
    },
    // headers:{Authorization :`Bearer ${authToken}`}
});




export default instance;