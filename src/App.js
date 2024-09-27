// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

const App = () => {
    const [username, setUsername] = useState(null);

    // Load the username from localStorage on component mount
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogin = (username) => {
        setUsername(username);
        localStorage.setItem('username', username); // Store username in localStorage
    };

    const handleLogout = () => {
        setUsername(null);
        localStorage.removeItem('username'); // Remove username from localStorage
    };

    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                {!username && <Link to="/login">Login</Link>}
                {!username && <Link to="/register">Register</Link>}
                {username && <Link to="/dashboard">Dashboard</Link>}
                {username && <button onClick={handleLogout}>Logout</button>}
            </nav>
            <Routes>
                <Route path="/" element={<h1>Welcome to the App</h1>} />
                <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={username ? <Dashboard username={username} onLogout={handleLogout} /> : <Login onLoginSuccess={handleLogin} />} />
            </Routes>
        </Router>
    );
};

export default App;
