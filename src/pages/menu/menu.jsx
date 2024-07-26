import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col, Container, Card, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BASE_URL } from '../../constant/constant';
import ItemImg from '../../assets/images/Item/image.png';

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [hoveredMenuId, setHoveredMenuId] = useState(null);

  useEffect(() => {
    fetchMenus();
    fetchCategories();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/menus`);
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
      const response = await fetch(`${BASE_URL}/api/categories`);
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
      const response = await fetch(`${BASE_URL}/api/menus/${id}`, {
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

  const handleEdit = (id) => {
    // Handle edit functionality
    console.log("Edit menu with id:", id);
  };

  const handleDelete = (id) => {
    confirmDelete(id);
  };

  const handleImageHover = (id) => {
    setHoveredMenuId(id);
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
    <Container>
      <h1>Menu Management</h1>
      <Row className="mb-4">
        <Col md={4} sm={12}>
          <Button as={NavLink} to="/addMenuItem" className="btn btn-primary w-100">Add Item</Button>
        </Col>
        <Col md={4} sm={12}>
          <Form.Select aria-label="Filter Item" onChange={handleFilterChange} className="w-100">
            <option value="">Filter by...</option>
            <option value="name">Name</option>
            <option value="description">Description</option>
            <option value="category">Category</option>
          </Form.Select>
        </Col>
        <Col md={4} sm={12}>
          <Form.Control
            type="text"
            placeholder="Search Item"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-100"
          />
        </Col>
      </Row>
      <div className="table-responsive d-none d-md-block">
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
              <tr key={menu.itemId}>
                <td>{menu.itemId}</td>
                <td>{menu.name}</td>
                <td>{menu.description}</td>
                <td>{menu.price}</td>
                <td>{menu.category ? menu.category.name : 'Uncategorized'}</td>
                <td>
                  <Button
                    style={{ marginRight: "10px" }}
                    onClick={() => confirmDelete(menu.itemId)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                  <Button
                    className="btn-edit"
                    onClick={() => handleEdit(menu.itemId)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="list-group d-block d-md-none">
        {displayMenus.map((menu) => (
          <Card
            key={menu.itemId}
            className="mb-3 shadow-sm"
            onMouseEnter={() => handleImageHover(menu.itemId)}
            onMouseLeave={() => handleImageHover(null)}
          >
            <Card.Header>{menu.name}</Card.Header>
            <Card.Body className="d-flex justify-content-between align-items-start">
              <div>
                <Card.Text>
                  <strong>ID:</strong> {menu.itemId}<br/>
                  <strong>Description:</strong> {menu.description}<br/>
                  <strong>Price:</strong> ${menu.price}<br/>
                  <strong>Category:</strong> {menu.category ? menu.category.name : 'Uncategorized'}
                </Card.Text>
              </div>
              <Image
                src={ItemImg}
                alt={menu.name}
                className="ml-3"
                style={{ width: '150px', height: 'auto', cursor: 'pointer' }}
              />
              {hoveredMenuId === menu.itemId && (
                <div className="position-absolute top-0 end-0 m-2">
                  <Button
                    variant="danger"
                    className="me-2"
                    onClick={() => handleDelete(menu.itemId)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(menu.itemId)}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Menus;