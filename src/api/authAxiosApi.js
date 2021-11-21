/**
 * Axios Api
 */

import axios from "axios";

/**
 *
 * To reduce redundant of typing api link
 * @type {AxiosInstance}
 */
const instance = axios.create({
    baseURL: "http://localhost:8000/auth/",
    params: {}
});


export default instance;