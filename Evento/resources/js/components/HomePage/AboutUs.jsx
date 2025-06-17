import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { HiLightBulb } from 'react-icons/hi';

const AboutUs = ({ title, description }) => {
  return (
    <Container className="my-4">
      <div className="about-box" data-aos="zoom-in">
        <Row className="align-items-center">
          <Col xs="auto">
            <HiLightBulb className="about-icon" />
          </Col>
          <Col>
            <h4 className="about-title">{title}</h4>
            <p className="about-description">{description}</p>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default AboutUs;