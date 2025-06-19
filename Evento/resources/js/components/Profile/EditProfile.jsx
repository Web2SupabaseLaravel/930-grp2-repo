import UpdateProfileForm from '@/components/profile/UpdateProfileForm';
import UpdatePasswordForm from '@/components/profile/UpdatePasswordForm';
import DeleteAccountForm from '@/components/profile/DeleteAccountForm';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import './EditProfile.css';

function EditProfile() {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate('/profile');
  };

  return (
    <div className="edit-profile container mt-4">
      <UpdateProfileForm />
      <UpdatePasswordForm />
      <button onClick={handleSave} className="btn btn-primary mt-4">Save</button>
    </div>
  );
}

export default EditProfile;