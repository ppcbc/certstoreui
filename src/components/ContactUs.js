import React from "react";
// import "../css/ContactUs.css";
import { useState } from "react";
import http from "../data/http";
import emailjs from "emailjs-com";

function ContactUs() {
  const [FormContact, setFormContact] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const SERVICE_ID = "service_pcnlvdn";
  const TEMPLATE_ID = "template_gzx3srk";
  const PUBLIC_KEY = "J5azwiizeCADNy__Z";

  const handleChange = e => {
    const { name, value } = e.target;
    setFormContact({
      ...FormContact,
      [name]: value
    });
  };
  //Email validation Function
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Email validation
    if (!validateEmail(FormContact.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY).then(
      result => {
        alert("Message Sent Successfully");
      },
      error => {
        console.log(error.text);
        alert("Something went wrong!");
      }
    );

    setFormContact({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="contactus-container">
        <div className="add-box">
          <h1 className="h1-form"> Contact Us </h1>
          <div className="my-box">
            <div className="my-inner-box">
              <input
                type="text"
                id="name"
                className="fadeIn second"
                name="name"
                placeholder="Full Name"
                value={FormContact.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="my-inner-box">
              <input
                type="text"
                id="email"
                className="fadeIn second"
                name="email"
                placeholder="Your Email"
                value={FormContact.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="my-inner-box">
              <input
                type="text"
                id="subject"
                className="fadeIn second"
                name="subject"
                placeholder="Subject"
                value={FormContact.subject}
                onChange={handleChange}
              />
            </div>

            <div className="my-inner-box">
              <textarea
                id="message"
                className="fadeIn second"
                name="message"
                placeholder="Write your Message"
                value={FormContact.message}
                onChange={handleChange}
                rows="5"
                required
              />
            </div>

            <button type="submit" className="send-button">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ContactUs;
