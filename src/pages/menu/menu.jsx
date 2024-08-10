import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col, Container, Card, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import axios from '../../constant/axios'; // Import axios
import ItemImg from '../../assets/images/Item/image.png';

const Menus = () => {
  const [menus, setMenus] = useState([]);
  const [categories, setCategories] = useState([]); // New state for categories
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [hoveredMenuId, setHoveredMenuId] = useState(null);
  const [editingMenuId, setEditingMenuId] = useState(null);
  const [editableMenu, setEditableMenu] = useState({});

  // Fetch menus data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const menusResponse = await axios.get('menu-items');
        setMenus(menusResponse.data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };
    fetchData();
  }, []);

  // Fetch categories data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await axios.get('categories'); // Adjust API endpoint if needed
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`menu-items/${id}`);
        setMenus(menus.filter(menu => menu.itemId !== id));
      } catch (error) {
        console.error("Error deleting menu:", error);
      }
    }
  };

  // Start editing a menu item
  const handleEditClick = (menu) => {
    setEditingMenuId(menu.itemId);
    setEditableMenu({ ...menu });
  };

  // Handle input change for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableMenu(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle category change for editing
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setEditableMenu(prev => ({
      ...prev,
      categoryName: value
    }));
  };

  // Save updated menu item
  const handleSave = async () => {
    try {
      const response = await axios.put(`menu-items/${editableMenu.itemId}`, editableMenu);
      const updatedMenus = menus.map(menu =>
        menu.itemId === editableMenu.itemId ? response.data : menu
      );
      setMenus(updatedMenus);
      setEditingMenuId(null);
      setEditableMenu({});
    } catch (error) {
      console.error("Error updating menu:", error);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingMenuId(null);
    setEditableMenu({});
  };

  // Filter menus based on search term and filter criteria
  const filteredMenus = menus.filter(menu => {
    const term = searchTerm.toLowerCase();
    if (!filterBy) {
      return (
        menu.name.toLowerCase().includes(term) ||
        menu.description.toLowerCase().includes(term) ||
        menu.categoryName.toLowerCase().includes(term)
      );
    }
    return menu[filterBy]?.toLowerCase().includes(term);
  });

  return (
    <Container>
      <h1>Menu Management</h1>
      <Row className="mb-4">
        <Col md={4} sm={12}>
          <Button as={NavLink} to="/addMenuItem" className="btn btn-primary w-100">Add Item</Button>
        </Col>
        <Col md={4} sm={12}>
          <Form.Select aria-label="Filter Item" onChange={(e) => setFilterBy(e.target.value)} className="w-100">
            <option value="">Filter by...</option>
            <option value="name">Name</option>
            <option value="description">Description</option>
            <option value="categoryName">Category</option>
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
            {filteredMenus.map((menu) => (
              <tr key={menu.itemId}>
                <td>{menu.itemId}</td>
                <td>
                  {editingMenuId === menu.itemId ? (
                    <Form.Control
                      type="text"
                      name="name"
                      value={editableMenu.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    menu.name
                  )}
                </td>
                <td>
                  {editingMenuId === menu.itemId ? (
                    <Form.Control
                      type="text"
                      name="description"
                      value={editableMenu.description}
                      onChange={handleInputChange}
                    />
                  ) : (
                    menu.description
                  )}
                </td>
                <td>
                  {editingMenuId === menu.itemId ? (
                    <Form.Control
                      type="number"
                      name="price"
                      value={editableMenu.price}
                      onChange={handleInputChange}
                    />
                  ) : (
                    `$${menu.price}`
                  )}
                </td>
                <td>
                  {editingMenuId === menu.itemId ? (
                    <Form.Select
                      aria-label="Select Category"
                      name="categoryName"
                      value={editableMenu.categoryName}
                      onChange={handleCategoryChange}
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </Form.Select>
                  ) : (
                    menu.categoryName
                  )}
                </td>
                <td>
                  {editingMenuId === menu.itemId ? (
                    <>
                      <Button
                        style={{ marginRight: "10px" }}
                        onClick={handleSave}
                        variant="success"
                      >
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        style={{ marginRight: "10px" }}
                        onClick={() => handleDelete(menu.itemId)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                      <Button
                        className="btn-edit"
                        onClick={() => handleEditClick(menu)}
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="list-group d-block d-md-none">
        {filteredMenus.map((menu) => (
          <Card
            key={menu.itemId}
            className="mb-3 shadow-sm"
            onMouseEnter={() => setHoveredMenuId(menu.itemId)}
            onMouseLeave={() => setHoveredMenuId(null)}
          >
            <Card.Header>{menu.name}</Card.Header>
            <Card.Body className="d-flex justify-content-between align-items-start">
              <div>
                <Card.Text>
                  <strong>ID:</strong> {menu.itemId}<br/>
                  <strong>Description:</strong> {menu.description}<br/>
                  <strong>Price:</strong> ${menu.price}<br/>
                  <strong>Category:</strong> {menu.categoryName}
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
                    onClick={() => handleEditClick(menu)}
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