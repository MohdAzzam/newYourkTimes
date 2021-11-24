import React from "react";
import { Routes ,Route } from 'react-router-dom';

import Home from "./screens/Home/home";
import Login from "./screens/login/login";
import Articles from "./screens/Articles/articles";
// import {useSelector} from "react-redux";
// import {selectUser} from "./store/userSlice";

export default function Main() {
    // const  user =useSelector(selectUser);
    return (
        <Routes>
            <Route path="/home" exact element={<Home/>}/>
            <Route path="/login" exact element={<Login/>}/>
            <Route path="/articles" exact element={<Articles/>}/>
        </Routes>
    );

}