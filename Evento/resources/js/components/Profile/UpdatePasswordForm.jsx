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
    <section>
      <header>
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Update Password</h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <label htmlFor="current_password" className="block font-medium text-sm text-gray-700 dark:text-gray-200">
            Current Password
          </label>
          <input
            id="current_password"
            name="current_password"
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-white"
            autoComplete="current-password"
            value={formData.current_password}
            onChange={handleChange}
          />
          {errors.current_password && <div className="text-red-500 text-sm mt-1">{errors.current_password[0]}</div>}
        </div>

        <div>
          <label htmlFor="password" className="block font-medium text-sm text-gray-700 dark:text-gray-200">
            New Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-white"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password[0]}</div>}
        </div>

        <div>
          <label htmlFor="password_confirmation" className="block font-medium text-sm text-gray-700 dark:text-gray-200">
            Confirm Password
          </label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:text-white"
            autoComplete="new-password"
            value={formData.password_confirmation}
            onChange={handleChange}
          />
          {errors.password_confirmation && (
            <div className="text-red-500 text-sm mt-1">{errors.password_confirmation[0]}</div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Save
          </button>

          {status === 'password-updated' && (
            <p className="text-sm text-green-600 dark:text-green-400">Saved.</p>
          )}
        </div>
      </form>
    </section>
  );
}

export default UpdatePasswordForm;
