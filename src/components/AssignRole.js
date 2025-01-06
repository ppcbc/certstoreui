import { useState } from "react";
import React from "react";
import axios from "axios";
import http from "../data/http";
import { useNavigate } from "react-router-dom";
import "../css/AssignRole.css";
import Footer from "./Footer";

function AssignRole() {
  const [user, setUser] = useState({
    email: "",
    role: ""
  });

  const [examCategories, setExamCategories] = useState([]);
  const [fullCategories, setFullCategories] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [validationMessages, setValidationMessages] = useState({});

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
  }

  function getUser(e) {
    let { name, value } = e.target;
    if (name === "role") {
      value = toTitleCase(value);
      console.log(value);
    }
    setUser(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const roleRegex = /^[A-Za-z]+$/;

    if (!user.email) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(user.email)) {
      tempErrors.email = "Invalid email format";
    }

    if (!user.role) {
      tempErrors.role = "Role is required";
    } else if (!roleRegex.test(user.role)) {
      tempErrors.role = "Role must contain only letters";
    }

    setValidationMessages(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      var res = await axios.get(
        http + `api/AddRole/get-role-by-email/${user.email}`
      );
      let myCurrentRole = res.data.roles[0];
      await axios.post(http + "api/AddRole/remove-user-role", {
        email: user.email,
        role: myCurrentRole
      });
      var response = await axios.post(http + "api/AddRole/assign-role", user);
      if (response.status === 200 || response.status === 201) {
        setMessage("Role assigned successfully");
        setUser({
          email: "",
          role: ""
        });
        handleMessage();
      }
    } catch (error) {
      setMessage("Wrong credentials, try again");
      setUser({
        email: "",
        role: ""
      });
      console.log(error.message);
    }
  }

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1400);
  }

  return (
    <div className="assign-role-main">
      <form action="" onSubmit={onSubmit}>
        <div className="assign-role">
          <div className="assign-box">
            <h1>Assign Role</h1>
            <div className="assign-inner-box">
              <div className="assign-inner-field">
                <label className="assign-label">
                  Email:
                  <input
                    type="text"
                    className="fadeIn second"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={getUser}
                  />
                </label>
                {validationMessages.email && (
                  <p className="AssignRole-error-message">
                    {validationMessages.email}
                  </p>
                )}
              </div>
              <div className="assign-inner-field">
                <label className="assign-label">
                  Role:
                  <input
                    type="text"
                    className="fadeIn third"
                    name="role"
                    placeholder="Role"
                    value={user.role}
                    onChange={getUser}
                  />
                </label>
                {validationMessages.role && (
                  <p className="AssignRole-error-message">
                    {validationMessages.role}
                  </p>
                )}
              </div>
            </div>
            <div className="button">
              <button
                type="submit"
                className="fadeIn fourth"
                value="Log In"
                onClick={onSubmit}
              >
                Assign
              </button>
            </div>
            <div className="button">
              <button
                type="cancel"
                className="fadeIn fourth"
                onClick={() => navigate("/adminpanel")}
              >
                Cancel
              </button>
            </div>
            <div className="assign-message">{check && <p>{message}</p>}</div>
          </div>
        </div>
      </form>
      <Footer color={"var(--color7)"} />
    </div>
  );
}

export default AssignRole;
