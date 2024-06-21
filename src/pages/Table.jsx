import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { FaChair } from 'react-icons/fa';
import './dashboard.css'; // Import custom CSS file for Table

const Table = () => {
    // Initialize with sample data for demonstration
    const [tables, setTables] = useState([
        {
            id: 1,
            tableNumber: 1,
            capacity: 2,
            status: "AVAILABLE",
            location: "Corner",
            smokingAllowed: false
        },
        {
            id: 2,
            tableNumber: 2,
            capacity: 4,
            status: "AVAILABLE",
            location: "Near the window",
            smokingAllowed: true
        },
        {
            id: 3,
            tableNumber: 3,
            capacity: 6,
            status: "BOOKED",
            location: "Central area",
            smokingAllowed: false
        },
        {
            id: 4,
            tableNumber: 4,
            capacity: 3,
            status: "AVAILABLE",
            location: "By the bar",
            smokingAllowed: false
        },
        {
            id: 5,
            tableNumber: 5,
            capacity: 2,
            status: "AVAILABLE",
            location: "Outdoor patio",
            smokingAllowed: true
        },
        {
            id: 6,
            tableNumber: 6,
            capacity: 8,
            status: "AVAILABLE",
            location: "Private room",
            smokingAllowed: false
        }
    ]);

    const [isMobileView, setIsMobileView] = useState(false);
    const [loading, setLoading] = useState(false); // Initialize loading state
    const [error, setError] = useState(null); // Initialize error state

    // Simulating fetching data with useEffect
    useEffect(() => {
        setLoading(true); // Set loading state to true during fetch simulation

        // Simulate fetching data after 1 second delay
        const fetchData = async () => {
            try {
                // Simulate fetch request
                // Replace with actual fetch logic in your application
                await new Promise(resolve => setTimeout(resolve, 1000));
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

    // Function to render table cards for mobile view
    const renderMobileTables = () => {
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
                <Row>
                    {tables.map((table, index) => (
                        <Col key={index} xs={12} className="mb-4">
                            <Card className={`mobile-card ${getStatusColor(table.status)}`}>
                                <Card.Body>
                                    <Card.Title><FaChair className="me-2 icon" /> Table {table.tableNumber}</Card.Title>
                                    <Card.Text><strong>Capacity:</strong> {table.capacity}</Card.Text>
                                    <Card.Text><strong>Status:</strong> {table.status}</Card.Text>
                                    <Card.Text><strong>Location:</strong> {table.location}</Card.Text>
                                    <Card.Text><strong>Smoking Allowed:</strong> {table.smokingAllowed ? 'Yes' : 'No'}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    };

    // Function to render table cards for desktop view
    const renderDesktopTables = () => {
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
                <Row>
                    {tables.map((table, index) => (
                        <Col key={index} md={4} lg={3} className="mb-4">
                            <Card className={`desktop-card ${getStatusColor(table.status)}`}>
                                <Card.Body>
                                    <Card.Title><FaChair className="me-2 icon" /> Table {table.tableNumber}</Card.Title>
                                    <Card.Text><strong>Capacity:</strong> {table.capacity}</Card.Text>
                                    <Card.Text><strong>Status:</strong> {table.status}</Card.Text>
                                    <Card.Text><strong>Location:</strong> {table.location}</Card.Text>
                                    <Card.Text><strong>Smoking Allowed:</strong> {table.smokingAllowed ? 'Yes' : 'No'}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    };

    // Function to determine card color based on table status
    const getStatusColor = (status) => {
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
            return renderMobileTables();
        } else {
            return renderDesktopTables();
        }
    };

    return (
        <Container fluid className="full-screen">
            {getMenuItems()}
        </Container>
    );
}

export default Table;
