import axios from 'axios';

// جلب رابط الـ API من ملف البيئة
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/DashBoard';

// إنشاء instance خاص بـ axios مع الإعدادات
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // لو تحتاج إرسال الكوكيز مع الطلبات
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// إضافة توكن Authorization تلقائياً في كل طلب إذا موجود في localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// معالجة الأخطاء بشكل مركزي
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

// ======================
// Dashboard User Service
// ======================
export const userService = {
  getUsers: async (searchParams = {}) => {
    try {
      const response = await api.get('/Dash_User', { params: searchParams });
      return response.data;
    } catch (error) {
      console.error('Get Users Error:', error.response || error);
      throw error;
    }
  },

  getUser: async (id) => {
    try {
      const response = await api.get(`/Dash_User/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get User Error:', error.response || error);
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await api.post('/Dash_User', userData);
      return response.data;
    } catch (error) {
      console.error('Create User Error:', error.response || error);
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/Dash_User/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error('Update User Error:', error.response || error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/Dash_User/${id}`);
      return response.data;
    } catch (error) {
      console.error('Delete User Error:', error.response || error);
      throw error;
    }
  },
};

// =====================
// Create Event Service
// =====================
export const pageService = {
  createEvent: async (eventData) => {
    try {
      const formattedData = {
        ...eventData,
        date: eventData.date ? new Date(eventData.date).toISOString().split('T')[0] : null,
        category_id: Number(eventData.category_id) || null,
        // لا ترسل user_id نهائياً
      };

      if (!formattedData.date) {
        throw new Error('Invalid date');
      }

      if (!formattedData.category_id) {
        throw new Error('Category ID is required');
      }

      console.log('Submitting Event:', formattedData);
      const response = await api.post('/events', formattedData);
      return response.data;
    } catch (error) {
      console.error('Create Event Error:', error.response || error);
      throw error;
    }
  },
};

export default api;
