// import axiosApi from "../axiosApi";
//
// export const TopStoriesHelper={
//     list:(section)=>{
//         return axiosApi.get(`topstories/v2/${section}.json`);
//     },
//     search:(query,page=0)=>{
//         //&page=0 send it from pagination
//         return axiosApi.get(`search/v2/articlesearch.json?q=${query}&page=${page}`)
//     },
//     comments:(url)=>{
//
//         return axiosApi.get(`community/v3/user-content/url.json`,{
//             params:{
//                 offset:0,
//                 url:encodeURI(url)
//             }
//         });
//     }
//
// }