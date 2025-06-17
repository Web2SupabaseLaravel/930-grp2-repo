import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = ({ brandName, brandName2, email }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      backgroundColor: '#68263D',
      color: '#EEE2DC',
      padding: '2rem 0',
      marginTop: '3rem',
      fontSize: '1.2rem'
    }}>
      <Container className="d-flex justify-content-between align-items-center">
        <div style={{ fontWeight: '500' }}>
          © {currentYear} {brandName} - All rights reserved.
        </div>
        <div>
          <Link href={`mailto:${email}`} className="footer-email">
            {email}
          </Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
