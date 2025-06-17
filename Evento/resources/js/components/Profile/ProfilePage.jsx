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
  const [showModal, setShowModal] = useState(false);
  const [newRole, setNewRole] = useState('attendee'); // الرول الجديد

  // دالة fetchProfile كدالة مستقلة داخل المكون
  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
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
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = profileRes.data;
      setProfile({
        name: data.user?.name || 'N/A',
        email: data.user?.email || 'N/A',
        location: data.profile?.location || 'N/A',
        phone: data.profile?.phone || '+970 000 000 000',
        role: data.profile?.role || 'N/A'
      });
      setCategories(Array.isArray(data.categories) ? data.categories.map(cat => cat.categories_name || 'N/A') : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Failed to fetch profile. Please check your authentication.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleRoleRequest = async () => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (!token) {
      alert('No token found. Please log in.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/rolerequest', {
        requested_role: newRole,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(response.data.message);
      setShowModal(false);
      // إعادة تحميل البيانات بعد نجاح الطلب
      await fetchProfile(); // استدعاء الدالة هنا
    } catch (err) {
      console.error('Error requesting role:', err.response?.data || err.message);
      alert('Failed to request role change. Details: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <p className="text-black text-center">Loading...</p>;
  if (error) return <p className="text-white text-center">{error}</p>;

  return (
    <div className="profile-container">
      <div className="header">
        <Link to="/home">
          <button className="osaid-button">Home</button>
        </Link>
      </div>

      <div className="profile-card">
        {profile && (
          <>
          <div className="profile-top d-flex justify-content-between align-items-center">
  <h2 className="profile-name mb-0">{profile.name}</h2>
</div>

<div className="profile-details mt-4">
  <div><label>Username</label><input type="text" value={profile.name} disabled className="form-control" /></div>
  <div><label>Location</label><input type="text" value={profile.location} disabled className="form-control" /></div>
  <div><label>Email</label><input type="text" value={profile.email} disabled className="form-control" /></div>
  <div><label>Interested</label><input type="text" value={categories.length > 0 ? categories.join(', ') : 'N/A'} disabled className="form-control" /></div>
  <div><label>Phone Number</label><input type="text" value={profile.phone} disabled className="form-control" /></div>
  <div><label>Role</label><input type="text" value={profile.role} disabled className="form-control" /></div>
</div>

<div className="mt-4 d-flex gap-3">
  <Link to="/edit"><button className="btn btn-primary edit-button">Edit</button></Link>
  <button className="btn btn-warning" onClick={() => setShowModal(true)}>Request Role Change</button>
</div>


            <div className="mt-4">
              <h4>Booked Events</h4>
              <div className="card p-3 text-center">
                <img className="qr" src="https://api.qrserver.com/v1/create-qr-code/?data=MusicEvent" alt="QR" />
                <p>Music - April 14, 2025 | 6:00PM</p>
                <button className="btn btn-outline-secondary">Cancel Reservation</button>
              </div>
            </div>
          </>
        )}

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Request Role Change</h3>
              <select value={newRole} onChange={(e) => setNewRole(e.target.value)} className="form-control mb-3">
                <option value="attendee">Attendee</option>
                <option value="organizer">Organizer</option>
                <option value="admin">Admin</option>
              </select>
              <button className="btn btn-success" onClick={handleRoleRequest}>Submit Request</button>
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
