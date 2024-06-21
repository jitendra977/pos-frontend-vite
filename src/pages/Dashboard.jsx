import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsClipboard, BsClipboardCheck, BsTools, BsGear, BsGraphUp, BsPeople, BsFileText, BsCurrencyDollar,  BsBox, BsQuestionCircle, BsThreeDotsVertical } from 'react-icons/bs';
import './dashboard.css'; // Import custom CSS file for Dashboard

const Dashboard = () => {
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
            <BsClipboard className="me-2 icon" /> <span className="item-text">Order</span>
          </ListGroup.Item>
          <ListGroup.Item action as={NavLink} to="/takeaway" className="mobile-list-item">
            <BsClipboardCheck className="me-2 icon" /> <span className="item-text">Take away</span>
          </ListGroup.Item>
          <ListGroup.Item action as={NavLink} to="/kitchen" className="mobile-list-item">
            <BsTools className="me-2 icon" /> <span className="item-text">Kitchen</span>
          </ListGroup.Item>
          <ListGroup.Item action as={NavLink} to="/bar-menu" className="mobile-list-item">
            <BsTools className="me-2 icon" /> <span className="item-text">Bar Menu</span>
          </ListGroup.Item>
          <ListGroup.Item action as={NavLink} to="/settings" className="mobile-list-item">
            <BsGear className="me-2 icon" /> <span className="item-text">Setting</span>
          </ListGroup.Item>
          <ListGroup.Item action as={NavLink} to="/restaurant-account" className="mobile-list-item">
            <BsGear className="me-2 icon" /> <span className="item-text">Restaurant Account</span>
          </ListGroup.Item>
          <ListGroup.Item action as={NavLink} to="/day-end-report" className="mobile-list-item">
            <BsGraphUp className="me-2 icon" /> <span className="item-text">Day-end Report</span>
          </ListGroup.Item>
          <ListGroup.Item action as={NavLink} to="/invoice-list" className="mobile-list-item">
            <BsFileText className="me-2 icon" /> <span className="item-text">Invoice List</span>
          </ListGroup.Item>
          <ListGroup.Item action as={NavLink} to="/report" className="mobile-list-item">
            <BsGraphUp className="me-2 icon" /> <span className="item-text">Report</span>
          </ListGroup.Item>
          <ListGroup.Item action as={NavLink} to="/customer" className="mobile-list-item">
            <BsPeople className="me-2 icon" /> <span className="item-text">Customer</span>
          </ListGroup.Item>
          <ListGroup.Item action as={NavLink} to="/expense" className="mobile-list-item">
            <BsCurrencyDollar className="me-2 icon" /> <span className="item-text">Expense</span>
          </ListGroup.Item>
          <ListGroup.Item action as={NavLink} to="/inventory" className="mobile-list-item">
            <BsBox className="me-2 icon" /> <span className="item-text">Inventory</span>
          </ListGroup.Item>
          <ListGroup.Item action as={NavLink} to="/other" className="mobile-list-item">
            <BsThreeDotsVertical className="me-2 icon" /> <span className="item-text">Other</span>
          </ListGroup.Item>
          <ListGroup.Item action as={NavLink} to="/user-management" className="mobile-list-item">
            <BsPeople className="me-2 icon" /> <span className="item-text">User Management</span>
          </ListGroup.Item>
          <ListGroup.Item action as={NavLink} to="/help" className="mobile-list-item">
            <BsQuestionCircle className="me-2 icon" /> <span className="item-text">Help</span>
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
                    <Card.Title><BsClipboard className="me-2 icon" /> Order</Card.Title>
                    <Card.Text>
                      Manage incoming orders
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/takeaway" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsClipboardCheck className="me-2 icon" /> Take away</Card.Title>
                    <Card.Text>
                      Handle take away orders
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/kitchen" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsTools className="me-2 icon" /> Kitchen</Card.Title>
                    <Card.Text>
                      Manage kitchen operations
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/bar-menu" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsTools className="me-2 icon" /> Bar Menu</Card.Title>
                    <Card.Text>
                      Update bar menu items
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/settings" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsGear className="me-2 icon" /> Setting</Card.Title>
                    <Card.Text>
                      Adjust system settings
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/restaurant-account" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsGear className="me-2 icon" /> Restaurant Account</Card.Title>
                    <Card.Text>
                      Manage restaurant finances
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/day-end-report" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsGraphUp className="me-2 icon" /> Day-end Report</Card.Title>
                    <Card.Text>
                      Review daily reports
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/invoice-list" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsFileText className="me-2 icon" /> Invoice List</Card.Title>
                    <Card.Text>
                      View issued invoices
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/report" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsGraphUp className="me-2 icon" /> Report</Card.Title>
                    <Card.Text>
                      Generate business reports
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/customer" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsPeople className="me-2 icon" /> Customer</Card.Title>
                    <Card.Text>
                      Manage customer database
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/expense" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsCurrencyDollar className="me-2 icon" /> Expense</Card.Title>
                    <Card.Text>
                      Track expenses
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/inventory" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsBox className="me-2 icon" /> Inventory</Card.Title>
                    <Card.Text>
                      Manage inventory
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/other" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsThreeDotsVertical className="me-2 icon" /> Other</Card.Title>
                    <Card.Text>
                      Miscellaneous options
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/user-management" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsPeople className="me-2 icon" /> User Management</Card.Title>
                    <Card.Text>
                      Manage user accounts
                    </Card.Text>
                  </Card.Body>
                </NavLink>
              </Card>
            </Col>
            <Col md={4} lg={3} className="mb-4">
              <Card className="desktop-card">
                <NavLink to="/help" className="nav-link">
                  <Card.Body>
                    <Card.Title><BsQuestionCircle className="me-2 icon" /> Help</Card.Title>
                    <Card.Text>
                      Get help and support
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

export default Dashboard;
