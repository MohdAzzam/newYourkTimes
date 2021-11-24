import React, {useEffect} from "react";
import {Container} from "react-bootstrap";
import {useForm} from "react-hook-form";
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useDispatch} from "react-redux";
import {login, logout} from "../../store/userSlice";
import {authHelper} from "../../api/helpers/AuthHelper";

export default function Login() {
    const validation = Yup.object().shape({
        email: Yup.string()
            .required(),
        password: Yup.string().required(),

    });

    /**
     * Export Form function
     */
    const {setError, register, handleSubmit, setValue, formState: {errors}} = useForm({
        resolver: yupResolver(validation)
    });
    /**
     * On load register the from data
     */
    useEffect(() => {
        register('email');
        register('password');

    }, [])

    const dispatch = useDispatch();
    const onSubmit = (form) => {
        authHelper.login(form).then(response=>{
            dispatch(login({
                token:response.data.access_token,
            }))
            // const token=jwt_decode(response.data.access_token);


        }).catch(err=>{
            console.log(err)
        })
    }
    const handleLogout = ()=>{
        dispatch(logout)
    }
    return (
        <Container className="mt-4">

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
                            {errors['email']?( <label className="alert alert-danger mt-4 " role="alert">{errors['email']?.message}</label>):[]}
                            {errors['password']?( <label className="alert alert-danger mt-4 " role="alert">{errors['password']?.message}</label>):[]}
                        </div>
                            ):[]}

                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </Container>
    );
}