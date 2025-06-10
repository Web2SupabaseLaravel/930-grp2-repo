import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // استيراد useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import './EditProfile.css';

const EditProfile = () => {
    const [userData, setUserData] = useState({
        username: '',
        location: '',
        email: '',
        phoneNumber: '',
        interests: [],
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/user/profile');
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleInterestsChange = (e) => {
        // تقسيم النص على الفواصل مع حذف الفراغات الزائدة
        const interestsArray = e.target.value.split(',').map(i => i.trim()).filter(i => i !== '');
        setUserData({ ...userData, interests: interestsArray });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/api/user/profile', userData); // تعديل URL حسب الـ backend
            alert('Profile updated successfully!');
            navigate('/'); // التوجيه لصفحة البروفايل بعد الحفظ
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="edit-profile mt-5">
            <h1 className="text-center">Edit Profile</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={userData.location}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Interests:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="interests"
                        value={userData.interests.join(', ')}
                        onChange={handleInterestsChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfile;
