import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import http from "../data/http";
// import "../css/ScheduleExam.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setId, setLogReg, setRole, setToken } from "../features/loginSlice";

function Login() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const myToken = useSelector(state => state.token.value.tok);
  // const myToken = localStorage.getItem("tok");
  const dispatch = useDispatch();

  useEffect(() => {
    // localStorage.setItem("tok", "");
    // localStorage.setItem("id", "");
    // localStorage.setItem("role", "");
    // localStorage.setItem("fullCategoryId", "");
    dispatch(setLogReg("LOGIN"));
  }, []);

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
      var response = await axios.post(http + "login", user);
      dispatch(setToken(response.data.accessToken));
      var res = await axios.get(http + "api/AddRole/get-id", {
        headers: {
          // "Content-Type": "application/json",
          Authorization: "Bearer " + response.data.accessToken
        }
      });
      var resForRole = await axios.get(http + "api/AddRole/get-role", {
        headers: {
          // "Content-Type": "application/json",
          Authorization: "Bearer " + response.data.accessToken
        }
      });
      dispatch(setId(res.data.userId));
      dispatch(setRole(resForRole.data.userRole));
      console.log(resForRole.data.userRole);
      console.log(res.data.userId);
      console.log(myToken);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      setUser({
        email: "",
        password: ""
      });
      setMessage("Wrong credentials try again");
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
            Login
          </button>
          {message !== "" && (
            <div className="my-label">
              <p>{message}</p>
            </div>
          )}
          <div className="my-label">
            <p>If you dont have an account yet click here</p>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
