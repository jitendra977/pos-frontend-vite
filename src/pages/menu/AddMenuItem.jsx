import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { BASE_URL } from '../../constant/constant';

const AddMenuItem = () => {
  const initialMenuItemState = {
    name: '',
    description: '',
    price: '',
    categoryId: ''
  };

  const [menuItem, setMenuItem] = useState(initialMenuItemState);
  const [message, setMessage] = useState(null);
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const fetchCategory = async () => {
    try {
<<<<<<< HEAD
      const response = await fetch(`${BASE_URL}/api/categories`, {
=======
      const response = await fetch(`${BASE_URL}/categories`, {
>>>>>>> 4c54dd4 (merge local all)
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch category`);
      }

      const data = await response.json();
      console.log('Fetched categories:', data); // Debugging: Log the fetched categories
      setCategories(data); // Store fetched categories
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      const response = await fetch(`${BASE_URL}/api/menus`, {
=======
      const response = await fetch(`${BASE_URL}/menu-items`, {
>>>>>>> 4c54dd4 (merge local all)
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuItem),
      });

      if (!response.ok) {
        throw new Error(`Failed to add menu item. Status: ${response.status}`);
      }

      setMessage('Menu Item added successfully!');
      setMenuItem(initialMenuItemState); // Clear form fields
    } catch (error) {
      setMessage(`Error adding menu item: ${error.message}`);
    }
  };

  return (
    <Container>
      <h1>Add Menu Item</h1>
      {message && <Alert variant={message.includes('successfully') ? 'success' : 'danger'}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={menuItem.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={menuItem.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            name="price"
            value={menuItem.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="categoryId"
            value={menuItem.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            ) : (
              <option disabled>Loading categories...</option>
            )}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Add Menu Item
        </Button>
      </Form>
    </Container>
  );
};

export default AddMenuItem;
