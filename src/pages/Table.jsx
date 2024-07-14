import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Alert } from 'react-bootstrap';
import { FaChair } from 'react-icons/fa';

const Table = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Remove the setTimeout to fetch data instantly
                const sampleTables = [
                    { id: 1, name: "Table 1", status: "AVAILABLE", totalAmount: 120, capacity: 2, location: "Corner", smokingAllowed: false },
                    { id: 2, name: "Table 2", status: "AVAILABLE", totalAmount: 180, capacity: 4, location: "Near the window", smokingAllowed: true },
                    { id: 3, name: "Table 3", status: "BOOKED", totalAmount: 0, capacity: 6, location: "Central area", smokingAllowed: false },
                    { id: 4, name: "Table 4", status: "AVAILABLE", totalAmount: 90, capacity: 3, location: "By the bar", smokingAllowed: false },
                    { id: 5, name: "Table 5", status: "AVAILABLE", totalAmount: 150, capacity: 2, location: "Outdoor patio", smokingAllowed: true },
                    { id: 6, name: "Table 6", status: "AVAILABLE", totalAmount: 200, capacity: 8, location: "Private room", smokingAllowed: false }
                ];
                setTables(sampleTables);
                setLoading(false);
            } catch (error) {
                setError(error);
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

        if (tables.length === 0) {
            return <Alert variant="warning">No tables available.</Alert>;
        }

        return (
            <Row xs={1} md={2} lg={3} className="g-4">
                {tables.map((table) => (
                   <Col key={table.id}>
                   <Card className={`table-card ${getStatusColorClass(table.status)}`}>
                       <Card.Body>
                           <div className="table-details">
                               <Card.Title className="text-center mb-3">
                                   <FaChair className="me-2 icon" /> {table.name}
                               </Card.Title>
                               <hr />
                               <div className="table-info mb-2">
                                   <strong>Status:</strong>{' '}
                                   <Badge bg={getStatusBadgeVariant(table.status)}>{table.status}</Badge>
                               </div>
                               <div className="table-info mb-2">
                                   <strong>Total Amount:</strong> ${table.totalAmount}
                               </div>
                               <div className="table-info mb-2">
                                   <strong>Capacity:</strong> {table.capacity}
                               </div>
                               <div className="table-info mb-2">
                                   <strong>Location:</strong> {table.location}
                               </div>
                               <div className="table-info">
                                   <strong>Smoking Allowed:</strong>{' '}
                                   {table.smokingAllowed ? 'Yes' : 'No'}
                               </div>
                               <div className="text-center mt-3">
                                   <button className="btn btn-primary me-2">Book Table</button>
                                   <button className="btn btn-secondary">View Details</button>
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
