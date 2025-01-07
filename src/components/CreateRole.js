import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/AssignRole.css";
import Footer from "./Footer";
import { useSelector } from "react-redux";

function CreateRole() {
  const [user, setUser] = useState({
    role: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [validationMessages, setValidationMessages] = useState({});
  const myToken = useSelector(state => state.token.value.tok);

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

  const validate = () => {
    let tempErrors = {};
    const roleRegex = /^[A-Za-z]+$/;

    if (!user.role) {
      tempErrors.role = "Role is required";
    } else if (!roleRegex.test(user.role)) {
      tempErrors.role = "Role must contain only letters";
    }

    setValidationMessages(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    console.log("ROLE");
    console.log(user.role);

    try {
      var response = await axios.post(
        "https://localhost:7117/api/AddRole/add-role/",
        "Test",
        {
          headers: {
            "Content-Type": "text/plain",
            Accept: "application/json",
            Authorization: "Bearer " + myToken
          }
        }
      );
      if (response.status === 200) {
        setMessage("Role assigned successfully");
        setUser({
          role: ""
        });
      }
    } catch (error) {
      setMessage("Wrong credentials, try again");
      setUser({
        role: ""
      });
      console.log(error.message);
    }
  }

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1400);
  }

  return (
    <div className="assign-role-main">
      <form action="" onSubmit={onSubmit}>
        <div className="assign-role">
          <div className="assign-box">
            <h1>Create Role</h1>
            <div className="assign-inner-box">
              <div className="assign-inner-field">
                <label className="assign-label">
                  Role:
                  <input
                    type="text"
                    className="fadeIn third"
                    name="role"
                    placeholder="Add new role here"
                    value={user.role}
                    onChange={getUser}
                  />
                </label>
                {validationMessages.role && (
                  <p className="AssignRole-error-message">
                    {validationMessages.role}
                  </p>
                )}
              </div>
            </div>
            <div className="button">
              <button
                type="submit"
                className="fadeIn fourth"
                value="Log In"
                onClick={onSubmit}
              >
                Create
              </button>
            </div>
            <div className="button">
              <button
                type="cancel"
                className="fadeIn fourth"
                onClick={() => navigate("/adminpanel")}
              >
                Cancel
              </button>
            </div>
            <div className="assign-message">{check && <p>{message}</p>}</div>
          </div>
        </div>
      </form>
      <Footer color={"var(--color7)"} />
    </div>
  );
}

export default CreateRole;
