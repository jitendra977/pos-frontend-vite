/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "../../constant/axios";
import { Row, Form,Col, Table, Button, Container } from "react-bootstrap";
import BackButton from "../../components/BackButton";
import { NavLink } from "react-router-dom";

const PaymentMethod = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);

  const getPaymentMethods = async () => {
    try {
      const res = await axios.get("/payment-method");
      setPaymentMethods(res.data);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    }
  };

  useEffect(() => {
    getPaymentMethods();
  }, []);

  return (
    <Container>
      <Row className="mb-4">
        <BackButton/>
        <Col md={4} sm={12}>
          <Button as={NavLink} to="/add-payment-method" className="btn btn-primary w-100">
            Add Payment Method
          </Button>
        </Col>
        <Col md={4} sm={12}>
          <Form.Select
            aria-label="Filter Table"
        
            className="w-100"
          >
            <option value="">Filter by...</option>
            <option value="status">Id</option>
            <option value="tableNumber">Method Name</option>
          </Form.Select>
        </Col>
        <Col md={4} sm={12}>
          <Form.Control
            type="text"
            placeholder="Search Table"
            value=""
           
            className="w-100"
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover responsive="sm" className="shadow-sm">
            <thead className="bg-dark text-white">
              <tr>
                <th>ID</th>
                <th>Method Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paymentMethods.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.methodName}</td>
                  <td>{payment.description}</td>
                  <td>
                    <Button
                      as={NavLink}
                      to={`/edit-payment-method/${payment.id}`}
                      variant="primary"
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button variant="danger">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentMethod;