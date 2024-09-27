import React, { useEffect, useState } from "react";
import axios from "../constant/axios";
import BackButton from "../components/BackButton";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const User = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get("users");
        setUsers(userResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  // Filter users based on search term and filter criteria
  const filteredUsers = users.filter((user) => {
    if (!filterBy) return true;
    const term = searchTerm.toLowerCase();
    switch (filterBy) {
      case 'name':
        return user.name.toLowerCase().includes(term);
    case 'contactNumber':
            return user.contactNumber && user.contactNumber.toString().includes(term);        
      case 'email':  // Assuming users have a description field; adjust if needed
        return user.email && user.email.toLowerCase().includes(term);
      default:
        return true;
    }
  });

  return (
    <>
      <BackButton />
      
      <Row className="mb-4">
        <Col md={4} sm={12}>
          <Button
            as={NavLink}
            to="/addCategory"
            className="btn btn-primary w-100"
          >
            Add Category
          </Button>
        </Col>
        <Col md={4} sm={12}>
          <Form.Select
            aria-label="Filter Category"
            onChange={(e) => setFilterBy(e.target.value)}
            className="w-100"
          >
            <option value="">Filter by...</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="contactNumber">Phone</option>
          </Form.Select>
        </Col>
        <Col md={4} sm={12}>
          <Form.Control
            type="text"
            placeholder="Search Category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-100"
          />
        </Col>
      </Row>

      <div className="table-responsive">
        <Row className="mb-4">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>{user.name}</td>
                    <td>{user.contactNumber}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default User;
