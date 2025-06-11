import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';

function UpdateProfileForm() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});

  // استدعاء البيانات المبدئية (مثلاً من API أو من props)
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
    <section>
      <header>
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Profile Information</h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Update your account's profile information and email address.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <label htmlFor="name" className="block font-medium text-sm text-gray-700 dark:text-gray-200">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-white"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name[0]}</div>}
        </div>

        <div>
          <label htmlFor="email" className="block font-medium text-sm text-gray-700 dark:text-gray-200">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-white"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email[0]}</div>}
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Save
          </button>

          {status === 'profile-updated' && (
            <p className="text-sm text-green-600 dark:text-green-400">Saved.</p>
          )}
        </div>
      </form>
    </section>
  );
}

export default UpdateProfileForm;
