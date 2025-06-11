import React from 'react';
import '../DashB_U_CSS/Header.css';

function Header() {
  return (
    <header className="dashboard-header">
      <h1>Users</h1>
      <div className="user-profile">
        <div className="avatar">
          <img
            src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
            alt="Admin"
          />
        </div>
        <span>Admin</span>
      </div>
    </header>
  );
}

export default Header;
