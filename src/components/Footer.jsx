// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">NISHANA POS</h5>
            <p>
              Providing the best point of sale solutions for your business.
            </p>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <Link className="text-dark" to="/">HOME</Link>
              </li>
              <li>
                <Link className="text-dark" to="/about">ABOUT</Link>
              </li>
              <li>
                <Link className="text-dark" to="/budget">Monthly budget Management</Link>
              </li>
              <li>
                <Link className="text-dark" to="/link">Link</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Contact</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a className="text-dark" href="mailto:contact@nishanapos.com">Email: contact@nishanapos.com</a>
              </li>
              <li>
                <a className="text-dark" href="tel:+1234567890">Phone: +1 234 567 890</a>
              </li>
              <li>
                <span className="text-dark">Address: 1234 Street Name, City, Country</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Copyright:
        <Link className="text-dark" to="/">NISHANA POS</Link>
      </div>
    </footer>
  );
}

export default Footer;
