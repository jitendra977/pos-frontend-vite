/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Card, Table, Button } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import "../../assets/css/style.css";

const CurrentOrderItems = ({ orderItems, updateQuantity }) => {
  const grandTotal = orderItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  ).toFixed(2);

  const handleQuantityChange = (index, change) => {
    updateQuantity(index, change);
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <div className="d-flex justify-content-between align-items-center">
          <span>Current Order Items</span>
          <span className="grand-total">Grand Total: ${grandTotal}</span>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="table-responsive">
          <Table striped bordered hover className="order-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Menu Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th className="hide-on-mobile">Total</th>
                <th className="hide-on-mobile">Action</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.length ? (
                orderItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.menuItem.itemId}</td>
                    <td>{item.menuItem.name}</td>
                    <td>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(index, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus />
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(index, 1)}
                      >
                        <FaPlus />
                      </Button>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td className="hide-on-mobile">
                      ${(item.quantity * item.price).toFixed(2)}
                    </td>
                    <td className="hide-on-mobile">
                      <Button variant="danger">Delete</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No orders found for this table
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CurrentOrderItems;