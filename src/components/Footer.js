import React from "react";
import "../css/Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Peoplecert bootcamp. All Rights Reserved.</p>
        <div className="footer-links">
          <NavLink to="/contact-us">Contact Us</NavLink>
          <NavLink to="/about-us">About</NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
