import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Alert } from 'react-bootstrap';
import { FaChair } from 'react-icons/fa';
import './dashboard.css'; // Import custom CSS file for Table

const Table = () => {
    // Initialize with sample data for demonstration
    const [tables, setTables] = useState([]);
    const [isMobileView, setIsMobileView] = useState(false);
    const [loading, setLoading] = useState(true); // Initialize loading state
    const [error, setError] = useState(null); // Initialize error state

    // Simulating fetching data with useEffect
    useEffect(() => {
        // Simulate fetching data after 1 second delay
        const fetchData = async () => {
            try {
                // Replace with actual fetch logic in your application
                await new Promise(resolve => setTimeout(resolve, 1000));
                const sampleTables = [
                    { id: 1, name: "Table 1", status: "AVAILABLE", totalAmount: 120, capacity: 2, location: "Corner", smokingAllowed: false },
                    { id: 2, name: "Table 2", status: "AVAILABLE", totalAmount: 180, capacity: 4, location: "Near the window", smokingAllowed: true },
                    { id: 3, name: "Table 3", status: "BOOKED", totalAmount: 0, capacity: 6, location: "Central area", smokingAllowed: false },
                    { id: 4, name: "Table 4", status: "AVAILABLE", totalAmount: 90, capacity: 3, location: "By the bar", smokingAllowed: false },
                    { id: 5, name: "Table 5", status: "AVAILABLE", totalAmount: 150, capacity: 2, location: "Outdoor patio", smokingAllowed: true },
                    { id: 6, name: "Table 6", status: "AVAILABLE", totalAmount: 200, capacity: 8, location: "Private room", smokingAllowed: false }
                ];
                setTables(sampleTables);
                setLoading(false); // Set loading state to false after simulated fetch
            } catch (error) {
                setError(error); // Set error state if fetch fails
                setLoading(false); // Set loading state to false after simulated fetch
            }
        };

        fetchData(); // Call fetchData function

        const handleResize = () => {
            const isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed
            setIsMobileView(isMobile);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Function to render table cards
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
            <Container fluid>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {tables.map((table) => (
                        <Col key={table.id}>
                            <Card className={`table-card ${getStatusColorClass(table.status)}`}>
                                <Card.Body>
                                    <Card.Title className="text-center"><FaChair className="me-2 icon" /> {table.name}</Card.Title>
                                    <hr />
                                    <div className="d-flex justify-content-between mb-3">
                                        <div>
                                            <strong>Status:</strong> <Badge bg={getStatusBadgeVariant(table.status)}>{table.status}</Badge>
                                        </div>
                                        <div>
                                            <strong>Total Amount:</strong> ${table.totalAmount}
                                        </div>
                                    </div>
                                    <div>
                                        <strong>Capacity:</strong> {table.capacity}
                                    </div>
                                    <div>
                                        <strong>Location:</strong> {table.location}
                                    </div>
                                    <div>
                                        <strong>Smoking Allowed:</strong> {table.smokingAllowed ? 'Yes' : 'No'}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    };

    // Function to determine badge variant based on table status
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

    // Function to determine card color class based on table status
    const getStatusColorClass = (status) => {
        switch (status) {
            case 'AVAILABLE':
                return 'available'; // CSS class for available tables
            case 'BOOKED':
                return 'booked'; // CSS class for booked tables
            default:
                return ''; // Default color or no class applied
        }
    };

    // Function to determine which view to render based on screen size
    const getMenuItems = () => {
        if (isMobileView) {
            return renderTables(); // Render tables in a single column for mobile view
        } else {
            return renderTables(); // Render tables in a grid layout for desktop view
        }
    };

    return (
        <Container fluid className="full-screen">
            {getMenuItems()}
        </Container>
    );
}

export default Table;
