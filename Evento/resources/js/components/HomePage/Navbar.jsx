import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/Evento.png';

const NavigationBar = ({ menuItems }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const token = localStorage.getItem('token');

  // التحقق من الرول عند التحميل
  useEffect(() => {
    const checkRole = async () => {
      if (!token) return;

      try {
        const response = await axios.get('http://localhost:8000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const role = response.data.profile?.role;
        if (role === 'admin') {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error('Error checking role:', err);
      }
    };

    checkRole();
  }, [token]);

  // تصفية العناصر مع إضافة Dashboard لو Admin
  const filteredMenuItems = isAdmin
    ? [
        ...menuItems,
        { text: 'Dashboard', link: '/dashboard' }, // إضافة كبسة Dashboard لو Admin
      ]
    : menuItems;

  return (
    <Navbar className="py-3 shadow-sm">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center">
          <img src={logo} alt="Evento Logo" className="me-2" style={{ height: '40px' }} />
        </Navbar.Brand>

        <Nav className="d-flex align-items-center">
          {filteredMenuItems.map((item, index) => (
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