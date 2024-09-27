import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password }, { withCredentials: true });
            console.log('Response:', response); // Debugging line
            setMessage(response.data.message);
            
            if (response.status === 200 && response.data.user) { // Check if user exists
                console.log('Login successful, navigating to dashboard'); // Debugging line
                onLoginSuccess(username); // Pass the username to the App component
                navigate('/dashboard'); // Correct path to navigate
            } else {
                console.log('Login failed, no user data in response');
            }
        } catch (error) {
            console.error('Login error:', error); // Debugging line
            setMessage(error.response?.data?.message || 'Login failed');
        }
    };
    

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
