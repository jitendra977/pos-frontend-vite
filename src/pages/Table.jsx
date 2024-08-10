// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
<<<<<<< HEAD

=======
>>>>>>> 4c54dd4 (merge local all)
import { Container, Row, Col, Card, Badge, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/css/ordertable.css';
import { BASE_URL } from '../constant/constant';
<<<<<<< HEAD

=======
>>>>>>> 4c54dd4 (merge local all)

const Table = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
<<<<<<< HEAD
                const response = await fetch(`${BASE_URL}/api/tables`);
=======
                const response = await fetch(`${BASE_URL}/tables`);
>>>>>>> 4c54dd4 (merge local all)
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
            <Row xs={1} md={2} lg={3} className="g-3">
                {tables.map((table) => (
                    <Col key={table.tableId}>
                        <Card className={`table-card ${getStatusColorClass(table.status)}`}>
                            <Card.Body>
<<<<<<< HEAD

                                <Card.Title>Table {table.tableNumber}</Card.Title>

                                

=======
                                <Card.Title>Table {table.tableNumber}</Card.Title>
>>>>>>> 4c54dd4 (merge local all)
                                <div className="table-details">
                                    <Card.Title className="text-center"><FaChair className="me-2 icon" /> {table.name}</Card.Title>
                                    <div className="table-info">
                                        <strong>Status:</strong> <Badge bg={getStatusBadgeVariant(table.status)}>{table.status}</Badge>
                                    </div>
                                    <div className="table-info">
                                        <strong>Current Order:</strong> {table.currentOrder || 'None'}
                                    </div>
                                    <div className="table-info">
                                        <strong>Capacity:</strong> {table.capacity}
                                    </div>
                                    <div className="table-info">
                                        <strong>Location:</strong> {table.location}
                                    </div>
                                    <div className="table-info">
                                        <strong>Smoking Allowed:</strong> {table.smokingAllowed ? 'Yes' : 'No'}
                                    </div>
                                    <div className="table-info mt-2">
                                        <Link to={`/order-page/${table.tableId}`}>
                                            <Button variant="primary">View Orders</Button>
                                        </Link>
                                    </div>
                                </div>
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
        <Container fluid className="full-screen">
            <h1 className="text-center my-4">Table Status</h1>
            {renderTables()}
        </Container>
    );
};

export default Table;