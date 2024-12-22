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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLogReg("REGISTER"));
  }, [dispatch]);

  function getUser(e) {
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
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
    } catch (error) {
      console.log(error.message);
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
