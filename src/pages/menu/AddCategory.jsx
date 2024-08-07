import React, { useState } from "react";
import axios from "../../constant/axios.jsx";
import { Button, Form, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("categories", formData);
      navigate("/categories");
    } catch (error) {
      setIsError(error.response?.data?.message || error.message);
    }
  };

  return (
    <Container>
      <h1>Add New Category</h1>
      <Button variant="outline-secondary" className="mb-4" onClick={() => navigate(-1)}>
        &larr; Back
      </Button>
      {isError && <Alert variant="danger">Error: {isError}</Alert>}
      <Form onSubmit={handleSubmit}>
        {["name", "description"].map((field) => (
          <Form.Group controlId={`formCategory${field}`} className="mt-3" key={field}>
            <Form.Label>{`Category ${field.charAt(0).toUpperCase() + field.slice(1)}`}</Form.Label>
            <Form.Control
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter category ${field}`}
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

export default AddCategory;