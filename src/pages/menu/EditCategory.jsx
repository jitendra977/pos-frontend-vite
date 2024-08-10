import React from 'react';
import axios from '../../constant/axios';
import { Button, Container, Table, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const EditCategory = () => {
  const [category, setCategory] = React.useState(null); // Initialize as null for a single category
  const [isError, setIsError] = React.useState("");
  const [loading, setLoading] = React.useState(true); // To handle loading state
  const navigate = useNavigate();
  const { id } = useParams(); // Extract category ID from URL parameters

  // Function to fetch a specific category
  const fetchCategory = async () => {
    try {
      const res = await axios.get(`categories/${id}`);
      setCategory(res.data);
      setLoading(false);
    } catch (error) {
      setIsError(error.message);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCategory();
  }, [id]);

  // Handle deletion of the category
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`categories/${id}`);
        navigate("/categories"); // Navigate to categories list after deletion
      } catch (error) {
        setIsError(error.message);
      }
    }
  };

  if (loading) {
    return <Container><p>Loading...</p></Container>; // Show loading message while fetching data
  }

  return (
    <Container>
      <Button
        variant="outline-secondary"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </Button>
      <h1 className="d-flex justify-content-between align-items-center">
        Edit Category
      </h1>
      {isError && <Alert variant="danger">Error: {isError}</Alert>}
      {category ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ID</td>
              <td>{category.id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{category.name}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{category.description}</td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <p>No category data available.</p>
      )}
      <Button
        variant="danger"
        onClick={handleDelete}
      >
        Delete Category
      </Button>
    </Container>
  );
};

export default EditCategory;