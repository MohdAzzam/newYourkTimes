import React from "react";
import {
    Switch,
    Route,
} from 'react-router-dom';

import Home from "./screens/Home/home";
import Login from "./screens/login/login";
import Articles from "./screens/Articles/articles";
import Register from "./screens/register/register";
import PrivateRoute from "./compnents/PrivateRoute";
// import {useSelector} from "react-redux";
// import {selectUser} from "./store/userSlice";

export default function Main() {
    // const  user =useSelector(selectUser);
    return (
        <Switch>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <PrivateRoute path="/articles" exact component={Articles}/>
            <PrivateRoute path="/home" exact component={Home}/>

        </Switch>
    );

}