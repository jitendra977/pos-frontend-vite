/* eslint-disable no-unused-vars */
import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* Add Back Button */}
            <Row className="mb-4">
                <Col md={4} sm={12}>
                    <Button variant="outline-primary" onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default BackButton;