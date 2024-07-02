import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://82.180.161.107:8080/customer/");
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
        const response = await fetch(`http://82.180.161.107:8080/customer/${id}`, {
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

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone_number.includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.address.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="table-responsive">
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
    </>
  );
};

export default Customers;
