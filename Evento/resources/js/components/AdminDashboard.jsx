import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="d-flex h-100" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-primary text-white p-4" style={{ width: '250px' }}>
        <h1 className="h3 mb-4">EVENTO</h1>
        <nav>
          <ul className="nav flex-column">
            <li className="nav-item mb-3">
              <Link to="/admin/users" className="nav-link text-white">Users</Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/admin/events" className="nav-link text-white">Events</Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/admin/requests" className="nav-link text-white">Requests</Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/visit-website" className="nav-link text-white">Visit Website</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <div className="d-flex justify-content-end mb-4">
          <span className="me-4 align-self-center">Admin</span>
          <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
            A
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;