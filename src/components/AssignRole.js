import { useState } from "react";
import React from "react";
// import "../App.css";
import axios from "axios";
import http from "../data/http";
import "../css/ScheduleExam.css";

function AssignRole() {
  const [user, setUser] = useState({
    email: "",
    role: ""
  });

  const [added, setAdded] = useState("");

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

  async function onSubmit(e) {
    e.preventDefault();
    try {
      var res = await axios.get(
        http + `api/AddRole/get-role-by-email/${user.email}`
      );
      console.log(res.data.roles[0]);
      var response = await axios.post(http + "api/AddRole/assign-role", user);
      if (response.status === 200) {
        setAdded("Role assigned successfully");
        setUser(prev => ({
          email: "",
          role: ""
        }));
      }
    } catch (error) {
      setAdded("Wrong credentials try again");
      setUser(prev => ({
        email: "",
        role: ""
      }));
      console.log(error.message);
    }
  }
  async function onSubmitRemove(e) {
    e.preventDefault();
    try {
      var response = await axios.post(
        http + "api/AddRole/remove-user-role",
        user
      );
      if (response.status === 200) {
        setAdded("Role removed successfully");
        setUser(prev => ({
          email: "",
          role: ""
        }));
      }
    } catch (error) {
      setAdded("Wrong credentials try again");
      setUser(prev => ({
        email: "",
        role: ""
      }));
      console.log(error.message);
    }
  }

  return (
    <form action="">
      <div className="schedule-exam">
        <div className="schedule-box">
          <div className="my-box">
            <div className="my-inner-box">
              <label className="my-label">
                Email:
                <input
                  type="text"
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
                Role:
                <input
                  type="text"
                  class="fadeIn third"
                  name="role"
                  placeholder="role"
                  value={user.role}
                  onChange={getUser}
                />
              </label>
            </div>
          </div>
          <div className="button">
            <button
              type="submit"
              class="fadeIn fourth"
              value="Log In"
              onClick={onSubmit}
            >
              Assign
            </button>
          </div>
          <div className="button">
            <button
              type="submit"
              class="fadeIn fourth"
              value="Log In"
              onClick={onSubmitRemove}
            >
              Remove
            </button>
          </div>
          <div className="my-label">
            <p>{added}</p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AssignRole;
