import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import EventCard from './EventCard';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventList = ({ title }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get("http://127.0.0.1:8000/api/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedEvents = response.data?.data?.data || [];
        console.log("Fetched events:", fetchedEvents);
        setEvents(fetchedEvents);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("حدث خطأ أثناء تحميل الأحداث");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">{title}</h2>
        <Link to="#" className="text-decoration-none text-primary">Explore more &gt;</Link>
      </div>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {events.map((event, idx) => (
            <Col key={idx}>
              <EventCard
                idx={idx}
                title={event.event_name}
                date={event.date}
                location={event.address}
                price={event.price}
                description={event.description}
                category={event.category?.name || 'بدون تصنيف'}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default EventList;