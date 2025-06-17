import React from 'react';
import { Container } from 'react-bootstrap';

const Hero = () => {
  return (
    <div className="hero-section d-flex align-items-center text-center">
      <Container>
        <div className="mx-auto hero-content">
          <h1 className="display-4 fw-light mb-4">
            Create, Explore, and<br />Manage Events
          </h1>
          <p className="lead mb-4">
            Welcome to Evento, your one-stop solution for event management.
          </p>
          <a href="/SignUp" className="btn btn-custom">Get Started</a>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
