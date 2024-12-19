import React from "react";
import "../App.css";

function Login() {
  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div class="fadeIn first">
          <h2>Login</h2>
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
          <input type="submit" class="fadeIn fourth" value="Log In"></input>
        </form>
      </div>
    </div>
  );
}

export default Login;
