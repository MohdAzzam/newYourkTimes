import axios from "axios";
import jwt_decode from "jwt-decode";
import {errorMessage, login} from "../store/userSlice";
import {authHelper} from "../api/helpers/AuthHelper";
import {useDispatch} from "react-redux";
import {APIKEY} from "../Constanat";
import storage from "./storage";

/**
 *
 * Custom hook to call the api and regenrate the token and store it in redux then store it into local storage
 * @returns {AxiosInstance}
 */

export default function useAxios() {
    const dispatch = useDispatch();
    const user = storage.get("authUser");
    // instance from axios
    const axiosInstance = axios.create({
        baseURL: "https://api.nytimes.com/svc/",
        // there is an error from nytimes api if i send the token with the request so i comment this out
        // headers: {Authorization: `Bearer ${user.token}`},
        // the api key that nytimes need to access there api
        params: {
            "api-key": APIKEY,
        }
    })

    /**
     * this is the instance interceptors that we relay on to refresh the token every 15 minutes
     */
    axiosInstance.interceptors.request.use(async config => {
        // get the token from localstorage and verify the time
        const userData = jwt_decode(user?.token)
        let currentTimeStamp = new Date().getTime() / 1000;
        // check if token need less than 15 minutes to expire
        let timeDiff = userData.exp - currentTimeStamp;
        //then renew it
        let fiftyMinutes = 60 * 45;
        if (timeDiff <= fiftyMinutes && timeDiff > 0) {
            //call the login api to refresh the token
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
