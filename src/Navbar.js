// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ username, onLogout }) => {
    const handleLogout = async () => {
        await fetch('http://localhost:5000/logout', {
            method: 'POST',
            credentials: 'include'
        });
        onLogout();
    };

    return (
        <nav>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            {username && (
                <>
                    <Link to="/dashboard">Dashboard</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    );
};

export default Navbar;
