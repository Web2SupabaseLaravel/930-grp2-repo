import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Dashboard from './components/DashBoardUser/Dashboard';
import CreateEventPage from './components/create-events/Create-EvPage';
import EditProfile from './components/Profile/EditProfile';
import ProfilePage from './components/Profile/ProfilePage';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Welcome from './components/Welcome';
import Home from './components/HomePage/Home';

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/DashBoardUser">DashBoard</Link> | <Link to="/events">Create Event</Link>
      </nav>
      <Routes>
        <Route path="/DashBoardUser" element={<Dashboard />} />
        <Route path="/events" element={<CreateEventPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/edit" element={<EditProfile />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<Navigate to="/sign-up" replace />} />
        <Route path="*" element={<Navigate to="/sign-up" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

let root = null;
if (document.getElementById('app')) {
  root = root || ReactDOM.createRoot(document.getElementById('app'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
