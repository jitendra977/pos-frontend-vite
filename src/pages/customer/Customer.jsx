/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BASE_URL } from '../../constant/constant';
import '../../assets/css/customer.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomers();
   
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/customer/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setCustomers(result);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const confirmDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        const response = await fetch(`${BASE_URL}/customer/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchCustomers(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  const handleSwipeStart = (event) => {
    event.currentTarget.setAttribute('data-startX', event.touches[0].clientX);
  };

  const handleSwipeMove = (event, id) => {
    const startX = parseFloat(event.currentTarget.getAttribute('data-startX'));
    const currentX = event.touches[0].clientX;
    const diffX = currentX - startX;

    // Swipe left for delete
    if (diffX < -50) {
      event.currentTarget.classList.add('swipe-left');
    } else if (diffX > 50) {
      // Swipe right for edit
      event.currentTarget.classList.add('swipe-right');
    }
  };

  const handleSwipeEnd = (event, id) => {
    const startX = parseFloat(event.currentTarget.getAttribute('data-startX'));
    const currentX = event.changedTouches[0].clientX;
    const diffX = currentX - startX;

    // Handle delete or edit based on swipe direction
    if (diffX < -50) {
      confirmDelete(id);
    } else if (diffX > 50) {
      // Implement edit action here
      console.log("Edit action for customer with ID:", id);
    }

    // Reset card position
    event.currentTarget.classList.remove('swipe-left', 'swipe-right');
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone_number.includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderMobileListView = () => (
    <div className="mobile-list-view">
      {filteredCustomers.map((customer) => (
        <Card
          key={customer.id}
          className="mb-3"
          onTouchStart={handleSwipeStart}
          onTouchMove={(e) => handleSwipeMove(e, customer.id)}
          onTouchEnd={(e) => handleSwipeEnd(e, customer.id)}
        >
          <Card.Body className="d-flex align-items-center">
            <div className="flex-grow-1">
              <Card.Title>{customer.name}</Card.Title>
              <Card.Text>
                <strong>Phone:</strong> {customer.phone_number} <br />
                <strong>Address:</strong> {customer.address} <br />
                <strong>Email:</strong> {customer.email}
              </Card.Text>
            </div>
            <img
              src="/src/assets/images/arjun.JPG" // Replace with the actual path to the customer photo
              alt="Customer"
              className="customer-photo"
            />
            <div className="actions">
              <Button
                style={{ marginRight: "10px" }}
                variant="danger"
              >
                Delete
              </Button>
              <Button>Edit</Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );

  return (
    <>
      <h1>Customer Management</h1>
      <Row className="mb-4">
        <Col>
          <Button as={NavLink} to="/add-customer" variant="primary">Add Customer</Button>
        </Col>
        <Col>
          <Form.Select aria-label="Filter Item">
            <option value="">Filter by...</option>
            <option value="name">Name</option>
            <option value="phone">Phone Number</option>
            <option value="email">Email</option>
            <option value="address">Address</option>
          </Form.Select>
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="Search Item"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>
      <div className="table-container">
        <div className="desktop-table-view">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.phone_number}</td>
                  <td>{customer.address}</td>
                  <td>{customer.email}</td>
                  <td>
                    <Button
                      style={{ marginRight: "10px" }}
                      onClick={() => confirmDelete(customer.id)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                    <Button>Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="mobile-list-view">
          {renderMobileListView()}
        </div>
      </div>
    </>
  );
};

export default Customers;
