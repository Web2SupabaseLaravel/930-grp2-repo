import React from 'react';
import '../DashB_U_CSS/Sidebar.css';

function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'users', label: 'Users', active: true },
    { id: 'events', label: 'Events' },
    { id: 'requests', label: 'Requests' },
    { id: 'website', label: 'Visit Website' }
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>EVENTO</h2>
      </div>
      <nav className="nav-menu">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
