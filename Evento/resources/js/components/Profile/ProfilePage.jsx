import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileRes = await axios.get('http://localhost:8000/api/profile');
        const categoriesRes = await axios.get('http://localhost:8000/api/categories');

        setProfile(profileRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="header">
        <button className="back-button">← back to home page</button>
      </div>

      <div className="profile-card">
        {profile && (
          <>
            <div className="profile-top">
              {profile.photo && (
                <img src={profile.photo} alt="Profile" className="profile-photo" />
              )}
              <h2 className="profile-name">{profile.name}</h2>
            </div>

            <div className="profile-details">
              <div><label>Usern</label><input type="text" value={profile.name} disabled /></div>
              <div><label>Location</label><input type="text" value={profile.location || 'N/A'} disabled /></div>
              <div><label>Email</label><input type="text" value={profile.email} disabled /></div>
              <div><label>Interested</label><input type="text" value={categories.map(c => c.categories_name).join(', ')} disabled /></div>
              <div><label>Phone Number</label><input type="text" value={profile.phone || '+970 000 000 000'} disabled /></div>
            </div>

            <button className="edit-button">Edit</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
