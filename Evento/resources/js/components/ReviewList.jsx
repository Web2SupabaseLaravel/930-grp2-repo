import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReviewList.css';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
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
      <h2 className="reviews-title">User Reviews</h2>
      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-header">
              <h3>{review.title}</h3>
              <div className="rating">{renderStars(review.rating)}</div>
            </div>
            <p className="review-content">{review.review}</p>
            <div className="review-footer">
              <span className="author">By: {review.author}</span>
              <span className="date">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
