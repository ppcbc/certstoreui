import React from "react";
import "../App.css";
import axios from "axios";

function Register() {
  return (
    <div className="wrapper fadeInDown">
      <div className="fadeIn first"></div>
      <div id="formContent">
        <div class="fadeIn first">
          <h2>Register</h2>
        </div>
        <form action="">
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="email"
            placeholder="email"
          />
          <input
            type="text"
            id="password"
            class="fadeIn third"
            name="password"
            placeholder="password"
          />
          <input type="submit" class="fadeIn fourth" value="Register"></input>
        </form>
      </div>
    </div>
  );
}

export default Register;
