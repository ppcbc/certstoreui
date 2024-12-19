import { useState } from "react";
import React from "react";
import "../App.css";
import axios from "axios";
import http from "../data/http";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

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
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div class="fadeIn first">
          <h2>Login</h2>
        </div>
        <form action="" onSubmit={onSubmit}>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="email"
            placeholder="email"
            value={user.email}
            onChange={getUser}
          />
          <input
            type="text"
            id="password"
            class="fadeIn third"
            name="password"
            placeholder="password"
            value={user.password}
            onChange={getUser}
          />
          <input type="submit" class="fadeIn fourth" value="Log In"></input>
        </form>
      </div>
    </div>
  );
}

export default Login;
