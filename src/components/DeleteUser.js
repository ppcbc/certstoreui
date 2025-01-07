import React, { useState } from "react";
import axios from "axios";
import "../css/DeleteUser.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import http from "../data/http";
import Footer from "./Footer";

const DeleteUser = () => {
  const myToken = useSelector(state => state.token.value.tok);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState(false);

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1400);
  }


  const validate = () => {
    let tempErrors = {};
    if (!email) tempErrors.email = "User email is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.delete(
          http + `api/AddRole/delete-user/${encodeURIComponent(email)}`,
          {
            headers: {
              Authorization: "Bearer " + myToken
            }
          }
        );
        setMessage(`User with email ${email} deleted successfully!`);
        setEmail(""); // Clear the email input after successful deletion
        handleMessage();
      } catch (error) {
        console.error("There was an error deleting the user!", error);
        setMessage("There was an error deleting the user.");
        handleMessage();
      }
    }
  };


  return (
    <div className="delete-user-main">
      <form onSubmit={handleSubmit}>
        <div className="delete-user">
          <div className="delete-user-box">
            <h1>Delete User</h1>
            <div className="delete-user-my-inner-box">
              <label className="delete-user-my-label">
                Enter User Email:
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="delete-input"
                  placeholder="example@email.com"
                />
              </label>
            </div>
            {errors.email && (
              <div className="delete-user-error-message">{errors.email}</div>
            )}

            <div className="delete-user-my-inner-box">
              <button type="submit" className="fadeIn fourth" value="submit">
                Delete User
              </button>
            </div>
            <div className="delete-user-my-inner-box">
              <button
                type="cancel"
                className="fadeIn fourth"
                onClick={() => navigate("/adminpanel")}
              >
                Cancel
              </button>
            </div>
            <div>
              {message && (
                <p className="delete-user-my-laybel">{message}</p>
              )}
            </div>
          </div>
        </div>
      </form>
      <Footer color={"var(--color4)"} />
    </div>
  );
};

export default DeleteUser;
