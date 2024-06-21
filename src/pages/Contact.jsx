import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './contact.css';

const Contact = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100 shadow">
            <div className="card-body">
              <h5 className="card-title">Get in Touch</h5>
              <p className="card-text">
                We'd love to hear from you! Please fill out the form below and we'll get in touch with you as soon as possible.
              </p>
              <div className="contact-info">
                <p><FaPhoneAlt /> +123 456 7890</p>
                <p><FaEnvelope /> contact@nishanapos.com</p>
                <p><FaMapMarkerAlt /> 123 Main Street, City, Country</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <form className="card shadow p-4 h-100">
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter your name" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" id="message" rows="4" placeholder="Enter your message"></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
