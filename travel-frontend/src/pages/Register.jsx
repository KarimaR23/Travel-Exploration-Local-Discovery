import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://10.0.0.216:8080";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
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
            await axios.post(`${API_BASE_URL}/api/auth/register`, formData);

            setMessage("Account created successfully!");
        } catch (err) {
            console.error(err);

            if (err.response?.status === 400) {
                setError("Invalid input. Check all fields.");
            } else if (err.response?.status === 409) {
                setError("Username or email already exists.");
            } else {
                setError("Registration failed.");
            }
        }
    };

    return (
        <div className="page form-page">
            <h2>Create Account</h2>

            <form onSubmit={handleSubmit} className="form">

                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
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
                    Create Account
                </button>
            </form>

            {message && <p className="response">{message}</p>}
            {error && <p className="response error">{error}</p>}
        </div>
    );
}

export default Register;