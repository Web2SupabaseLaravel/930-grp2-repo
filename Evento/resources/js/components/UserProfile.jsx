import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserProfile.css'; // إذا كنت تستخدم ملف CSS مخصص

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      // إذا ما في توكن → توجيه لصفحة تسجيل الدخول
      navigate('/login');
      return;
    }

    // جلب بيانات المستخدم مع التوكن
    axios.get('/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      setUserData(response.data);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      // لو التوكن انتهت صلاحيته مثلاً
      navigate('/login');
    });
  }, [navigate]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Welcome, {userData.username}</h1>
          <p className="card-text"><strong>Email:</strong> {userData.email}</p>
          <p className="card-text"><strong>Location:</strong> {userData.location}</p>
          <p className="card-text"><strong>Phone:</strong> {userData.phoneNumber}</p>
          <p className="card-text"><strong>Interests:</strong> {userData.interests.join(', ')}</p>
          <button className="btn btn-primary" onClick={() => navigate('/edit')}>Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
