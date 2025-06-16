// resources/js/services/userService.js

import axios from 'axios';

export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found in localStorage');

  const response = await axios.get('/api/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateUserProfile = async (data) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found in localStorage');

  const response = await axios.put('/api/user/profile', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
