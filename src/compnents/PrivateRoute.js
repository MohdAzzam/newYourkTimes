import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...props }) {
    const path = props.computedMatch.path;
    const user= localStorage.getItem("authUser");
    let userNotAllow = false;

    if (path !== "login" || path !== "register") {
        userNotAllow = true;
    }

    return (
        <Route
            {...props}
            render={(renderProps) =>
                !user && userNotAllow ? (
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