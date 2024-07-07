// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./navbar.css";

const Header = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);

  const handleLinkClick = () => {
    setShowMediaIcons(false); // Close the menu when any link is clicked
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink
          className="navbar-brand"
          to="/"
          onClick={() => setShowMediaIcons(false)}
        >
          <h2 className="logo">
            <span>N</span>ishana<span>POS</span>
          </h2>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={showMediaIcons ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={() => setShowMediaIcons(!showMediaIcons)}
        >
          <GiHamburgerMenu />
        </button>
        <div
          className={`collapse navbar-collapse ${showMediaIcons ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/"
                onClick={handleLinkClick}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/about"
                onClick={handleLinkClick}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/customer"
                onClick={handleLinkClick}
              >
                Customer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/contact"
                onClick={handleLinkClick}
              >
                Contact
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                <FaFacebookSquare />
              </a>
            </li>
            <li className="nav-item">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                <FaInstagramSquare />
              </a>
            </li>
            <li className="nav-item">
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                <FaYoutubeSquare />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
