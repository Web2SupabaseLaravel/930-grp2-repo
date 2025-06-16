import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';

function UpdateProfileForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/api/userprofile')
      .then(res => {
        setFormData({
          name: res.data.user.name || '',
          email: res.data.user.email || ''
        });
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.patch('http://localhost:8000/api/profile/update', formData)
      .then(res => {
        setStatus('profile-updated');
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
        <h2 className="h4 text-gray-900">Profile Information</h2>
        <p className="text-muted">Update your account's profile information and email address.</p>
      </header>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="text-danger mt-1">{errors.name[0]}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger mt-1">{errors.email[0]}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
        {status === 'profile-updated' && (
          <p className="text-success mt-2">Saved.</p>
        )}
      </form>
    </section>
  );
}

export default UpdateProfileForm;