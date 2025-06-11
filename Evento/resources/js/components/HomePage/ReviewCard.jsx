import React from 'react';
import { Card } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const ReviewCard = ({ title, rating, review, author }) => {
  return (
    <Card className="review-card h-100">
      <Card.Body className="d-flex flex-column">
        <h5 className="mb-3">{title}</h5>
        <div className="mb-3 d-flex">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`${index < rating ? "text-warning" : "text-muted"}`}
              style={{ fontSize: '1.2rem', marginRight: '4px' }}
            />
          ))}
        </div>
        <Card.Text className="text-muted mb-3 flex-grow-1">{review}</Card.Text>
        <div className="d-flex align-items-center mt-auto">
          <div className="rounded-circle bg-secondary text-white p-2 me-2" style={{ width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {author.charAt(0)}
          </div>
          <span className="text-muted">{author}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;