/* eslint-disable react/prop-types */
import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";


const MenuItems = ({ filteredMenuItems, handleAddToCart }) => {
  return (
    <Row>
      {filteredMenuItems.map((item) => (
        <Col md={4} key={item.itemId} className="mb-4">
          <Card className="menu-item-card">
            <Card.Img variant="top" src={item.imageUrl} alt={item.name} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <Card.Text>
                <strong>Price: </strong>${item.price.toFixed(2)}
              </Card.Text>
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