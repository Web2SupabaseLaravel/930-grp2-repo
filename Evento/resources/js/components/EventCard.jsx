import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faCalendarAlt,
  faTag,
  faDollarSign,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

import food from '../assets/food.png';
import music from '../assets/music.png';
import teacher from '../assets/teacher.png';
import soccer from '../assets/soccer.png';
const localImages = [food, music, teacher, soccer];

const EventCard = ({ image, title, date, location, price, description, category, idx = 0 }) => {
  const fallbackImage = localImages[idx % localImages.length]; 
  const finalImage = image || fallbackImage;

  return (
    <Card className="event-card h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={finalImage}
        className="event-image"
        style={{ height: '200px', objectFit: 'cover' }}
        alt={title}
      />
      <Card.Body>
        <Card.Title className="fw-bold">{title}</Card.Title>

        <div className="event-meta mb-2">
          <div className="mb-1">
            <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
            {date}
          </div>
          <div className="mb-1">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
            {location}
          </div>
          <div className="mb-1">
            <FontAwesomeIcon icon={faDollarSign} className="me-2" />
            {price} JD
          </div>
          <div className="mb-1">
            <FontAwesomeIcon icon={faTag} className="me-2" />
            {category}
          </div>
        </div>

        <div className="event-description text-muted">
          <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
          {description?.length > 80 ? `${description.slice(0, 80)}...` : description}
        </div>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
