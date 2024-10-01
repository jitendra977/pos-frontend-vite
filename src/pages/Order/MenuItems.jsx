/* eslint-disable react/prop-types */
import React from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { FaUtensils } from "react-icons/fa"; // Example icon, replace as needed
import "../../assets/css/menucard.css";

const MenuItems = ({ filteredMenuItems, handleAddToCart, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <p>Loading Menu Items...</p>
      </div>
    );
  }

  return (
    <Row>
  {filteredMenuItems.map((item) => (
    <Col xs={6} md={4} lg={3} key={item.itemId} className="mb-3">
      <Card className="h-100">
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <span>Price: ${item.price.toFixed(2)}</span>
            <Button
              variant="primary"
              onClick={() => handleAddToCart(item)}
            >
              Add to Cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
  );
};

export default MenuItems;