import {createSlice} from '@reduxjs/toolkit'
import storage from "../util/storage";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        searchData:[]
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;

        },
        logout: (state) => {
            state.user = null;
        },
        searchQuery : (state , action)=>{
           // const found =state.searchData.find(ele=>ele===action.payload);
           //  const test= (state.searchData.indexOf(`${action.payload.query}`) > -1);
           //  console.log(action.payload.query);
           //  console.log(test + 'azzam');
               if(state.searchData.length<5){
                   state.searchData.push(action.payload);
               }else{
                   state.searchData.pop();
                   state.searchData.unshift(action.payload);
               }
           }
    }
})
/**
 * Get user from local stroage
 *
 * @returns {Object|Boolean}
 */
function getUser() {
    const user = storage.get('user-info');
    if (!user) return false;
    return user;
}

export const {login, logout,searchQuery} = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
