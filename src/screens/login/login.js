import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch} from "react-redux";
import {errorMessage, login} from "../../store/userSlice";
import {useHistory} from "react-router-dom";
import {authHelper} from "../../api/helpers/AuthHelper";

/**
 *
 * Login Screen
 * @returns {JSX.Element}
 * @constructor
 */
export default function Login() {

    const history = useHistory();
    const [loginError, setLoginError] = useState("");
    const dispatch = useDispatch();
    /**
     * Validate the schema
     */
    const validation = Yup.object().shape({
        email: Yup.string()
            .required(),
        password: Yup.string().required(),

    });

    /**
     * Export Form function
     */
    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        resolver: yupResolver(validation)
    });
    /**
     * On load register the from data
     */
    useEffect(() => {
        register('email');
        register('password');

    }, [register])

    /**
     * Call the login api
     * store the state in redux
     * redirect user to home page
     * @param form
     */
    const onSubmit = (form) => {
        authHelper.login(form).then(response => {
            dispatch(login({
                token: response.data.access_token,
                isLoggedIn: true
            }))
            history.push("/");

        }).catch(err => {
            /**
             * Set The Error into redux
             */
            setLoginError(err.response?.data.message);
            dispatch(errorMessage({
                error: err.response?.data.message
            }))
        })
    }

    return (
        <div className="container">

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter email"
                        onChange={(e) => setValue('email', e.target.value)}
                    />

                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => setValue('password', e.target.value)}
                        autoComplete="current-password"
                    />
                    {errors['email'] || errors['password'] ? (
                        <div className="d-flex  flex-column col-4 justify-content-center">
                            {errors['email'] ? (<label className="alert alert-danger mt-4 "
                                                       role="alert">{errors['email']?.message}</label>) : []}
                            {errors['password'] ? (<label className="alert alert-danger mt-4 "
                                                          role="alert">{errors['password']?.message}</label>) : []}
                        </div>
                    ) : []}
                    {loginError && loginError ? (
                        <div className="alert alert-danger mt-3">
                            {loginError}
                        </div>
                    ) : []}
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>

        </div>
    );
}