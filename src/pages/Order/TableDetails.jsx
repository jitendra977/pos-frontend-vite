/* eslint-disable react/prop-types */
import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import "../../assets/css/style.css"; // Ensure this CSS file does not include animations or extra effects
import {
  BsFillFloppy2Fill,
  BsPrinter,
  BsXCircle,
  BsArrowRepeat,
  BsQrCode,
  BsPerson,
} from "react-icons/bs";

const TableDetails = ({ tableId, currentOrderId }) => {
  return (
    <Card className="mb-1 shadow-sm">
      <Card.Body className="text-center">
        <Row className="justify-content-center mb-0">
          <Col xs={12} md={6} lg={4} className="mb-1">
            <Button
              variant="outline-primary"
              className="w-100 p-2"
              title="Table ID"
            >
              TBL_{tableId}
            </Button>
          </Col>
          <Col xs={4} md={2} className="mb-3">
            <Button
              variant="outline-primary"
              className="w-100 p-2"
              title="Save"
            >
              <BsFillFloppy2Fill size={20} />
            </Button>
          </Col>
          <Col xs={4} md={2} className="mb-3">
            <Button
              variant="outline-info"
              className="w-100 p-2"
              title="Print"
            >
              <BsPrinter size={20} />
            </Button>
          </Col>
          <Col xs={4} md={2} className="mb-3">
            <Button
              variant="outline-danger"
              className="w-100 p-2"
              title="Cancel Order"
            >
              <BsXCircle size={20} />
            </Button>
          </Col>
          <Col xs={4} md={2} className="mb-3">
            <Button
              variant="outline-warning"
              className="w-100 p-2"
              title="Change Table"
            >
              <BsArrowRepeat size={20} />
            </Button>
          </Col>
          <Col xs={4} md={2} className="mb-3">
            <Button
              variant="outline-success"
              className="w-100 p-2"
              title="Scan Item"
            >
              <BsQrCode size={20} />
            </Button>
          </Col>
          <Col xs={4} md={2} className="mb-3">
            <Button
              variant="outline-secondary"
              className="w-100 p-2"
              title="User Details"
            >
              <BsPerson size={20} />
            </Button>
          </Col>
          <Col xs={12} md={6} lg={4} className="mb-3">
            <Button
              variant="outline-primary"
              className="w-100 p-2"
              title="Current Order ID"
            >
              ORDER_{currentOrderId}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TableDetails;