import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { pageService } from '../../api';
import '../../components/create_Eve_css/form.css';

function CreateEventPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    event_name: '',
    date: '',
    price: '',
    number_of_ticket: '',
    address: '',
    category_id: '',
    description: '',
    photo: '',
    user_id: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // دالة لجلب user_id من التوكن
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.sub || decodedToken.user_id; // استبدل باسم الحقل المناسب في التوكن
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const userId = getUserIdFromToken();
    if (!userId) {
      setError('يجب تسجيل الدخول أولاً.');
      setIsLoading(false);
      return;
    }

    const dataToSend = {
      ...formData,
      user_id: userId, // أضف user_id إلى البيانات المرسلة
    };

    try {
      const response = await pageService.createEvent(dataToSend);

      if (response.success) {
        setSuccess(true);
        setFormData({
          event_name: '',
          date: '',
          price: '',
          number_of_ticket: '',
          address: '',
          category_id: '',
          description: '',
          photo: '',
          user_id: '', // إعادة تعيين user_id
        });
        
        setTimeout(() => {
          navigate('/home');
        }, 5000);
      }
    } catch (err) {
      console.error('Error:', err);
      let errorMessage = 'حدث خطأ أثناء إنشاء الحدث. يرجى المحاولة مرة أخرى.';
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.status === 422) {
        errorMessage = 'تأكد من صحة البيانات المدخلة.';
      } else if (err.response?.status === 401) {
        errorMessage = 'غير مصرح لك بإنشاء الحدث.';
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-event-container">
      <div className="form-box">
        <h2 className="form-title">Create a New Event</h2>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Event created successfully!</div>}
        {isLoading && <div className="loading-message">Creating event...</div>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="event_name">Name Event</label>
          <input
            type="text"
            id="event_name"
            name="event_name"
            value={formData.event_name}
            onChange={handleChange}
            required
          />

          <label htmlFor="date">Date & Time 🗓</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label htmlFor="price">Price $</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />

          <label htmlFor="number_of_ticket">Number of Tickets 🧾</label>
          <input
            type="number"
            id="number_of_ticket"
            name="number_of_ticket"
            value={formData.number_of_ticket}
            onChange={handleChange}
            min="1"
            required
          />

          <label htmlFor="address">Address 📍</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <label htmlFor="category_id">Event Category 📋</label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="1">Music</option>
            <option value="2">Sports</option>
            <option value="3">Workshop</option>
            <option value="4">Other</option>
          </select>

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>

          <label htmlFor="photo">Image URL 🖼</label>
          <input
            type="url"
            id="photo"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
          />
          {formData.photo && (
            <div className="image-preview">
              <img
                src={formData.photo}
                alt="Event Preview"
                style={{ maxWidth: '200px' }}
              />
            </div>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Event'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEventPage;