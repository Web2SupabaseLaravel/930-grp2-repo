import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = ({ brandName, email }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: '#68263D',
      color: '#EEE2DC',
      padding: '3rem 0 1rem 0',
      marginTop: '3rem',
      fontSize: '1rem',
    }}>
      <Container>
        <Row className="text-center text-md-start gy-4">
          <Col md={4}>
            <h5 className="fw-bold mb-3">{brandName}</h5>
            <p>
              Experience seamless event management with our powerful and simple platform. 🎉
            </p>
          </Col>
          <Col md={4}>
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li><Link to="/home" className="footer-link">Home</Link></li>
              <li><Link to="/events" className="footer-link">Events</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="fw-bold mb-3">Get in Touch</h5>
            <p className="d-flex align-items-center">
              <FaEnvelope className="me-2" /> 
              <a href={`mailto:${email}`} className="footer-email">{email}</a>
            </p>
            <div className="d-flex gap-3 mt-3 justify-content-center justify-content-md-start">
              <a href="#" className="footer-icon"><FaFacebookF /></a>
              <a href="#" className="footer-icon"><FaTwitter /></a>
              <a href="#" className="footer-icon"><FaInstagram /></a>
            </div>
          </Col>
        </Row>
        <hr style={{ borderTop: '1px solid #EEE2DC', marginTop: '2rem' }} />
        <p className="text-center m-0" style={{ fontWeight: '500' }}>
          © {currentYear} {brandName} - All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
