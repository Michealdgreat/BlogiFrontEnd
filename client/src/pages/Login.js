import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import API_BASE_URL from '../config';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/User/Login`, { email, password });
            const token = response.data; // Assuming the .NET API returns the JWT token directly
            if (!token || typeof token !== 'string') {
                setError('No token received from the server.');
                return;
            }
            const decoded = jwtDecode(token);
            if (!decoded || decoded.Role !== 'Admin') {
                setError('Only admins can access this page.');
                return;
            }
            localStorage.setItem('jwt', token);
            localStorage.setItem('userName', `${decoded.FirstName} ${decoded.LastName}`);
            navigate('/admin');
        } catch (err) {
            console.error('Login error:', err);
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Response data:', err.response.data);
                console.error('Response status:', err.response.status);
                setError(`Login failed: ${err.response.status} - ${err.response.data.message || 'Invalid email or password.'}`);
            } else if (err.request) {
                // The request was made but no response was received
                console.error('No response received:', err.request);
                setError('No response from the server. Is the .NET API running on http://localhost:5115?');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', err.message);
                setError(`Error: ${err.message}`);
            }
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Admin Login</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;