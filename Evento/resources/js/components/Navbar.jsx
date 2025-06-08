import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../assets/Evento.png';

const NavigationBar = ({ menuItems }) => {
  return (
    <Navbar expand="lg" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img src={logo} alt="Evento Logo" className="me-2" style={{ height: '40px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar; 