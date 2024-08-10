import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Card, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsClipboardCheck, BsTools, BsPerson } from 'react-icons/bs';
import './dashboard.css'; // Import custom CSS file for Dashboard

const BarMenu = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const navigate = useNavigate(); // Call useNavigate as a function to get the navigate function

  const handleBackClick = () => {
    navigate('/'); // Use the navigate function
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed
      setIsMobileView(isMobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getMenuItems = () => {
    if (isMobileView) {
      return (
        <ListGroup className="mobile-list-group">
          <ListGroup.Item action as={NavLink} to="/menu" className="mobile-list-item">
            <BsPerson className="me-2 icon" /> <span className="item-text">Menu</span>
          </ListGroup.Item>
          <ListGroup.Item action as={NavLink} to="/categories" className="mobile-list-item">
            <BsClipboardCheck className="me-2 icon" /> <span className="item-text">Categories</span>
          </ListGroup.Item>
          <ListGroup.Item action as={NavLink} to="/ready-order-description" className="mobile-list-item">
            <BsTools className="me-2 icon" /> <span className="item-text">Ready Order Description</span>
          </ListGroup.Item>        
        </ListGroup>
      );
    } else {
      return (
        <Container fluid>
          {/* Add Back Button */}
          <Row className="mb-4">
            <Col md={4} sm={12}>
              <Button onClick={handleBackClick} variant="outline-primary">Back</Button>
            </Col>
          </Row>
          <Row>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/menu" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsPerson className="me-2 icon" /> Menu</Card.Title>
                    <Card.Text>
                      Manage delivery persons
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/categories" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsClipboardCheck className="me-2 icon" /> Categories</Card.Title>
                    <Card.Text>
                      Manage payment types
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/ready-order-description" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsTools className="me-2 icon" /> Ready Order Description</Card.Title>
                    <Card.Text>
                      Manage tables
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    }
  };

  return (
    <Container fluid className="full-screen">
      {getMenuItems()}
    </Container>
  );
}

export default BarMenu;
