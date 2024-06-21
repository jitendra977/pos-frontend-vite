import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await fetch("http://localhost:8080/menu/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setMenus(result);
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  };

  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteMenu(id);
    }
  };

  const deleteMenu = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/menu/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchMenus(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting menu:", error);
    }
  };

  // Dummy data to display when actual data is being fetched
  const dummyData = [
    { id: 1, name: 'Cheeseburger', description: 'Juicy beef patty with cheese', price: 9.99, category: 'Main Course' },
    { id: 2, name: 'Vegan Salad', description: 'Fresh mixed greens with vinaigrette', price: 7.99, category: 'Salads' },
    { id: 3, name: 'Spaghetti Bolognese', description: 'Pasta with a rich meat sauce', price: 12.99, category: 'Main Course' },
    { id: 4, name: 'Chocolate Cake', description: 'Rich and moist chocolate cake', price: 5.99, category: 'Desserts' },
    { id: 5, name: 'Caesar Salad', description: 'Romaine lettuce with Caesar dressing', price: 8.99, category: 'Salads' }
  ];

  // Use dummy data if menus array is empty (initial state or while fetching)
  const displayMenus = menus.length > 0 ? menus : dummyData;

  const filteredMenus = displayMenus.filter(menu =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    menu.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    menu.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>Menu Management</h1>
      <Row className="mb-4">
        <Col>
          <Button variant="primary" onClick={() => alert('Add Item')}>Add Item</Button>
        </Col>
        <Col>
          <Form.Select aria-label="Filter Item">
            <option value="">Filter by...</option>
            <option value="name">Name</option>
            <option value="description">Description</option>
            <option value="category">Category</option>
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
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMenus.map((menu) => (
              <tr key={menu.id}>
                <td>{menu.id}</td>
                <td>{menu.name}</td>
                <td>{menu.description}</td>
                <td>{menu.price}</td>
                <td>{menu.category}</td>
                <td>
                  <Button
                    style={{ marginRight: "10px" }}
                    onClick={() => confirmDelete(menu.id)}
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

export default Menus;
