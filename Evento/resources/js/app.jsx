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

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">DashBoard</Link> | <Link to="/events">Create Event</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/events" element={<CreateEventPage />} />
      </Routes>
    </Router>
  );
};

if (document.getElementById('app')) {
  const root = ReactDOM.createRoot(document.getElementById('app'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
