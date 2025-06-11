import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import Events from './components/Events';
import RoleRequests from './components/RoleRequests';
import Dashboard from './components/DashBoardUser/Dashboard';
import CreateEventPage from './components/create-events/Create-EvPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EditProfile from './components/Profile/EditProfile';
import ProfilePage from './components/Profile/ProfilePage';
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import Welcome from "./components/Welcome";
import Home from './components/HomePage/Home';




const App = () => {
    return (
        <Router>
            <Routes>
      <nav>
        <Link to="/DashBoardUser">DashBoard</Link> | <Link to="/events">Create Event</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/events" element={<CreateEventPage />} />
                <Route path="/" element={<SignUpForm />} />
                <Route path="/home" element={<Home />} />
                <Route path="/sign-up" element={<SignUpForm />} />
                <Route path="/sign-in" element={<SignInForm />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                   <Route path="/edit" element={<EditProfile />} />
         <Route path="/profile" element={<ProfilePage />} />

            </Routes>
        </Router>
    );
  


};
export default App;

if (document.getElementById("app")) {
    const root = ReactDOM.createRoot(document.getElementById("app"));

if (document.getElementById('app')) {
    const root = ReactDOM.createRoot(document.getElementById('app'));
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );

