/* eslint-disable react/prop-types */
import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "../../assets/css/menucard.css"
const MenuItems = ({ filteredMenuItems, handleAddToCart }) => {
  return (
    <Row>
      {filteredMenuItems.map((item) => (
        <Col md={4} sm={6} xs={12} key={item.itemId} className="mb-4">
          <Card className="menu-item-card">
            <Card.Body>
              <Card.Title className="menu-item-title">{item.name}</Card.Title>
              <Card.Text className="menu-item-price">${item.price.toFixed(2)}</Card.Text>
              <Button variant="primary" onClick={() => handleAddToCart(item)}>
                Add to Order
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MenuItems;
