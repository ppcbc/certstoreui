import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogReg } from "../features/loginSlice";
import http from "../data/http";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "../css/Register.css";

function Register() {
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

  async function onSubmit(e) {
    e.preventDefault();
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
    }
  }
  return (
    <div className="register-exam-main">
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
                    className="fadeIn second"
                    name="email"
                    placeholder="email"
                    value={user.email}
                    onChange={getUser}
                  />
                </label>
              </div>
              <div className="my-inner-register">
                <label className="my-label-register">
                  Password:
                  <input
                    type="password"
                    id="password"
                    class="fadeIn third"
                    name="password"
                    placeholder="password"
                    value={user.password}
                    onChange={getUser}
                  />
                </label>
              </div>
            </div>
            <button type="submit" class="fadeIn fourth" value="Log In">
              Register
            </button>
            {message !== "" && (
              <div className="my-label-wrong">
                <p>{message}</p>
              </div>
            )}
            <div className="my-label">
              <p>If you are registered user click here</p>
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </form>
      <Footer color={"var(--color4)"} />
    </div>
  );
}

export default Register;
