import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReviewList.css';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
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

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/feedback')
      .then(res => {
        if (res.data.status === 'success') {
          const mapped = res.data.data.map(item => ({
            id: item.id,
            event_id: item.event_id,
            title: item.event?.event_name || 'No Title',
            rating: item.rating,
            review: item.comment,
            author: item.user?.name || 'Anonymous'
          }));
          setReviews(mapped);
        } else {
          setError('Failed to load feedback');
        }
      })
      .catch(err => {
        setError('Error fetching feedback');
        console.error(err);
      })
      .finally(() => setLoading(false));
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

    if (editingReviewIndex !== null) {
      axios.put(`http://127.0.0.1:8000/api/feedback/${newReview.id}`, newReview)
        .then(res => {
          if (res.data.status === 'success') {
            const updated = res.data.data;
            const updatedReview = {
              id: updated.id,
              event_id: updated.event_id,
              title: updated.event?.event_name || 'No Title',
              rating: updated.rating,
              review: updated.comment,
              author: updated.user?.name || 'You'
            };
            setReviews(prev => {
              const copy = [...prev];
              copy[editingReviewIndex] = updatedReview;
              return copy;
            });
            resetForm();
          } else {
            setError('Failed to update review');
          }
        })
        .catch(err => {
          setError('Error updating review');
          console.error(err);
        })
        .finally(() => setSubmitting(false));
    } else {
      axios.post('http://127.0.0.1:8000/api/feedback', newReview)
        .then(res => {
          if (res.data.status === 'success') {
            const item = res.data.data;
            const added = {
              id: item.id,
              event_id: item.event_id,
              title: item.event?.event_name || 'No Title',
              rating: item.rating,
              review: item.comment,
              author: item.user?.name || 'You'
            };
            setReviews(prev => [added, ...prev]);
            resetForm();
          } else {
            setError('Failed to submit review');
          }
        })
        .catch(err => {
          setError('Error submitting review');
          console.error(err);
        })
        .finally(() => setSubmitting(false));
    }
  };

  const handleEdit = (index) => {
    const review = reviews[index];
    setNewReview({
      id: review.id,
      event_id: review.event_id,
      comment: review.review,
      rating: review.rating,
    });
    setEditingReviewIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const review = reviews[index];
    if (window.confirm('Are you sure you want to delete this review?')) {
      axios.delete(`http://127.0.0.1:8000/api/feedback/${review.id}`)
        .then(res => {
          if (res.data.status === 'success') {
            setReviews(prev => prev.filter((_, i) => i !== index));
          } else {
            setError('Failed to delete review');
          }
        })
        .catch(err => {
          setError('Error deleting review');
          console.error(err);
        });
    }
  };

  const resetForm = () => {
    setNewReview({ id: null, event_id: '', comment: '', rating: 1 });
    setShowForm(false);
    setEditingReviewIndex(null);
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading reviews...</p>
    </div>
  );

  return (
    <div className="reviews-container">
      <h2 className="reviews-title">User Reviews</h2>

      <button className="toggle-form-btn" onClick={() => {
        resetForm();
        setShowForm(prev => !prev);
      }}>
        {showForm ? 'Cancel' : 'Add Review'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="review-form">
          <input
            type="number"
            name="event_id"
            placeholder="Event ID"
            value={newReview.event_id}
            onChange={handleChange}
            required
          />
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

      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <h3>{review.title}</h3>
              {renderStars(review.rating)}
            </div>
            <p className="review-content">{review.review}</p>
            <div className="review-footer">
              <span className="author">By: {review.author}</span>
              <span className="date">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="review-actions">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)} style={{ color: 'white' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
