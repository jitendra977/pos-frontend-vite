import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { 
  BsClipboard, BsClipboardCheck, BsTools, BsGear, BsGraphUp, 
  BsPeople, BsFileText, BsCurrencyDollar, BsBox, BsQuestionCircle, 
  BsThreeDotsVertical 
} from 'react-icons/bs';
import '../assets/css/leftsidebar.css'; // Import custom CSS for the sidebar

const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <ListGroup>
        <ListGroup.Item action as={NavLink} to="/table" className="sidebar-item">
          <BsClipboard className="me-2 icon" /> <span className="item-text">Order</span>
        </ListGroup.Item>
        <ListGroup.Item action as={NavLink} to="/takeaway" className="sidebar-item">
          <BsClipboardCheck className="me-2 icon" /> <span className="item-text">Take away</span>
        </ListGroup.Item>
        <ListGroup.Item action as={NavLink} to="/kitchen" className="sidebar-item">
          <BsTools className="me-2 icon" /> <span className="item-text">Kitchen</span>
        </ListGroup.Item>
        <ListGroup.Item action as={NavLink} to="/bar-menu" className="sidebar-item">
          <BsTools className="me-2 icon" /> <span className="item-text">Bar Menu</span>
        </ListGroup.Item>
        <ListGroup.Item action as={NavLink} to="/settings" className="sidebar-item">
          <BsGear className="me-2 icon" /> <span className="item-text">Setting</span>
        </ListGroup.Item>
        <ListGroup.Item action as={NavLink} to="/restaurant-account" className="sidebar-item">
          <BsGear className="me-2 icon" /> <span className="item-text">Restaurant Account</span>
        </ListGroup.Item>
        <ListGroup.Item action as={NavLink} to="/day-end-report" className="sidebar-item">
          <BsGraphUp className="me-2 icon" /> <span className="item-text">Day-end Report</span>
        </ListGroup.Item>
        <ListGroup.Item action as={NavLink} to="/invoice-list" className="sidebar-item">
          <BsFileText className="me-2 icon" /> <span className="item-text">Invoice List</span>
        </ListGroup.Item>
        <ListGroup.Item action as={NavLink} to="/report" className="sidebar-item">
          <BsGraphUp className="me-2 icon" /> <span className="item-text">Report</span>
        </ListGroup.Item>
        <ListGroup.Item action as={NavLink} to="/customer" className="sidebar-item">
          <BsPeople className="me-2 icon" /> <span className="item-text">Customer</span>
        </ListGroup.Item>
        <ListGroup.Item action as={NavLink} to="/expense" className="sidebar-item">
          <BsCurrencyDollar className="me-2 icon" /> <span className="item-text">Expense</span>
        </ListGroup.Item>
        <ListGroup.Item action as={NavLink} to="/inventory" className="sidebar-item">
          <BsBox className="me-2 icon" /> <span className="item-text">Inventory</span>
        </ListGroup.Item>
        <ListGroup.Item action as={NavLink} to="/other" className="sidebar-item">
          <BsThreeDotsVertical className="me-2 icon" /> <span className="item-text">Other</span>
        </ListGroup.Item>
        <ListGroup.Item action as={NavLink} to="/user-management" className="sidebar-item">
          <BsPeople className="me-2 icon" /> <span className="item-text">User Management</span>
        </ListGroup.Item>
        <ListGroup.Item action as={NavLink} to="/help" className="sidebar-item">
          <BsQuestionCircle className="me-2 icon" /> <span className="item-text">Help</span>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default LeftSidebar;