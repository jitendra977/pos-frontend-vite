/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { FaChair } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "..//assets/css/rightsidebar.css"

const RightSidebar = ({ tables }) => {
    return (
        <div className="sidebar">
            <h4 className="text-center">Table List</h4>
            {tables.length === 0 ? (
                <p>No tables available</p>
            ) : (
                tables.map((table) => (
                    <Card key={table.tableId} className={`table-card-sidebar ${getStatusColorClass(table.status)}`}>
                        <Card.Body>
                            <Card.Title className="text-center">
                                <FaChair className="me-2" /> {table.tableNumber}
                            </Card.Title>
                            <div className="table-info-sidebar">
                                <strong>Status:</strong> <Badge bg={getStatusBadgeVariant(table.status)}>{table.status}</Badge>
                            </div>
                            <div className="table-info-sidebar">
                                <Link to={`/order-page/${table.tableId}`}>
                                    <Button variant="primary" size="sm">View Orders</Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                ))
            )}
        </div>
    );
};

const getStatusBadgeVariant = (status) => {
    switch (status) {
        case 'AVAILABLE':
            return 'success';
        case 'BOOKED':
        case 'OCCUPIED':
            return 'warning';
        default:
            return 'primary';
    }
};

const getStatusColorClass = (status) => {
    switch (status) {
        case 'AVAILABLE':
            return 'available';
        case 'BOOKED':
        case 'OCCUPIED':
            return 'booked';
        default:
            return '';
    }
};

export default RightSidebar;