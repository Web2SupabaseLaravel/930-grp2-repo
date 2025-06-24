import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Forms.css"; 

const SignInForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
        if (!validateEmail(formData.email)) {
            newErrors.email = "Invalid email address";
        }
        if (!validatePassword(formData.password)) {
            newErrors.password =
                "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8000/api/login",
                {
                    email: formData.email,
                    password: formData.password,
                }
            );

            setSuccess("Signed in successfully!");
            localStorage.setItem("token", response.data.token);
            setFormData({ email: "", password: "" });
            navigate("/welcome");
        } catch (err) {
            setErrors({
                api:
                    err.response?.data?.error ||
                    "Sign-in failed. Please try again.",
            });
        }
    };

    const handleGoogleSignIn = () => {
        console.log("Google sign-in clicked");
    };

    const handleForgotPassword = () => {
        console.log("Forgot password clicked");
    };

    const handleCreateAccount = () => {
        navigate("/sign-up");
    };

    return (
        <div className="containerr">
            <div className="left-section">
                {" "}
                <img src="/images/Hello.png" alt="Sign in" />
            </div>
            <div className="right-section">
                <div className="form-container">
                    <h1 className="form-title">Sign in to your account</h1>
                    {errors.api && (
                        <div className="error-message">{errors.api}</div>
                    )}
                    {success && (
                        <div className="success-message">{success}</div>
                    )}
                    <div className="form-wrapper">
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
                            {errors.email && (
                                <div className="error-message">
                                    {errors.email}
                                </div>
                            )}
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
                            {errors.password && (
                                <div className="error-message">
                                    {errors.password}
                                </div>
                            )}
                            <div
                                style={{ textAlign: "right", marginTop: "8px" }}
                            >
                                <button
                                    onClick={handleForgotPassword}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "#7d4f73",
                                        cursor: "pointer",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                    }}
                                >
                                    Forgot your password?
                                </button>
                            </div>
                        </div>
                        <button onClick={handleSubmit} className="signup-btn">
                            Sign In
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
                            Don't have an account?{" "}
                            <button
                                onClick={handleCreateAccount}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#7d4f73",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                }}
                            >
                                Create one now
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
