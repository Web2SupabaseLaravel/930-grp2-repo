import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Welcome() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/home");
        }
    }, [navigate]);

    const handleGoHome = () => {
        navigate("/home");
    };

    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #68263D, #68263D)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px",
                fontFamily: "'Poppins', sans-serif",
                color: "#fff",
                textAlign: "center",
                position: "relative",
                overflow: "hidden"
            }}
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{
                    position: "absolute",
                    top: "-100px",
                    right: "-100px",
                    width: "250px",
                    height: "250px",
                    background: "#fff2",
                    borderRadius: "50%",
                    zIndex: 0
                }}
            />

            <motion.img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="avatar"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    border: "4px solid white",
                    marginBottom: "20px",
                    zIndex: 1
                }}
            />

            <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                style={{ fontSize: "2.5rem", marginBottom: "10px", zIndex: 1 }}
            >
                 Welcome Back! 🎉
            </motion.h1>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                style={{ fontSize: "1.1rem", marginBottom: "30px", maxWidth: "400px", zIndex: 1 }}
            >
                We're glad to have you here, Ready to explore Evento?
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                style={{ zIndex: 1 }}
            >
                <button
                    onClick={handleGoHome}
                    style={{
                        backgroundColor: "#fff",
                        color: "#68263D",
                        border: "none",
                        padding: "12px 28px",
                        borderRadius: "30px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        marginRight: "10px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                    }}
                >
                    Enter Evento 🚀
                </button>

                <button
                    onClick={handleSignOut}
                    style={{
                        backgroundColor: "transparent",
                        color: "#fff",
                        border: "2px solid #fff",
                        padding: "10px 24px",
                        borderRadius: "30px",
                        fontSize: "14px",
                        cursor: "pointer",
                        marginTop: "10px"
                    }}
                >
                    Sign Out
                </button>
            </motion.div>
        </motion.div>
    );
}

export default Welcome;
