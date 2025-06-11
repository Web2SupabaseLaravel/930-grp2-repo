import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReviewList.css';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddReview, setShowAddReview] = useState(false);
  const [formData, setFormData] = useState({
    event_id: '',
    comment: '',
    rating: 5
  });
  const [events, setEvents] = useState([]);
  const [addReviewError, setAddReviewError] = useState(null);
  const [addReviewSuccess, setAddReviewSuccess] = useState(false);
  const [addReviewLoading, setAddReviewLoading] = useState(false);

  const fetchReviews = () => {
    setLoading(true);
    axios.get('http://127.0.0.1:8000/api/feedback')
      .then(res => {
        if (res.data.status === 'success') {
          const mapped = res.data.data.map(item => ({
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
  };

  const fetchEvents = () => {
    axios.get('http://127.0.0.1:8000/api/events')
      .then(res => {
        console.log("API Events Response:", res.data);
        const fetchedEvents = Array.isArray(res.data?.data?.data) ? res.data.data.data : [];
        setEvents(fetchedEvents);
      })
      .catch(err => {
        console.error('Error fetching events:', err);
        setAddReviewError('Could not load events for review form');
        setEvents([]);
      });
  };

  useEffect(() => {
    fetchReviews();
    fetchEvents();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setAddReviewLoading(true);
    setAddReviewError(null);
    setAddReviewSuccess(false);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/feedback', formData);
      if (response.data.status === 'success') {
        setAddReviewSuccess(true);
        setFormData({
          event_id: '',
          comment: '',
          rating: 5
        });
        fetchReviews();
        setShowAddReview(false);
      } else {
        setAddReviewError('Failed to submit feedback');
      }
    } catch (err) {
      setAddReviewError(err.response?.data?.message || 'Error submitting feedback');
    } finally {
      setAddReviewLoading(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`star ${star <= rating ? 'filled' : 'empty'}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading reviews...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-message">
      <span>❌</span>
      <p>{error}</p>
    </div>
  );

  return (
    <div className="reviews-container">
      <div className="reviews-header">
        <h2>Event Reviews</h2>
        <button 
          className="add-review-button"
          onClick={() => setShowAddReview(!showAddReview)}
        >
          {showAddReview ? 'Hide Form' : 'Add Review'}
        </button>
      </div>

      {showAddReview && (
        <div className="add-review-form-section">
          <h3>Add Your Review</h3>
          {addReviewError && <div className="error-message">{addReviewError}</div>}
          {addReviewSuccess && <div className="success-message">Review submitted successfully!</div>}
          
          <form onSubmit={handleFormSubmit} className="review-form">
            <div className="form-group">
              <label htmlFor="event_id">Select Event</label>
              <select
                id="event_id"
                name="event_id"
                value={formData.event_id}
                onChange={handleFormChange}
                required
                className="form-control"
              >
                <option value="">Choose an event...</option>
                {events.map(event => (
                  <option key={event.id} value={event.id}>
                    {event.event_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <div className="rating-input">
                {[5, 4, 3, 2, 1].map(num => (
                  <label key={num} className="rating-label">
                    <input
                      type="radio"
                      name="rating"
                      value={num}
                      checked={Number(formData.rating) === num}
                      onChange={handleFormChange}
                    />
                    <span className="star">★</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="comment">Your Review</label>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleFormChange}
                required
                minLength={10}
                maxLength={500}
                rows={4}
                className="form-control"
                placeholder="Write your review here (minimum 10 characters)"
              />
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={addReviewLoading}
            >
              {addReviewLoading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      )}

      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <h3>{review.title}</h3>
            {renderStars(review.rating)}
            <p className="review-text">{review.review}</p>
            <p className="review-author">- {review.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList; 