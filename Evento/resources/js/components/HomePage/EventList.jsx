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

        // التحقق من هيكلية الاستجابة
        const fetchedEvents = response.data?.data || []; // استخدام response.data.data إذا كان التصفح لا يزال موجودًا، أو response.data إذا كان get()
        console.log("API Response:", response.data);
        console.log("Fetched events:", fetchedEvents);

        if (!Array.isArray(fetchedEvents)) {
          throw new Error("Unexpected data format from API");
        }

        setEvents(fetchedEvents);
      } catch (err) {
        console.error("Error fetching events:", err.response?.data || err.message);
        setError("حدث خطأ أثناء تحميل الأحداث. تحقق من السجل للحصول على التفاصيل.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4" data-aos="fade-down">
        <h2 className="fw-bold">{title}</h2>
        <Link to="#" className="text-decoration-none text-primary">Explore more &gt;</Link>
      </div>

      {loading && (
        <div className="text-center my-5" data-aos="fade-in">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center" data-aos="fade-in">
          {error}
        </Alert>
      )}

      {!loading && !error && events.length === 0 && (
        <Alert variant="info" className="text-center" data-aos="fade-in">
          لا توجد أحداث متاحة حاليًا.
        </Alert>
      )}

      {!loading && !error && events.length > 0 && (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {events.map((event, idx) => (
            <Col key={idx} data-aos="fade-up" data-aos-delay={`${idx * 100}`}>
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