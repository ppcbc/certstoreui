import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="/contact-us">Contact Us</a>
          <a href="/about">About</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
