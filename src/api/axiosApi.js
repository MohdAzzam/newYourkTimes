/**
 * Axios Api
 */

import axios from "axios";
import {APIKEY} from "../Constanat";
import dayjs from "dayjs";
import {authHelper} from "./helpers/AuthHelper";

/**
 *
 * To reduce redundant of typing api link
 * @type {AxiosInstance}
 */
let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pbHNvbkBlbWFpbC5jb20iLCJwYXNzd29yZCI6Im5pbHNvbiIsImlhdCI6MTYzNzc4Njk4NywiZXhwIjoxNjM3NzkwNTg3fQ.aPFjB07dLgf-D3te2J5u7LupScroChcAGRoxrVc7ono";
const instance = axios.create({
    baseURL: "https://api.nytimes.com/svc/",
    params: {
        "api-key":APIKEY,
    },
    // headers:{Authorization :`Bearer ${authToken}`}
});


/**
 * Request interceptors
 */
instance.interceptors.request.use(async config => {
    // get the token from redux and verify the time
    // const user = storage.get('user-info');
    // if (user && user['access_token']) {
    //     config.headers['Authorization'] = `Bearer ${user['access_token']}`
    // }
    //     config.headers['Authorization'] = `Bearer ${user['access_token']}`
    // const user ={
    //     email:"nilson@email.com",
    //     password:"nilson",
    //     exp:1637789976
    // }
    // const isExpired= dayjs.unix(user.exp).diff(dayjs()) < 1 ;
    // console.log("isExpired ",isExpired);
    // if(!isExpired) return config;
    //
    // const response = authHelper.login(user).then(response=>{
    //     console.log(response.data)
    //     localStorage.setItem('authToken',JSON.stringify(response.data))
    // }).catch(err=>{
    //     console.log(err)
    // })
    return config;

});

export default instance;