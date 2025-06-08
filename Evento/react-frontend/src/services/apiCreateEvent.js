import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// إضافة التوكن تلقائيًا
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// معالجة الأخطاء
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);
export const pageService = {
    createEvent: async (eventData) => {
        try {
          const response = await api.post('/events', eventData);
          return response.data;
        } catch (error) {
          console.error('Create Event Error:', error.response || error);
          throw error;
        }
      },
    };
