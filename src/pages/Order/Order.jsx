<<<<<<< HEAD
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
=======
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "../../constant/axios";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../../assets/css/OrderPage.css";

import TableDetails from "./TableDetails";
import CategorySidebar from "./CategorySidebar";
import CurrentOrderItems from "./CurrentOrderItems";
import MenuItems from "./MenuItems";

const OrderPage = () => {
  const { tableId } = useParams();
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [tableDetails, setTableDetails] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tableRes = await axios.get(`tables/${tableId}`);
        const tableData = tableRes.data.data;
        console.log("Table Data: ", tableData);
        setTableDetails(tableData);

        const [categoriesRes, menuItemsRes] = await Promise.all([
          axios.get("categories"),
          axios.get("menu-items")
        ]);
        setCategories(categoriesRes.data);
        setMenuItems(menuItemsRes.data);

        if (tableData.currentOrderId) {
          console.log("Fetching order with ID: ", tableData.currentOrderId);
          const orderRes = await axios.get(`orders/${tableData.currentOrderId}`);
          console.log("Order Data: ", orderRes.data);
          setOrderItems(orderRes.data.orderItems || []);
        } else {
          console.log("No currentOrderId found for the table.");
        }
      } catch (err) {
        console.error("Error fetching data: ", err);
        setMessage('Error fetching data.');
      }
    };

    fetchData();
  }, [tableId]);

  useEffect(() => {
    setFilteredMenuItems(
      selectedCategory === null 
        ? menuItems 
        : menuItems.filter(item => item.categoryId === selectedCategory)
    );
  }, [selectedCategory, menuItems]);

  const handleAddToCart = (item) => {
    setOrderItems(prevOrderItems => {
      const existingItemIndex = prevOrderItems.findIndex(orderItem => orderItem.menuItem.itemId === item.itemId);

      if (existingItemIndex !== -1) {
        const updatedOrderItems = prevOrderItems.map((orderItem, index) => {
          if (index === existingItemIndex) {
            return { ...orderItem, quantity: orderItem.quantity + 1 };
          }
          return orderItem;
        });
        return updatedOrderItems;
      }

      const newItem = { menuItem: item, quantity: 1, price: item.price };
      return [...prevOrderItems, newItem];
    });
  };

  const updateQuantity = (index, change) => {
    setOrderItems(prevOrderItems => {
      const updatedOrderItems = [...prevOrderItems];
      const newQuantity = updatedOrderItems[index].quantity + change;
      if (newQuantity > 0) {
        updatedOrderItems[index] = { ...updatedOrderItems[index], quantity: newQuantity };
      }
      return updatedOrderItems;
    });
  };

  const handleSaveOrder = async () => {
    const orderData = {
      orderDate: "2024-07-19T08:05:19.993",
      status: "PENDING",
      table: { tableId: Number(tableId) },
      user: { userId: 1 },
      paymentMethod: { id: 1 },
      kitchen: { id: 1 },
      orderItems: orderItems.map(item => ({
        menuItem: { itemId: item.menuItem.itemId },
        quantity: item.quantity
      }))
    };
  
    try {
      const response = await axios.post("http://localhost:8081/api/orders", orderData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setMessage('Order saved successfully!');
    } catch (err) {
      console.error("Error saving order: ", err);
      setMessage(`Error saving order: ${err.response?.data?.message || err.message}`);
    }
>>>>>>> 4c54dd4 (merge local all)
  };

  return (
    <Container className="my-4">
<<<<<<< HEAD
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
=======
      <h1>Order Page</h1>
      {message && <Alert variant={message.includes('successfully') ? 'success' : 'danger'}>{message}</Alert>}
      <TableDetails tableId={tableDetails?.tableNumber} currentOrderId={tableDetails?.currentOrderId} />
      <Row>
        <Col md={3}>
          <CategorySidebar 
            categories={categories} 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
        </Col>
        <Col md={9}>
          <CurrentOrderItems 
            orderItems={orderItems} 
            updateQuantity={updateQuantity} 
          />
          <MenuItems filteredMenuItems={filteredMenuItems} handleAddToCart={handleAddToCart} />
          <Button variant="primary" onClick={handleSaveOrder} className="mt-3">
            Save Order
          </Button>
>>>>>>> 4c54dd4 (merge local all)
        </Col>
      </Row>
    </Container>
  );
};

export default OrderPage;