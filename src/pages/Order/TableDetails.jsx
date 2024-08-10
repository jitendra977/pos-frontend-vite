/* eslint-disable react/prop-types */
import React from "react";
import { Card } from "react-bootstrap";


const TableDetails = ({ tableId, currentOrderId }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Table Details</Card.Title>
        <Card.Text>
          <strong>Table ID:</strong> {tableId}
          <strong>Current OrderId</strong> {currentOrderId}
        </Card.Text>
        
       
      </Card.Body>
    </Card>
  );
};

export default TableDetails;