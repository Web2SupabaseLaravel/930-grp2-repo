import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const EventCard = ({ image, title, date, location }) => {
  return (
    <Card className="event-card h-100 shadow-sm">
      <Card.Img variant="top" src={image} className="event-image" />
      <Card.Body>
        <Card.Title className="fw-bold">{title}</Card.Title>
        <div className="event-meta">
          <div className="mb-2">
            <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
            {date}
          </div>
          <div>
            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
            {location}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
