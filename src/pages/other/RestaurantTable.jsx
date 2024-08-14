/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Form,
  Row,
  Col,
  Container,
  Card,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../constant/axios";

const RestaurantTable = () => {
  const [tables, setTables] = useState([]); // Initialize as an array
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [hoveredTableId, setHoveredTableId] = useState(null);
  const [editingTableId, setEditingTableId] = useState(null);
  const [editableTable, setEditableTable] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("tables");
        console.log("API Response:", response.data);

        // Extract the array from the response and set it as the tables state
        if (response.data && Array.isArray(response.data.data)) {
          setTables(response.data.data);
        } else {
          console.error("Unexpected API response structure:", response.data);
          setTables([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setTables([]); // Fallback to an empty array on error
      }
    };
    fetchData();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this table?")) {
      try {
        await axios.delete(`tables/${id}`);
        setTables(tables.filter((table) => table.tableId !== id));
        setErrorMessage("");
      } catch (error) {
        console.error("Error deleting table:", error);
        setErrorMessage(
          "Failed to delete table: " + (error.response?.data || error.message)
        );
      }
    }
  };

  const handleEditClick = (table) => {
    setEditingTableId(table.tableId);
    setEditableTable({ ...table });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableTable((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`tables/${editableTable.tableId}`, editableTable);
      setTables(
        tables.map((table) =>
          table.tableId === editableTable.tableId ? editableTable : table
        )
      );
      setEditingTableId(null);
    } catch (error) {
      console.error("Error updating table:", error);
    }
  };

  const handleCancel = () => {
    setEditingTableId(null);
    setEditableTable({});
  };

  const filteredTables = tables.filter((table) => {
    const term = searchTerm.toLowerCase();
    if (!filterBy) {
      return (
        table.tableNumber.toString().includes(term) ||
        table.status.toLowerCase().includes(term)
      );
    }
    return table[filterBy]?.toString().toLowerCase().includes(term);
  });

  return (
    <Container>
      <div>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
      </div>
      <h1>Table Management</h1>
      <Row className="mb-4">
        <Col md={4} sm={12}>
          <Button as={NavLink} to="/addTable" className="btn btn-primary w-100">
            Add Table
          </Button>
        </Col>
        <Col md={4} sm={12}>
          <Form.Select
            aria-label="Filter Table"
            onChange={(e) => setFilterBy(e.target.value)}
            className="w-100"
          >
            <option value="">Filter by...</option>
            <option value="tableNumber">Table Number</option>
            <option value="status">Status</option>
          </Form.Select>
        </Col>
        <Col md={4} sm={12}>
          <Form.Control
            type="text"
            placeholder="Search Table"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-100"
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4} sm={12}>
          <Button onClick={() => navigate(-1)} variant="outline-primary">
            Back
          </Button>
        </Col>
      </Row>

      <div className="table-responsive d-none d-md-block">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Table Number</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTables.map((table) => (
              <tr key={table.tableId}>
                <td>{table.tableId}</td>
                <td>
                  {editingTableId === table.tableId ? (
                    <Form.Control
                      type="text"
                      name="tableNumber"
                      value={editableTable.tableNumber}
                      onChange={handleInputChange}
                    />
                  ) : (
                    table.tableNumber
                  )}
                </td>
                <td>
                  {editingTableId === table.tableId ? (
                    <Form.Select
                      name="status" // Changed from "tableStatus" to "status"
                      value={editableTable.status}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Status</option>
                      <option value="AVAILABLE">AVAILABLE</option>
                      <option value="OCCUPIED">OCCUPIED</option>
                      <option value="RESERVED">RESERVED</option>
                      <option value="OUT_OF_SERVICE">OUT_OF_SERVICE</option>
                    </Form.Select>
                  ) : (
                    table.status
                  )}
                </td>
                <td>
                  {editingTableId === table.tableId ? (
                    <>
                      <Button
                        style={{ marginRight: "10px" }}
                        onClick={handleSave}
                        variant="success"
                      >
                        Save
                      </Button>
                      <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        style={{ marginRight: "10px" }}
                        onClick={() => handleDelete(table.tableId)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                      <Button
                        className="btn-edit"
                        onClick={() => handleEditClick(table)}
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="list-group d-block d-md-none">
        {filteredTables.map((table) => (
          <Card
            key={table.tableId}
            className="mb-3 shadow-sm"
            onMouseEnter={() => setHoveredTableId(table.tableId)}
            onMouseLeave={() => setHoveredTableId(null)}
          >
            <Card.Header>{table.tableNumber}</Card.Header>
            <Card.Body className="d-flex justify-content-between align-items-start">
              <div>
                <Card.Text>
                  <strong>ID:</strong> {table.tableId}
                  <br />
                  <strong>Status:</strong> {table.status}
                </Card.Text>
              </div>
              {hoveredTableId === table.tableId && (
                <div className="position-absolute top-0 end-0 m-2">
                  <Button
                    variant="danger"
                    className="me-2"
                    onClick={() => handleDelete(table.tableId)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => handleEditClick(table)}
                  >
                    Edit
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default RestaurantTable;
