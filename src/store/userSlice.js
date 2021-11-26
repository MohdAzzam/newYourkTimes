import {createSlice} from '@reduxjs/toolkit'
import storage from "../util/storage";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        searchData: [],
        errorMessage: null
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            storage.set("authUser", state.user)

        },
        logout: (state) => {
            state.user = null;
            storage.remove("authUser");
        },
        searchQuery: (state, action) => {
            const userSearchStorage = storage.get("lastFive");
            if (userSearchStorage) {

                const found = userSearchStorage.find(element => element.query === action.payload.query);
                if (!found) {
                    if(state.searchData.length ===0 && userSearchStorage){
                        state.searchData.push(...userSearchStorage);
                    }
                    if (state.searchData.length < 5) {
                        state.searchData.push(action.payload);

                    } else {
                        state.searchData.pop();
                        state.searchData.unshift(action.payload);
                    }
                    storage.set("lastFive", state.searchData);

                }

            }else{
                state.searchData.push(action.payload);
                storage.set("lastFive", state.searchData);
            }
        },
        errorMessage: (state, action) => {
            state.errorMessage = action.payload;
        }
    }
})
// /**
//  * Get user from local stroage
//  *
//  * @returns {Object|Boolean}
//  */
// function getUser() {
//     const user = storage.get('user-info');
//     if (!user) return false;
//     return user;
// }

export const {login, logout, searchQuery, errorMessage} = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
