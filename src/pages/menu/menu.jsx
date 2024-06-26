import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('');

  useEffect(() => {
    fetchMenus();
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/menu/category");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setCategories(result);
    } catch (error) {
      console.error("Error fetching categories:", error);
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

  const handleFilterChange = (e) => {
    setFilterBy(e.target.value);
  };

  const filteredMenus = menus.filter(menu =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    menu.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    menu.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayMenus = filteredMenus.map(menu => ({
    ...menu,
    categoryName: menu.category ? menu.category.name : 'Uncategorized'
  }));

  return (
    <>
      <h1>Menu Management</h1>
      <Row className="mb-4">
        <Col>
          <Button as={NavLink} to="/addMenuItem" variant="primary">Add Item</Button>
        </Col>
        <Col>
          <Form.Select aria-label="Filter Item" onChange={handleFilterChange}>
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
            {displayMenus.map((menu) => (
              <tr key={menu.id}>
                <td>{menu.id}</td>
                <td>{menu.name}</td>
                <td>{menu.description}</td>
                <td>{menu.price}</td>
                <td>{menu.category ? menu.category.name : 'Uncategorized'}</td>
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
