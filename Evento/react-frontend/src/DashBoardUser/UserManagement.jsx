import React, { useState, useEffect } from 'react';
import { userService } from '../services/api';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [editingUserId, setEditingUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const params = {};
      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await userService.getUsers(params);
      console.log('API Response:', response);

      if (response && response.success) {
        setUsers(response.data.users || []);
        setStats({
          totalUsers: (response.data.users || []).length,
          totalEvents: response.data.total_events || 0
        });
      } else {
        setError('Invalid response format');
        console.error('Invalid response format:', response);
      }
      setError(null);
    } catch (err) {
      setError('An error occurred while fetching user data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    });
    setEditingUserId(null);
  };

  const handleEdit = async (id) => {
    try {
      const response = await userService.getUser(id);
      if (response.success) {
        const user = response.data;
        setFormData({
          name: user.name,
          email: user.email,
          password: '',
          password_confirmation: ''
        });
        setEditingUserId(id);
        setShowForm(true);
      }
    } catch (err) {
      setError('An error occurred while fetching user data');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await userService.deleteUser(id);
        if (response.success) {
          fetchUsers();
          alert('User deleted successfully');
        }
      } catch (err) {
        setError('An error occurred while deleting the user');
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;

      if (editingUserId) {
        response = await userService.updateUser(editingUserId, formData);
        if (response.success) {
          alert('User updated successfully');
        }
      } else {
        response = await userService.createUser(formData);
        if (response.success) {
          alert('User created successfully');
        }
      }

      setShowForm(false);
      resetForm();
      fetchUsers();
    } catch (err) {
      setError('An error occurred while saving user data');
      console.error(err);
    }
  };

  return (
    <div className="user-management-container">
      <div className="sidebar">
        <h1 className="app-title">EVENTO</h1>
        <div className="nav-links">
          <div className="nav-item active">Users</div>
          <div className="nav-item">Events</div>
          <div className="nav-item">Requests</div>
          <div className="nav-item">Visit Website</div>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <h1>Users</h1>
          <div className="user-profile">
            <div className="avatar">Admin</div>
          </div>
        </div>

        <div className="stats-cards">
          <div className="stat-card">
            <h3>Total Users</h3>
            <div className="stat-value">
              <span>{stats.totalUsers}</span>
              <span className="icon">👥</span>
            </div>
          </div>
          <div className="stat-card">
            <h3>Total Events</h3>
            <div className="stat-value">
              <span>{stats.totalEvents}</span>
            </div>
          </div>
          <div className="stat-card">
            <h3>Pending Requests</h3>
            <div className="stat-value">
              <span>5</span>
            </div>
          </div>
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

        {error && <div className="error-message">{error}</div>}

        {showForm && (
          <div className="user-form-container">
            <h2>{editingUserId ? 'Edit User' : 'Add New User'}</h2>
            <form onSubmit={handleSubmit} className="user-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  {editingUserId ? 'Password (leave blank to keep unchanged)' : 'Password'}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  {...(editingUserId ? {} : { required: true })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password_confirmation">Confirm Password</label>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                  {...(editingUserId ? {} : { required: true })}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingUserId ? 'Update' : 'Save'}
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="users-table-section">
          <div className="table-header">
            <h2>All Users</h2>
            <div className="table-actions">
              <button
                className="btn-primary"
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
              >
                Create User
              </button>
              <button className="btn-secondary">Manage Roles</button>
            </div>
          </div>

          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td className="actions-cell">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(user.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="no-data">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
