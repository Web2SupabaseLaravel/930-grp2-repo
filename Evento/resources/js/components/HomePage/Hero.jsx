import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-section d-flex align-items-center text-center">
      <Container>
        <div className="mx-auto hero-content" data-aos="fade-up" data-aos-delay="100">
          <h1 className="display-4 fw-light mb-4">
            Create, Explore, and<br />Manage Events
          </h1>
          <p className="lead mb-4">
            Welcome to Evento, your one-stop solution for event management.
          </p>
          <Link to="/sign-up" className="btn btn-custom">Get Started</Link>
        </div>
      </Container>
    </div>
  );
};

export default Hero;