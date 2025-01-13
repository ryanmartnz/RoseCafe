import React, { useState, useEffect } from "react";
import { Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Bag } from 'phosphor-react';

import './Navbar.css';

const Navbar = ({ setAuth, numInCart }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const isAuth = async () => {
        try {
        const response = await fetch("https://api.rosecafe.tech/auth/is-verify", {
            method: "GET",
            credentials: "include"
        });
        const parseRes = await response.json();
        parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
        } catch(err) {
        console.error(err.message);
        }
    };

    const logout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://api.rosecafe.tech/dashboard/logout", {
                method: "GET",
                credentials: "include"
            });
            await response.json();
            setAuth(false);
            setIsAuthenticated(false);
        } catch(err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        isAuth();
    });

    return (
        <NavbarBs className="bg-white mb-3 gutter-padding ">
            <Nav className="me-auto" style={{alignItems: "center"}}>
                <img className="navbar-logo" alt="" src="../../rosecafe-removebg-preview.png"/>
                <Nav.Link className="navbar-link" to="/" as={NavLink}>Home</Nav.Link>
                <Nav.Link className="navbar-link" to="/menu" as={NavLink}>Menu</Nav.Link>
                <Nav.Link className="navbar-link" to="/about" as={NavLink}>About</Nav.Link>
            </Nav>
            { !isAuthenticated && (
                <Nav>
                    <Nav.Link className="nav-btn nav-btn-pink" to="/login" as={NavLink} style={{ marginRight: "16px"}}>Log in</Nav.Link>
                    <Nav.Link className="nav-btn nav-btn-default" to="/register" as={NavLink}>Sign up</Nav.Link>
                </Nav>
            )}
            { isAuthenticated && (
                <Nav style={{alignItems: "center"}}>
                    <Nav.Link to="/cart" as={NavLink} style={{ position: "relative" }} className="rounded-circle">
                        <Bag size={28}></Bag>
                        <div 
                            className="rounded-circle bg-danger d-flex justify-content-center align-items-center" 
                            id="amount-in-bag"
                            style={{
                                color: "white",
                                width: "1.25rem",
                                height: "1.25rem",
                                position: "absolute",
                                bottom: 0,
                                right: 0
                            }}
                        >{numInCart}</div>
                    </Nav.Link>
                    <Nav.Link to="/dashboard" as={NavLink}>Dashboard</Nav.Link>
                    <Nav.Link to="/home" onClick={logout}>Logout</Nav.Link>
                </Nav>
            )}
        </NavbarBs>
    );
};

export default Navbar;