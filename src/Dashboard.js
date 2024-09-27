// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ username, onLogout }) => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await axios.get('http://localhost:5000/dashboard', { withCredentials: true });
                setMessage(response.data.message);
            } catch (error) {
                setMessage(error.response?.data?.message || 'Failed to load dashboard');
            }
        };

        fetchDashboard();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
            onLogout(); // Clear session on logout
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <p>{message}</p>
            <p>Welcome, {username}!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
