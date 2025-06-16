import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Header from './Header';
import StatsCard from './StatsCard';
import UserTable from './UserTable';
import CreateUserForm from './CreateUserForm';
import EditUserForm from './EditUserForm';
import '../DashB_U_CSS/Dashboard.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    pendingRequests: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/api/DashBoard', {
        params: searchTerm ? { search: searchTerm } : {},
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data && response.data.success) {
        const userList = response.data.data.users || [];
        setUsers(userList);
        setStats({
          totalUsers: userList.length,
          totalEvents: response.data.data.total_events || 0,
          pendingRequests: 5 // مؤقتًا ثابت
        });
        setError(null);
      } else {
        setError('Invalid response format');
      }
    } catch (err) {
      setError('Error fetching users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchUsers(), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleCreateUser = () => {
    setShowCreateUserForm(true);
  };

  const handleSaveUser = async (userData) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/DashBoard',
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.data && response.data.success) {
        fetchUsers();
        setShowCreateUserForm(false);
      }
    } catch (err) {
      setError('Error creating user');
    }
  };

  const handleEdit = async (userId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/DashBoard/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data && response.data.success) {
        setSelectedUser(response.data.data);
        setShowEditUserForm(true);
      }
    } catch (err) {
      setError('Error fetching user data');
    }
  };

  const handleUpdateUser = async (userId, updatedData) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/DashBoard/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.data && response.data.success) {
        fetchUsers();
        setShowEditUserForm(false);
        setSelectedUser(null);
      }
    } catch (err) {
      setError('Error updating user');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8000/api/DashBoard/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.data && response.data.success) {
          fetchUsers();
        }
      } catch (err) {
        setError('Error deleting user');
      }
    }
  };

  const statsData = [
    { title: 'Total Users', value: stats.totalUsers, icon: '👥' },
    { title: 'Total Events', value: stats.totalEvents },
    { title: 'Pending Requests', value: stats.pendingRequests }
  ];

  return (
    <div className="dashboard">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        <Header />

        {error && <div className="error-message">{error}</div>}

        <div className="stats-section">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <UserTable
            users={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreateUser={handleCreateUser}
          />
        )}

        {showEditUserForm && selectedUser && (
          <EditUserForm
            user={selectedUser}
            onClose={() => {
              setShowEditUserForm(false);
              setSelectedUser(null);
            }}
            onSave={handleUpdateUser}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
