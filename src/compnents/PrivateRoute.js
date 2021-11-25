import React from "react";
import { Route, Redirect } from "react-router-dom";

import store from "../store/store";
import {useSelector} from "react-redux";
import {selectUser} from "../store/userSlice";
export default function PrivateRoute({ component: Component, ...props }) {
    const path = props.computedMatch.path;
    const state = store.getState();
    const user = useSelector(selectUser);
    const user1 = localStorage.getItem("authUser");
    let userNotAllow = false;

    if (path !== "login" || path !== "register") {
        userNotAllow = true;
    }

    return (
        <Route
            {...props}
            render={(renderProps) =>
                !user1 && userNotAllow ? (
                    <Redirect
                        to={{
                            pathname: "/login",
                        }}
                    />
                ) : (
                    <Component {...renderProps} />
                )
            }
        />
    );
}