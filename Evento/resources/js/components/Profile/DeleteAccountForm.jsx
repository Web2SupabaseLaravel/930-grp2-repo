import { useState } from 'react';
import axios from 'axios';
import React from 'react';

function DeleteAccountForm() {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  const handleDelete = (e) => {
    e.preventDefault();

    axios.delete('http://localhost:8000/api/profile', {
      data: { password },
    })
      .then(() => {
        setStatus('deleted');
        setErrors({});
        // Redirect or logout user
      })
      .catch(err => {
        if (err.response?.data?.errors) {
          setErrors(err.response.data.errors);
        }
      });
  };

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Delete Account
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Once your account is deleted, all of its resources and data will be permanently deleted. Please download any data you wish to retain.
        </p>
      </header>

      <button
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        onClick={() => setShowModal(true)}
      >
        Delete Account
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Are you sure you want to delete your account?
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Please enter your password to confirm deletion.
            </p>

            <form onSubmit={handleDelete} className="mt-4 space-y-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full border rounded-md px-3 py-2 dark:bg-gray-700 dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className="text-red-500 text-sm">{errors.password[0]}</div>
              )}

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {status === 'deleted' && (
        <p className="text-sm text-green-600 dark:text-green-400">
          Account deleted.
        </p>
      )}
    </section>
  );
}

export default DeleteAccountForm;
