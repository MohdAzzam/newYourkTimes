import React from "react";

/***
 *
 *  404 Component that return if the user enter a wrong url
 * @returns {JSX.Element}
 * @constructor
 */
export default function NoMatch(){
    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-center ">
                <h2>404 Page Not Found</h2>
            </div>
            <a href="/" className="btn btn-dark d-flex justify-content-center mt-4">Back to Home</a>

        </div>
    )
}