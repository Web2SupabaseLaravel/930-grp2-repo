import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReviewList.css';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingReviewIndex, setEditingReviewIndex] = useState(null);
  const [newReview, setNewReview] = useState({
    id: null,
    event_id: '',
    comment: '',
    rating: 1,
  });
  const [submitting, setSubmitting] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(localStorage.getItem('user_id') || null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !currentUserId) {
      axios.get('http://127.0.0.1:8000/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const userId = res.data.user?.id?.toString();
        if (userId) {
          localStorage.setItem('user_id', userId);
          setCurrentUserId(userId);
        }
      })
      .catch(err => {
        console.error('Error fetching user:', err);
      });
    }
  }, [currentUserId]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch reviews
      axios
        .get('http://127.0.0.1:8000/api/feedback', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.status === 'success') {
            const mapped = res.data.data.map((item) => ({
              id: item.id,
              event_id: item.event_id,
              title: item.event?.event_name || 'No Title',
              rating: item.rating,
              review: item.comment,
              author: item.user?.name || 'osaid',
              author_id: item.user?.id?.toString(),
            }));
            setReviews(mapped);
          } else {
            setError(res.data.message || 'Failed to load feedback');
          }
        })
        .catch((err) => {
          setError(err.response?.data?.message || 'Error fetching feedback');
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            window.location.href = '/sign-in';
          }
        });
  
      // Fetch events
      axios
        .get('http://127.0.0.1:8000/api/events', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.success) {
            setEvents(res.data.data);
          } else {
            setError(res.data.message || 'Failed to load events');
          }
        })
        .catch((err) => {
          setError(err.response?.data?.message || 'Error fetching events');
          console.error('Error fetching events:', err);
        })
        .finally(() => setLoading(false));
    } else {
      setError('Please log in first');
      window.location.href = '/sign-in';
    }
  }, []);

  const renderStars = (rating) => (
    <div className="stars-container">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`star ${star <= rating ? 'filled' : 'empty'}`}>
          ★
        </span>
      ))}
    </div>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!newReview.event_id || !newReview.comment || newReview.comment.length < 10 || !newReview.rating) {
      setError('Please fill all fields correctly (comment must be at least 10 characters)');
      setSubmitting(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in first');
      window.location.href = '/login';
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const payload = { ...newReview };
    console.log('Submitting payload:', payload);

    if (editingReviewIndex !== null) {
      axios.put(`http://127.0.0.1:8000/api/feedback/${newReview.id}`, payload, config)
        .then(res => {
          if (res.data.status === 'success') {
            const updated = res.data.data;
            const updatedReview = {
              id: updated.id,
              event_id: updated.event_id,
              title: updated.event?.event_name || 'No Title',
              rating: updated.rating,
              review: updated.comment,
              author: updated.user?.name || 'osaid',
              author_id: updated.user?.id?.toString()
            };
            setReviews(prev => {
              const copy = [...prev];
              copy[editingReviewIndex] = updatedReview;
              return copy;
            });
            resetForm();
          } else {
            setError(res.data.message || 'Failed to update review');
          }
        })
        .catch(err => {
          setError(err.response?.data?.message || 'Error updating review');
          console.error('Update error:', err.response?.data);
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            window.location.href = '/login';
          }
        })
        .finally(() => setSubmitting(false));
    } else {
      axios.post('http://127.0.0.1:8000/api/feedback', payload, config)
        .then(res => {
          if (res.data.status === 'success') {
            const item = res.data.data;
            const added = {
              id: item.id,
              event_id: item.event_id,
              title: item.event?.event_name || 'No Title',
              rating: item.rating,
              review: item.comment,
              author: item.user?.name || 'osaid',
              author_id: item.user?.id?.toString()
            };
            setReviews(prev => [added, ...prev]);
            resetForm();
          } else {
            setError(res.data.message || 'Failed to submit review');
          }
        })
        .catch(err => {
          setError(err.response?.data?.message || 'Error submitting review');
          console.error('Submit error:', err.response?.data);
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            window.location.href = '/login';
          }
        })
        .finally(() => setSubmitting(false));
    }
  };

  const handleEdit = (index) => {
    const review = reviews[index];
    if (currentUserId && review.author_id && currentUserId === review.author_id) {
      setNewReview({
        id: review.id,
        event_id: review.event_id,
        comment: review.review,
        rating: review.rating,
      });
      setEditingReviewIndex(index);
      setShowForm(true);
      setTimeout(() => {
        document.querySelector('.review-form')?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    } else {
      setError('You can only edit your own reviews');
    }
  };

  const handleDelete = (index) => {
    const review = reviews[index];
    if (currentUserId && review.author_id && currentUserId === review.author_id) {
      if (window.confirm('Are you sure you want to delete this review?')) {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in first');
          window.location.href = '/login';
          return;
        }

        axios.delete(`http://127.0.0.1:8000/api/feedback/${review.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          if (res.data.status === 'success') {
            setReviews(prev => prev.filter((_, i) => i !== index));
          } else {
            setError(res.data.message || 'Failed to delete review');
          }
        })
        .catch(err => {
          setError(err.response?.data?.message || 'Error deleting review');
          console.error('Delete error:', err.response?.data);
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            window.location.href = '/login';
          }
        });
      }
    } else {
      setError('You can only delete your own reviews');
    }
  };

  const resetForm = () => {
    setNewReview({ id: null, event_id: '', comment: '', rating: 1 });
    setShowForm(false);
    setEditingReviewIndex(null);
  };

  if (loading) return (
    <div className="loading-container" data-aos="fade-in">
      <div className="loading-spinner"></div>
      <p>Loading reviews...</p>
    </div>
  );

  return (
    <div className="reviews-container">
      <h2 className="reviews-title" data-aos="fade-down">User Reviews</h2>

      <button
        className="toggle-form-btn"
        onClick={() => {
          resetForm();
          setShowForm(prev => !prev);
        }}
        data-aos="fade-up"
      >
        {showForm ? 'Cancel' : 'Add Review'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="review-form" data-aos="zoom-in">
          <select
            name="event_id"
            value={newReview.event_id}
            onChange={handleChange}
            required
          >
            <option value="">Select an Event</option>
            {events.length > 0 ? (
              events.map(event => (
                <option key={event.id} value={event.id}>{event.event_name}</option>
              ))
            ) : (
              <option value="" disabled>No events available</option>
            )}
          </select>
          <textarea
            name="comment"
            placeholder="Write your review...."
            value={newReview.comment}
            onChange={handleChange}
            required
          />
          <select name="rating" value={newReview.rating} onChange={handleChange}>
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
            ))}
          </select>
          <button type="submit" disabled={submitting}>
            {submitting ? (editingReviewIndex !== null ? 'Updating...' : 'Submitting...') : (editingReviewIndex !== null ? 'Update Review' : 'Submit Review')}
          </button>
        </form>
      )}

      {error && <p className="error-message" data-aos="fade-in">{error}</p>}

      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="review-card"
            data-aos="fade-up"
            data-aos-delay={`${index * 100}`}
          >
            <div className="review-header">
              <h3>{review.title}</h3>
              {renderStars(review.rating)}
            </div>
            <p className="review-content">{review.review}</p>
            <div className="review-footer">
              <span className="author">By: {review.author}</span>
              <span className="date">{new Date().toLocaleDateString()}</span>
            </div>
            {currentUserId && review.author_id && currentUserId === review.author_id && (
              <div className="review-actions">
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)} style={{ color: 'white' }}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;