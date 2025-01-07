import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogReg } from "../features/loginSlice";
import http from "../data/http";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "../css/Register.css";

function Register() {
  const [validationMessages, setValidationMessages] = useState({});
  const [check, setCheck] = useState(false);
  const [added, setAdded] = useState("");

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1400);
  }

  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLogReg("REGISTER"));
  }, []);

  function getUser(e) {
    let { name, value } = e.target;
    setUser(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  // Email validation function
  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validation function
  const validate = () => {
    let errors = {};
    if (user.email === "") {
      errors.email = "Please enter your email";
    }
    if (user.password === "") {
      errors.password = "Please enter your password";
    }
    if (!validateEmail(user.email)) {
      errors.email = "Please enter a valid email address.";
    }
    setValidationMessages(errors);
    return Object.keys(errors).length === 0;
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    try {
      var response = await axios.post(http + "register", user);
      await console.log(response.status);
      if (response.status === 200) {
        await navigate("/login");
      }
      await axios.post(http + "api/AddRole/assign-role", {
        email: user.email,
        role: "User"
      });
    } catch (error) {
      console.log(error.message);
      setUser({
        email: "",
        password: ""
      });
      setMessage("Wrong credentials try again");
      handleMessage();
    }
  }
  return (
    <div className="register-container-main">
      <form action="" onSubmit={onSubmit}>
        <div className="register-container">
          <div className="register-box">
            <div className="my-registerbox">
              <div className="my-inner-register">
                <label className="my-label-register">
                  Email:
                  <input
                    type="text"
                    id="login"
                    className="fadeIn third"
                    name="email"
                    placeholder="email@user.com"
                    value={user.email}
                    onChange={getUser}
                  />
                </label>
              </div>
              {validationMessages.email && (
                <p className="error-message">{validationMessages.email}</p>
              )}

              <div className="my-inner-register">
                <label className="my-label-register">
                  Password:
                  <input
                    type="password"
                    id="password"
                    class="fadeIn second"
                    name="password"
                    placeholder="password"
                    value={user.password}
                    onChange={getUser}
                  />
                </label>
              </div>
              {validationMessages.email && (
                <p className="error-message">{validationMessages.password}</p>
              )}
            </div>

            <button type="submit" class="fadeIn fourth" value="Log In">
              Register
            </button>
            {check !== "" && (
              <div className="my-label-register-wrong">
                <p>{message}</p>
              </div>
            )}
            <div className="my-label">
              <p>If you are registered user click here</p>
              <div className="my-label-log">
                <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer color={"var(--color4)"} />
    </div>
  );
}

export default Register;
