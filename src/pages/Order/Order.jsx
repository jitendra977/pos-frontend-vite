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
  };

  return (
    <Container className="my-4">
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
        </Col>
      </Row>
    </Container>
  );
};

export default OrderPage;