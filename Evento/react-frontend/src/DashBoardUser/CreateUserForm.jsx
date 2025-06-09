import React, { useState } from 'react';
import { userService } from '../services/api';
import '../DashB_U_CSS/CreateUserForm.css';

function CreateUserForm({ onClose, onSave }) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'Attendee'
  });
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'password' || name === 'password_confirmation') {
      setPasswordError('');
    }
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password !== userData.password_confirmation) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
      const { confirmPassword, ...dataToSave } = userData;
      const response = await userService.createUser(dataToSave);
      if (response.success) {
        onSave(dataToSave); 
        alert('User created successfully');
        onClose();
      } else {
        setApiError('Failed to create user');
      }
    } catch (err) {
      setApiError('Error creating user');
      console.error(err);
    }
  };

  return (
    <div className="create-user-overlay">
      <div className="create-user-modal">
        <div className="modal-header">
          <h2>Add New User</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="password_confirmation"
              value={userData.password_confirmation}
              onChange={handleChange}
              required
            />
            {passwordError && <div className="error-message">{passwordError}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={userData.role}
              onChange={handleChange}
              required
            >
              <option value="Admin">Admin</option>
              <option value="Organizer">Organizer</option>
              <option value="Attendee">Attendee</option>
            </select>
          </div>
          {apiError && <div className="error-message">{apiError}</div>}
          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUserForm;
