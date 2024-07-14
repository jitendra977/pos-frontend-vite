import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './contact.css'; // Custom CSS for advanced styling

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <h2 className="contact-title">Contact Us</h2>
        <div className="contact-wrapper">
          <div className="contact-info">
            <div className="info-item">
              <FaPhoneAlt className="info-icon" />
              <p>+123 456 7890</p>
            </div>
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <p>contact@nishanapos.com</p>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <p>123 Main Street, City, Country</p>
            </div>
          </div>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" id="message" rows="5" placeholder="Enter your message"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
