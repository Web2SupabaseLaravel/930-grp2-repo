import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/home");
        }
    }, [navigate]);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate("/home");
    };

    return (
       <div style={{
            textAlign: "center",
            backgroundColor: "#f0f0f0",
            minHeight: "100vh",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <h1 style={{ color: "#333" }}>Hello</h1>
            <p style={{ color: "#666" }}>Welcome to Evento</p>
            <button
                onClick={handleSignOut}
                style={{
                    background: "#7d4f73",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    cursor: "pointer",
                    marginTop: "20px",
                    borderRadius: "5px",
                    fontSize: "16px"
                }}
            >
                Logout
            </button>
        </div>
    );
}

export default Welcome;
