import React, { useState } from "react"; // Import useState here
import "../css/ContactUs.css";
import emailjs from "emailjs-com";
import Footer from "./Footer";

function ContactUs() {
  const [validationMessages, setValidationMessages] = useState({});
  const [check, setCheck] = useState(false);
  const [added, setAdded] = useState("");
  const [FormContact, setFormContact] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const SERVICE_ID = "service_npme68t";
  const TEMPLATE_ID = "template_gfbfryk";
  const PUBLIC_KEY = "I5jkOGujZmwf2oE2s";

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1400);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setFormContact({
      ...FormContact,
      [name]: value
    });
  };

  // Email validation function
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validation function
  const validate = () => {
    let errors = {};
    if (FormContact.name === "") {
      errors.name = "Please enter your full name.";
    }
    if (FormContact.email === "") {
      errors.email = "Please enter an email.";
    }
    if (!validateEmail(FormContact.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (FormContact.subject === "") {
      errors.subject = "Please enter a subject.";
    }
    if (FormContact.message === "") {
      errors.message = "Please enter your message.";
    }

    setValidationMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validate before sending the email
    if (!validate()) return;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY).then(
      result => {
        setAdded("Message sent successfully");
        handleMessage();
      },
      error => {
        console.log(error.text);
        setAdded("Wrong credentials try again");
        handleMessage();
      }
    );

    // Reset the form after submitting
    setFormContact({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="contactus-main-container">
      <form onSubmit={handleSubmit}>
        <div className="contactus-container">
          <div className="contactus-box">
            <h1 className="h1-form"> Contact Us </h1>
            <div className="mycontact-box">
              <div className="my-inner-contactbox">
                <input
                  type="text"
                  id="name"
                  className="fadeIn second"
                  name="name"
                  placeholder="Full Name"
                  value={FormContact.name}
                  onChange={handleChange}
                />
              </div>
              {validationMessages.name && (
                <p className="error-message">{validationMessages.name}</p>
              )}

              <div className="my-inner-contactbox">
                <input
                  type="text"
                  id="email"
                  className="fadeIn second"
                  name="email"
                  placeholder="Your Email"
                  value={FormContact.email}
                  onChange={handleChange}
                />
              </div>
              {validationMessages.email && (
                <p className="error-message">{validationMessages.email}</p>
              )}

              <div className="my-inner-contactbox">
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
              {validationMessages.subject && (
                <p className="error-message">{validationMessages.subject}</p>
              )}

              <div className="my-inner-contactbox">
                <textarea
                  id="message"
                  className="fadeIn second"
                  name="message"
                  placeholder="Write your Message"
                  value={FormContact.message}
                  onChange={handleChange}
                  rows="5"
                />
              </div>
              {validationMessages.message && (
                <p className="error-message">{validationMessages.message}</p>
              )}

              <button type="submit" className="sendcontact-button">
                Send Message
              </button>
              <p>{check && <div className="message-status">{added}</div>}</p>
            </div>
          </div>
        </div>
      </form>
      <Footer color={"var(--color4"} />
    </div>
  );
}

export default ContactUs;
