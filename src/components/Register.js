import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogReg } from "../features/loginSlice";
import http from "../data/http";
import { Link, useNavigate } from "react-router-dom";

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
    <form action="" onSubmit={onSubmit}>
      <div className="schedule-exam">
        <div className="schedule-box">
          <div className="my-box">
            <div className="my-inner-box">
              <label className="my-label">
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
            <div className="my-inner-box">
              <label className="my-label">
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
            <div className="my-label">
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
  );
}

export default Register;
