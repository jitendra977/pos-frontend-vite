import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { BASE_URL } from '../../constant/constant';

const AddCustomer = () => {
  const initialCustomerState = {
    name: '',
    phone_number: '',
    email: '',
    address: ''
  };

  const [customer, setCustomer] = useState(initialCustomerState);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/customer/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      });

      if (!response.ok) {
        throw new Error(`Failed to add customer. Status: ${response.status}`);
      }

      setMessage('Customer added successfully!');
      setCustomer(initialCustomerState); // Clear form fields
    } catch (error) {
      setMessage(`Error adding customer: ${error.message}`);
    }
  };

  return (
    <Container>
      <h1>Add Customer</h1>
      {message && <Alert variant={message.includes('successfully') ? 'success' : 'danger'}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phone_number"
            value={customer.phone_number}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={customer.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Add Customer
        </Button>
      </Form>
    </Container>
  );
};

export default AddCustomer;
