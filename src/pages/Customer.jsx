import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:8080/customer/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setCustomers(result);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      deleteCustomer(id);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/customer/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchCustomers(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // Dummy data to display when actual data is being fetched
  const dummyData = [
    { id: 1, name: 'John Doe', phone_number: '1234567890', email: 'john@example.com', address: '123 Main Street' },
    { id: 2, name: 'Jane Smith', phone_number: '9876543210', email: 'jane@example.com', address: '456 Elm Street' },
    { id: 3, name: 'Michael Johnson', phone_number: '5551234567', email: 'michael@example.com', address: '789 Oak Avenue' },
    { id: 4, name: 'Emily Davis', phone_number: '3219876543', email: 'emily@example.com', address: '321 Pine Road' },
    { id: 5, name: 'Robert Brown', phone_number: '1112223333', email: 'robert@example.com', address: '555 Cedar Lane' }
  ];

  // Use dummy data if customers array is empty (initial state or while fetching)
  const displayCustomers = customers.length > 0 ? customers : dummyData;

  const filteredCustomers = displayCustomers.filter(customer =>
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
          <Button variant="primary" onClick={() => alert('Add Customer')}>Add Customer</Button>
        </Col>
        <Col>
          <Form.Select aria-label="Filter Customer">
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
            placeholder="Search Customer"
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

export default Customer;
