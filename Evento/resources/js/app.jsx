import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import Events from './components/Events';
import RoleRequests from './components/RoleRequests';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="events" element={<Events />} />
          <Route path="requests" element={<RoleRequests />} />
          <Route index element={<div>Welcome to Admin Dashboard</div>} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

// Rendering logic (moved to index.js or handled by Vite)

if (document.getElementById('app')) {
    const root = ReactDOM.createRoot(document.getElementById('app'));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }