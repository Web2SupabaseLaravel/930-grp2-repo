import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import logo from '../../assets/Evento.png';

const NavigationBar = ({ menuItems }) => {
  return (
    <Navbar className="py-3 shadow-sm">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center">
          <img src={logo} alt="Evento Logo" className="me-2" style={{ height: '40px' }} />
        </Navbar.Brand>

        <Nav className="d-flex align-items-center">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="mx-2 fw-medium nav-link" 
            >
              {item.text}
            </Link>
          ))}

          <Link to="/profile" className="ms-3 nav-link">
            <FaUserCircle className="profile-icon" />
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
