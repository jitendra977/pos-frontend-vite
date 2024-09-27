import React, { useState } from 'react'
import { Form,Button,Container,Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../../constant/axios';

const AddPaymentMethod = () => {
    const [formData, setFormData] = useState({ methodName: "", description: "" });
    const [isError, setIsError] = useState("");
    const navigate = useNavigate();
  
    const handleChange = ({ target: { name, value } }) => {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post("payment-method", formData);
        navigate("/payment-method");
      } catch (error) {
        setIsError(error.response?.data?.message || error.message);
      }
    };
  
    return (
      <Container>
        <h1>Payment Method</h1>
        <Button variant="outline-secondary" className="mb-4" onClick={() => navigate(-1)}>
          &larr; Back
        </Button>
        {isError && <Alert variant="danger">Error: {isError}</Alert>}
        <Form onSubmit={handleSubmit}>
          {["methodName", "description"].map((field) => (
            <Form.Group controlId={`formPaymentMethod${field}`} className="mt-3" key={field}>
              <Form.Label>{`Method Name ${field.charAt(0).toUpperCase() + field.slice(1)}`}</Form.Label>
              <Form.Control
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter ${field}`}
              />
            </Form.Group>
          ))}
          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </Container>
    );
  };



export default AddPaymentMethod;