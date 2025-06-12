import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token);

      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        console.log('Decoded Token:', decodedToken);
        if (decodedToken.exp < currentTime) {
          setError('Token has expired. Please log in again.');
          setLoading(false);
          return;
        }
      } catch (decodeError) {
        console.error('Error decoding token:', decodeError);
        setError('Invalid token format. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const profileRes = await axios.get('http://localhost:8000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Profile Response:', profileRes.data); // سجل الاستجابة

        const data = profileRes.data;
        setProfile({
          name: data.user?.name || 'N/A',
          email: data.user?.email || 'N/A',
          location: data.profile?.location || 'N/A',
          phone: data.profile?.phone || '+970 000 000 000',
        });

        setCategories(Array.isArray(data.categories) ? data.categories : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err.response ? err.response.data : err.message);
        setError('Failed to fetch profile. Please check your authentication.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="profile-container">
      <div className="header">
        <Link to="/home">
          <button className="back-button">← back to home page</button>
        </Link>
      </div>

      <div className="profile-card">
        {profile && (
          <>
            <div className="profile-top">
              <h2 className="profile-name">{profile.name}</h2>
            </div>

            <div className="profile-details">
              <div><label>Usern</label><input type="text" value={profile.name} disabled /></div>
              <div><label>Location</label><input type="text" value={profile.location} disabled /></div>
              <div><label>Email</label><input type="text" value={profile.email} disabled /></div>
              <div><label>Interested</label><input type="text" value={Array.isArray(categories) ? categories.map(c => c.categories_name || 'N/A').join(', ') : 'N/A'} disabled /></div>
              <div><label>Phone Number</label><input type="text" value={profile.phone} disabled /></div>
            </div>

            <button className="edit-button">Edit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;