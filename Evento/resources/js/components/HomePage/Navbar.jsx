import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/Evento.png";

const NavigationBar = ({ menuItems }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkRole = async () => {
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:8000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const role = response.data.profile?.role;
        if (role === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Error checking role:", err);
      }
    };

    checkRole();
  }, [token]);

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  const filteredMenuItems = isAdmin
    ? [...menuItems, { text: "Dashboard", link: "/dashboard" }]
    : menuItems;

  return (
    <Navbar className="py-3 shadow-sm">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center">
          <img src={logo} alt="Evento Logo" className="me-2" style={{ height: "40px" }} />
        </Navbar.Brand>

        <Nav className="d-flex align-items-center">
          {filteredMenuItems.map((item, index) => (
            <Link key={index} to={item.link} className="mx-2 fw-medium nav-link">
              {item.text}
            </Link>
          ))}

          <Dropdown align="end" className="ms-3">
            <Dropdown.Toggle
              variant="link"
              id="dropdown-user"
              className="nav-link d-flex align-items-center p-0 border-0"
              style={{ textDecoration: "none" }}
            >
              <FaUserCircle size={24} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/profile">My Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
