import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import store from "../store/store";
import {useSelector} from "react-redux";
import {login, selectUser} from "../store/userSlice";
import {authHelper} from "../api/helpers/AuthHelper";
import {useDispatch} from "react-redux";
import {APIKEY} from "../Constanat";
const axiosInstance = axios.create({
    baseURL: "https://api.nytimes.com/svc/",
    // headers:{Authorization :`Bearer ${user.token}`}
    params: {
        "api-key":APIKEY,
    },
})
export default function useAxios(){

    const state = store.getState();
    const user = useSelector(selectUser);
    const dispatch=useDispatch();

    /**
     * Request interceptors
     */
    axiosInstance.interceptors.request.use(async config => {
        // get the token from redux and verify the time
        const userData =jwt_decode(user?.token)
        const isExpired= dayjs.unix(userData.exp).diff(dayjs()) < 1 ;
        // console.log("isExpired ",isExpired);
        if(!isExpired) return config;
        //
        const response = authHelper.login(user).then(response=>{
            // console.log(response.data)
            localStorage.setItem('authToken',JSON.stringify(response.data))
            dispatch(login({
                token:response.data.access_token,
            }))
        }).catch(err=>{
            console.log(err)
        })
        return config;

    });
    return axiosInstance;
}

export const TopStoriesHelper={
    list:(section)=>{
        return axiosInstance.get(`topstories/v2/${section}.json`);
    },
    search:(query,page=0)=>{
        //&page=0 send it from pagination
        return axiosInstance.get(`search/v2/articlesearch.json?q=${query}&page=${page}`)
    },
    comments:(url)=>{

        return axiosInstance.get(`community/v3/user-content/url.json`,{
            params:{
                offset:0,
                url:encodeURI(url)
            }
        });
    }

}
