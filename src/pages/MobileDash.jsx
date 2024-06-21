import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { FaClipboardList, FaUtensils, FaTools, FaCog, FaChartLine, FaUsers, FaFileAlt, FaMoneyBillAlt, FaUserFriends, FaReceipt, FaQuestionCircle } from 'react-icons/fa';

const MobileDashboard = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <ListGroup>
            <ListGroup.Item action href="#">
              <FaClipboardList className="me-2" /> Order
            </ListGroup.Item>
            <ListGroup.Item action href="#">
              <FaUtensils className="me-2" /> Take away
            </ListGroup.Item>
            <ListGroup.Item action href="#">
              <FaTools className="me-2" /> Kitchen
            </ListGroup.Item>
            <ListGroup.Item action href="#">
              <FaTools className="me-2" /> Bar Menu
            </ListGroup.Item>
            <ListGroup.Item action href="#">
              <FaCog className="me-2" /> Setting
            </ListGroup.Item>
            <ListGroup.Item action href="#">
              <FaCog className="me-2" /> Restaurant Account
            </ListGroup.Item>
            <ListGroup.Item action href="#">
              <FaChartLine className="me-2" /> Day-end Report
            </ListGroup.Item>
            <ListGroup.Item action href="#">
              <FaFileAlt className="me-2" /> Invoice List
            </ListGroup.Item>
            <ListGroup.Item action href="#">
              <FaChartLine className="me-2" /> Report
            </ListGroup.Item>
            <ListGroup.Item action href="#">
              <FaUserFriends className="me-2" /> Customer
            </ListGroup.Item>
            <ListGroup.Item action href="#">
              <FaMoneyBillAlt className="me-2" /> Expense
            </ListGroup.Item>
            <ListGroup.Item action href="#">
              <FaUsers className="me-2" /> User Management
            </ListGroup.Item>
            <ListGroup.Item action href="#">
              <FaQuestionCircle className="me-2" /> Help
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default MobileDashboard;
