import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // استدعاء البيانات من Laravel API
    const fetchProfile = async () => {
      try {
        const profileRes = await axios.get('http://localhost:8000/api/profile'); // Laravel API endpoint
        const categoriesRes = await axios.get('http://localhost:8000/api/categories'); // Laravel API endpoint

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
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Profile Information</h2>

      {profile ? (
        <>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role}</p>
          <p><strong>Location:</strong> {profile.location || 'N/A'}</p>
          <p><strong>User ID:</strong> {profile.user_id}</p>
          {profile.photo && (
            <img src={profile.photo} alt="Profile" className="w-32 h-32 mt-4 rounded-full object-cover" />
          )}
        </>
      ) : (
        <p>No profile data found.</p>
      )}

      <h3 className="text-xl font-semibold mt-6">Categories</h3>
      <ul className="list-disc ml-6 mt-2">
        {categories.map((cat) => (
          <li key={cat.id}>{cat.categories_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
