/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsBox,BsClipboardCheck, BsTools,BsPerson } from 'react-icons/bs';
import './dashboard.css'; // Import custom CSS file for Dashboard

const Other = () => {
  const [isMobileView, setIsMobileView] = useState(false);

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
          <ListGroup.Item action as={NavLink} to="/table" className="mobile-list-item">
            <BsPerson className="me-2 icon" /> <span className="item-text">Delivery Person</span>
          </ListGroup.Item>
          <ListGroup.Item action as={NavLink} to="/takeaway" className="mobile-list-item">
            <BsClipboardCheck className="me-2 icon" /> <span className="item-text">Payment Type</span>
          </ListGroup.Item>
          <ListGroup.Item action as={NavLink} to="/kitchen" className="mobile-list-item">
            <BsTools className="me-2 icon" /> <span className="item-text">Tables</span>
          </ListGroup.Item>
          <ListGroup.Item action as={NavLink} to="/bar-menu" className="mobile-list-item">
            <BsBox className="me-2 icon" /> <span className="item-text">Floors</span>
          </ListGroup.Item>
          <ListGroup.Item action as={NavLink} to="/customer" className="mobile-list-item">
            <BsBox className="me-2 icon" /> <span className="item-text">Customer</span>
          </ListGroup.Item>
          
        </ListGroup>
      );
    } else {
      return (
        <Container fluid>
          <Row>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/table" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsPerson className="me-2 icon" /> Delivery Person</Card.Title>
                    <Card.Text>
                      Manage delivery persons
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/takeaway" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsClipboardCheck className="me-2 icon" /> Payment Type</Card.Title>
                    <Card.Text>
                      Manage payment types
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/kitchen" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsTools className="me-2 icon" /> Tables</Card.Title>
                    <Card.Text>
                      Manage tables
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/bar-menu" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsBox className="me-2 icon" /> Floors</Card.Title>
                    <Card.Text>
                      Manage floors
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/customer" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsBox className="me-2 icon" /> Customer</Card.Title>
                    <Card.Text>
                      Manage floors
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

export default Other;
