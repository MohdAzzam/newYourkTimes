import React from "react";
import {Link} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";
import store from "./store/store";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "./store/userSlice";

export default function Header(){
    const state = store.getState();
    const user = localStorage.getItem("authUser")
    const dispatch=useDispatch();

    const handleLogout =()=>{
        dispatch(logout());
        window.reload();

    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand ><Link to="/home">NY</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {user?(<Link to="/home" className="nav-link">Home</Link>):[]}
                        {user?(<div to="#" className="nav-link" onClick={handleLogout}>Logout</div>):[]}
                        {!user?(<Link to="/login" className="nav-link">Login</Link>):[]}
                        {!user?(<Link to="/register" className="nav-link">Register</Link>):[]}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}