import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Alert,
  Spinner,
  Card,
  Row,
  Col,
  Button,
  Badge,
  Table,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constant/constant";
import "../../assets/css/OrderPage.css";
import { FaInfoCircle } from 'react-icons/fa'; // Import a sample icon

const OrderPage = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/orders/table/${tableId}`
        );
        setOrders(response.data);
      } catch (error) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    if (tableId) {
      fetchOrders();
    } else {
      setError("Table ID is missing");
      setLoading(false);
    }
  }, [tableId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        setError("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/menu-items"
        );
        setMenuItems(response.data);
      } catch (error) {
        setError("Failed to fetch menu items");
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filteredItems = menuItems.filter(
        (item) => item.categoryId === selectedCategory
      );
      setFilteredMenuItems(filteredItems);
    } else {
      setFilteredMenuItems([]);
    }
  }, [selectedCategory, menuItems]);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
  };

  const handleItemClick = (item) => {
    // Handle item click
    console.log(item);
  };

  return (
    <Container className="my-4">
      <Button
        variant="outline-secondary"
        className="mb-4 back-button"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </Button>
      <h2 className="text-center mb-4">Orders for Table ID: {tableId}</h2>
      <Row>
        <Col md={3} className="category-sidebar">
          <Card>
            <Card.Header>Categories</Card.Header>
            <Card.Body>
              <div className="category-tabs">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    className={`category-tab ${
                      selectedCategory === category.id ? "active" : ""
                    }`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          {orders.length > 0 ? (
            orders.map((order) => (
              <Card className="order-card mb-4" key={order.id}>
                <Card.Header className="order-header">
                  <Row>
                    <Col>
                      <h5>Order ID: {order.id}</h5>
                    </Col>
                    <Col className="text-end">
                      <h5>
                        <Badge bg="success">
                          ${order.totalAmount.toFixed(2)}
                        </Badge>
                      </h5>
                    </Col>
                  </Row>
                </Card.Header>
                <Card.Body>
                  <Table
                    striped
                    bordered
                    hover
                    responsive
                    className="order-table"
                  >
                    <thead>
                      <tr>
                        <th>Menu Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems.map((item) => (
                        <tr key={item.id}>
                          <td>{item.menuItem.name}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            ))
          ) : (
            <Alert variant="info" className="text-center">
              No orders available for this table.
            </Alert>
          )}
          <Card className="mt-4 full-width-card">
            <Card.Header>Menu Items</Card.Header>
            <Card.Body>
              <div className="button-grid">
                {filteredMenuItems.length > 0 ? (
                  filteredMenuItems.map((item) => (
                    <Button
                      key={item.id}
                      variant="outline-primary"
                      className="item-button"
                      onClick={() => handleItemClick(item)}
                    >
                      <FaInfoCircle className="item-icon" />
                      <div className="item-info">
                        <h5>{item.name}</h5>
                        <p className="item-price">${item.price.toFixed(2)}</p>
                      </div>
                    </Button>
                  ))
                ) : (
                  <Card>
                    <Card.Body className="text-center">
                      No menu items available for this category.
                    </Card.Body>
                  </Card>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderPage;