import React from "react";
import "../css/Footer.css";
import { NavLink } from "react-router-dom";

const Footer = ({ color }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p style={{ color }}>
          &copy; 2024 PeopleCert bootcamp. All Rights Reserved.
        </p>
        <div className="footer-links">
          <NavLink style={{ color }} to="/contact-us">
            Contact Us
          </NavLink>
          <NavLink style={{ color }} to="/about-us">
            About
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
