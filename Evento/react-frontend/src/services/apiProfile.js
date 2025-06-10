import axios from 'axios';

const apiProfile = axios.create({
  baseURL: 'http://127.0.0.1:8000/profile', // عدّلها حسب عنوان السيرفر
  withCredentials: true, // مطلوب لـ Sanctum


});

export default apiProfile;
