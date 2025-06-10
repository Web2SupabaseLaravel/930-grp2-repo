import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../assets/Evento.png';

const NavigationBar = ({ menuItems }) => {
  return (
    <Navbar className="py-3 shadow-sm">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img src={logo} alt="Evento Logo" className="me-2" style={{ height: '40px' }} />
        </Navbar.Brand>
        <Nav className="d-flex align-items-center">
          {menuItems.map((item, index) => (
            <Nav.Link 
              key={index} 
              href={item.link}
              className="mx-2 fw-medium"
            >
              {item.text}
            </Nav.Link>
          ))}
          <Nav.Link href="#profile" className="ms-3">
            <FaUserCircle className="profile-icon" />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar; 