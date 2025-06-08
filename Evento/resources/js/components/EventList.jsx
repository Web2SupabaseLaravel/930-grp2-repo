import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EventCard from './EventCard';

const EventList = ({ title, events }) => {
  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{title}</h2>
        <a href="#" className="text-decoration-none">Explore more &gt;</a>
      </div>
      <Row xs={1} md={2} lg={4} className="g-4">
        {events.map((event, idx) => (
          <Col key={idx}>
            <EventCard {...event} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EventList;
