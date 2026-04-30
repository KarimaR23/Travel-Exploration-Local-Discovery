import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://10.0.0.216:8080";

function Login() {
    const [formData, setFormData] = useState({
        usernameOrEmail: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
                usernameOrEmail: formData.usernameOrEmail,
                password: formData.password
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("creatorId", response.data.id);

            setMessage(
                `Login successful! Welcome, ${response.data.username}. Your Creator ID is ${response.data.id}.`
            );
        } catch (err) {
            console.error("LOGIN ERROR:", err.response?.status, err.response?.data || err.message);

            if (!err.response) {
                setError("Backend is not connected. Make sure Spring Boot is running.");
            } else if (err.response.status === 401) {
                setError("Invalid username/email or password.");
            } else {
                setError(`Login failed: ${err.response.data || err.message}`);
            }
        }
    };

    return (
        <div className="page form-page">
            <h2>Login</h2>

            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="usernameOrEmail">Username or Email:</label>
                    <input
                        type="text"
                        id="usernameOrEmail"
                        name="usernameOrEmail"
                        value={formData.usernameOrEmail}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn">
                    Login
                </button>
            </form>

            {message && <p className="response">{message}</p>}
            {error && <p className="response error">{error}</p>}
        </div>
    );
}

export default Login;