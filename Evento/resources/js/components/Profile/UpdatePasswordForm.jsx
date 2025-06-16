import { useState } from 'react';
import axios from 'axios';
import React from 'react';

function UpdatePasswordForm() {
  const [formData, setFormData] = useState({
    current_password: '',
    password: '',
    password_confirmation: ''
  });

  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put('http://localhost:8000/api/password/update', formData)
      .then(() => {
        setStatus('password-updated');
        setErrors({});
        setTimeout(() => setStatus(''), 2000);
      })
      .catch(err => {
        if (err.response?.data?.errors) {
          setErrors(err.response.data.errors);
        }
      });
  };

  return (
    <section className="mb-4">
      <header>
        <h2 className="h4 text-gray-900">Update Password</h2>
        <p className="text-muted">Ensure your account is using a long, random password to stay secure.</p>
      </header>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="current_password" className="form-label">Current Password</label>
          <input
            id="current_password"
            name="current_password"
            type="password"
            className="form-control"
            autoComplete="current-password"
            value={formData.current_password}
            onChange={handleChange}
          />
          {errors.current_password && <div className="text-danger mt-1">{errors.current_password[0]}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">New Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="text-danger mt-1">{errors.password[0]}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            className="form-control"
            autoComplete="new-password"
            value={formData.password_confirmation}
            onChange={handleChange}
          />
          {errors.password_confirmation && <div className="text-danger mt-1">{errors.password_confirmation[0]}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
        {status === 'password-updated' && (
          <p className="text-success mt-2">Saved.</p>
        )}
      </form>
    </section>
  );
}

export default UpdatePasswordForm;