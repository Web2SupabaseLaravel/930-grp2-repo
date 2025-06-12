import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Forms.css";

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
      const passwordRegex = /^.{8,}$/;
    return passwordRegex.test(password);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess("");

        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        }
        if (!validateEmail(formData.email)) {
            newErrors.email = "Invalid email address";
        }
        if (!validatePassword(formData.password)) {
            newErrors.password = "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/register", {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.confirmPassword,
            });

            setSuccess("Account created successfully!");
            localStorage.setItem("token", response.data.token);
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            navigate("/home");
        } catch (err) {
            setErrors({ api: err.response?.data?.error || "Registration failed. Please try again." });
        }
    };

    const handleGoogleSignIn = () => {
        console.log("Google sign-in clicked");
    };

    const handleSignInRedirect = () => {
        navigate("/sign-in");
    };

    return (
        <div className="containerr">
            <div className="left-section">
                 <img
        src="/images/Hello.png"
        alt="Sign up"

    />
            </div>
            <div className="right-section">
                <div className="form-container">
                    <h1 className="form-title">Create a New Account</h1>
                    {errors.api && <div className="error-message">{errors.api}</div>}
                    {success && <div className="success-message">{success}</div>}
                    <div className="form-wrapper">
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="form-input"
                                required
                            />
                            {errors.name && <div className="error-message">{errors.name}</div>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="example@gmail.com"
                                className="form-input"
                                required
                            />
                            {errors.email && <div className="error-message">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="form-input"
                                required
                            />
                            {errors.password && <div className="error-message">{errors.password}</div>}
                        </div>
                        <div className="form-group">
                            <label className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="form-input"
                                required
                            />
                            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="signup-btn"
                        >
                            Create Account
                        </button>
                    </div>
                    <div className="divider">
                        <span>or</span>
                    </div>
                    <button onClick={handleGoogleSignIn} className="google-btn">
                        <div className="google-icon"></div>
                        Continue with Google
                    </button>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <span style={{ fontSize: "14px", color: "#666" }}>
                            Already have an account?{" "}
                            <button
                                onClick={handleSignInRedirect}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#7d4f73",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                }}
                            >
                                Sign In
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
