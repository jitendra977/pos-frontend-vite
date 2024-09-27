/* eslint-disable react/prop-types */
import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaUtensils } from "react-icons/fa"; // Example icon, replace as needed
import "../../assets/css/menucard.css";

const MenuItems = ({ filteredMenuItems, handleAddToCart }) => {
  return (
    <Row>
      {filteredMenuItems.map((item) => (
        <Col md={4} sm={6} xs={12} key={item.itemId} className="mb-3">
          <Card className="menu-item-card" onClick={() => handleAddToCart(item)}>
            <Row noGutters className="h-100">
              <Col xs={4} className="d-flex align-items-center justify-content-center icon-container">
                <FaUtensils size={40} />
              </Col>
              <Col xs={8} className="d-flex flex-column justify-content-center">
                <Card.Body className="d-flex flex-column h-100 p-3">
                  <Card.Title className="menu-item-title">{item.name}</Card.Title>
                  <Card.Text className="menu-item-price">${item.price.toFixed(2)}</Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MenuItems;