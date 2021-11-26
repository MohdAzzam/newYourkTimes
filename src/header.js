import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "./store/userSlice";
import storage from "./util/storage";

export default function Header() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const state = useSelector(selectUser);

    useEffect(() => {

      setIsLoggedIn(storage.get("authUser"));
    }, [storage,state])

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        window.location.reload();

    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Link className="navbar-brand" to="/home">NY</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {isLoggedIn ? (
                            <>
                                <Link to="/home" className="nav-link">Home</Link>
                                <div to="#" className="nav-link" onClick={handleLogout}>Logout</div>

                            </>
                        ) : (
                            <>
                                <Link to="/login" className="nav-link">Login</Link>
                                <Link to="/register" className="nav-link">Register</Link>
                            </>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}