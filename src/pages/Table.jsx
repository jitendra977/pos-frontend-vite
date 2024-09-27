import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Alert, Button } from 'react-bootstrap';
import { FaChair } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../assets/css/ordertable.css';
import { BASE_URL } from '../constant/constant';

const Table = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/tables`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                console.log("Fetched data:", result);
                setTables(result.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderTables = () => {
        if (loading) {
            return <Alert variant="info">Loading tables...</Alert>;
        }

        if (error) {
            return <Alert variant="danger">Error fetching tables: {error.message}</Alert>;
        }

        if (!Array.isArray(tables) || tables.length === 0) {
            return <Alert variant="warning">No tables available.</Alert>;
        }

        return (
            <Row xs={1} md={2} lg={4} className="g-4">
                {tables.map((table) => (
                    <Col key={table.tableId}>
                        <Card className={`table-card ${getStatusColorClass(table.status)}`}>
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <div>
                                    <Card.Title className="text-center">
                                        <FaChair className="me-2 icon" /> Table {table.tableNumber}
                                    </Card.Title>
                                    <div className="table-info my-2">
                                        <strong>Status:</strong> <Badge bg={getStatusBadgeVariant(table.status)}>{table.status}</Badge>
                                    </div>
                                    <div className="table-info my-2">
                                        <strong>Current Order:</strong> {table.currentOrder || 'None'}
                                    </div>
                                    <div className="table-info my-2">
                                        <strong>Capacity:</strong> {table.capacity}
                                    </div>
                                    <div className="table-info my-2">
                                        <strong>Location:</strong> {table.location}
                                    </div>
                                    <div className="table-info my-2">
                                        <strong>Smoking Allowed:</strong> {table.smokingAllowed ? 'Yes' : 'No'}
                                    </div>
                                </div>
                                <Link to={`/order-page/${table.tableId}`} className="mt-3">
                                    <Button variant="primary" block>View Orders</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
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

    return (
        <Container fluid className="full-width-page px-5 py-4">
            <h1 className="text-center my-4">Table Status</h1>
            {renderTables()}
        </Container>
    );
};

export default Table;