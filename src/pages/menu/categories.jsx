import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col, Container, Card } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from '../../constant/axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editableCategory, setEditableCategory] = useState({});

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get('categories');
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`categories/${id}`);
        setCategories(categories.filter(category => category.id !== id));
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleEditClick = (category) => {
    setEditingCategoryId(category.id);
    setEditableCategory({ ...category });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableCategory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`categories/${editableCategory.id}`, editableCategory);
      setCategories(categories.map(category =>
        category.id === editableCategory.id ? editableCategory : category
      ));
      setEditingCategoryId(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleCancel = () => {
    setEditingCategoryId(null);
    setEditableCategory({});
  };

  const filteredCategories = categories.filter(category => {
    const term = searchTerm.toLowerCase();
    if (!filterBy) {
      return (
        category.name.toLowerCase().includes(term) ||
        category.description.toLowerCase().includes(term)
      );
    }
    return category[filterBy]?.toLowerCase().includes(term);
  });

  return (
    <Container>
      <h1>Category Management</h1>
      <Row className="mb-4">
        <Col md={4} sm={12}>
          <Button as={NavLink} to="/addCategory" className="btn btn-primary w-100">Add Category</Button>
        </Col>
        <Col md={4} sm={12}>
          <Form.Select aria-label="Filter Category" onChange={(e) => setFilterBy(e.target.value)} className="w-100">
            <option value="">Filter by...</option>
            <option value="name">Name</option>
            <option value="description">Description</option>
          </Form.Select>
        </Col>
        <Col md={4} sm={12}>
          <Form.Control
            type="text"
            placeholder="Search Category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-100"
          />
        </Col>
      </Row>

      {/* Add Back Button */}
      <Row className="mb-4">
        <Col md={4} sm={12}>
          <Button onClick={() => navigate(-1)} variant="outline-primary">Back</Button>
        </Col>
      </Row>

      <div className="table-responsive d-none d-md-block">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>
                  {editingCategoryId === category.id ? (
                    <Form.Control
                      type="text"
                      name="name"
                      value={editableCategory.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td>
                  {editingCategoryId === category.id ? (
                    <Form.Control
                      type="text"
                      name="description"
                      value={editableCategory.description}
                      onChange={handleInputChange}
                    />
                  ) : (
                    category.description
                  )}
                </td>
                <td>
                  {editingCategoryId === category.id ? (
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
                        onClick={() => handleDelete(category.id)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                      <Button
                        className="btn-edit"
                        onClick={() => handleEditClick(category)}
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
        {filteredCategories.map((category) => (
          <Card
            key={category.id}
            className="mb-3 shadow-sm"
            onMouseEnter={() => setHoveredCategoryId(category.id)}
            onMouseLeave={() => setHoveredCategoryId(null)}
          >
            <Card.Header>{category.name}</Card.Header>
            <Card.Body className="d-flex justify-content-between align-items-start">
              <div>
                <Card.Text>
                  <strong>ID:</strong> {category.id}<br/>
                  <strong>Description:</strong> {category.description}
                </Card.Text>
              </div>
              {hoveredCategoryId === category.id && (
                <div className="position-absolute top-0 end-0 m-2">
                  <Button
                    variant="danger"
                    className="me-2"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => handleEditClick(category)}
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

export default Categories;
