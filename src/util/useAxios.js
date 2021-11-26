import axios from "axios";
import jwt_decode from "jwt-decode";
import {errorMessage, login} from "../store/userSlice";
import {authHelper} from "../api/helpers/AuthHelper";
import {useDispatch} from "react-redux";
import {APIKEY} from "../Constanat";
import storage from "./storage";


export default function useAxios() {
    const dispatch = useDispatch();
    const user = storage.get("authUser");

    const axiosInstance = axios.create({
        baseURL: "https://api.nytimes.com/svc/",
        // headers: {Authorization: `Bearer ${user.token}`},
        params: {
            "api-key": APIKEY,
        }
    })


    axiosInstance.interceptors.request.use(async config => {
        // get the token from localstorage and verify the time
        const userData = jwt_decode(user?.token)
        let currentTimeStamp = new Date().getTime() / 1000;
        // check if token need less than 15 minutes to expire
        let timeDiff = userData.exp - currentTimeStamp;
        //then renew it
        let fiftyMinutes = 60 * 45;
        if (timeDiff <= fiftyMinutes && timeDiff > 0) {
            authHelper.login(userData).then(response => {
                storage.set('authUser', response.data, true)
                dispatch(login({
                    token: response.data.access_token,
                }))
                storage.set("authUser", response.data.access_token, true)
                // config.headers.authorization=`Bearer ${response.data.access_token}`;
                return config;
            }).catch(err => {
                dispatch(errorMessage({
                    error: err
                }))
            })
        }
        return config;


    });
    return axiosInstance;
}

// export const TopStoriesHelper = {
//     list: (section) => {
//         return axiosInstance.get(`topstories/v2/${section}.json`);
//     },
//     search: (query, page = 0) => {
//         //&page=0 send it from pagination
//         return axiosInstance.get(`search/v2/articlesearch.json?q=${query}&page=${page}`)
//     },
//     comments: (url) => {
//
//         return axiosInstance.get(`community/v3/user-content/url.json`, {
//             params: {
//                 offset: 0,
//                 url: encodeURI(url)
//             }
//         });
//     }
//
// }
