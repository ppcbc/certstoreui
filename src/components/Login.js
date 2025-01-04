import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import http from "../data/http";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setId, setLogReg, setRole, setToken } from "../features/loginSlice";
import Footer from "./Footer";

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
    <div className="login-container-main">
      <form action="" onSubmit={onSubmit}>
        <div className="login-container">
          <div className="login-box">
            <div className="my-loginbox">
              <div className="my-inner-login">
                <label className="my-label-login">
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
              <div className="my-inner-login">
                <label className="my-label-login">
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
              <div className="my-label-wrong">
                <p>{message}</p>
              </div>
            )}
            <div className="my-label">
              <p>If you don't have an account yet click here</p>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </form>
      <Footer color={"var(--color4)"} />
    </div>
  );
}

export default Login;
