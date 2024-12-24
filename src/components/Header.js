import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../css/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { setId, setLogReg, setRole, setToken } from "../features/loginSlice";

export default function Header() {
  const myLog = useSelector(state => state.token.value.log);
  const myToken = useSelector(state => state.token.value.tok);
  const myRole = useSelector(state => state.token.value.role);
  // const myLog = localStorage.getItem("log");
  // const myToken = localStorage.getItem("tok");
  // const myRole = localStorage.getItem("role");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLogReg("LOGIN"));
  }, []);
  function logOut() {
    dispatch(setToken(""));
    dispatch(setId(""));
    dispatch(setRole(""));
    localStorage.clear();
    // localStorage.setItem("tok", "");
    // localStorage.setItem("id", "");
    // localStorage.setItem("role", "");
  }
  return (
    <header className="header">
      <nav>
        <ul className="nav">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              end
            >
              HOME
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/certifications"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              CERTIFICATIONS
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/schedule-exam"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              SCHEDULE EXAM
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/my-certificates"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              MY CERTIFICATES
            </NavLink>
          </li>
          {myToken !== "" && (
            <li className="nav-item">
              <NavLink
                to="/test"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                TESTS
              </NavLink>
            </li>
          )}
          {myRole === "Admin" && (
            <li className="nav-item">
              <NavLink
                to="/addexam-category"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                ADD EXAM CATEGORY
              </NavLink>
            </li>
          )}
          {myRole === "Admin" && (
            <li className="nav-item">
              <NavLink
                to="/addexam"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                ADD EXAM
              </NavLink>
            </li>
          )}
          {myRole === "Admin" && (
            <li className="nav-item">
              <NavLink
                to="/assignrole"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                ASSIGN ROLE
              </NavLink>
            </li>
          )}
          {myToken !== "" && (
            <li className="nav-item">
              <NavLink
                to="/exam"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                EXAM
              </NavLink>
            </li>
          )}
          {myToken === "" ? (
            <li className="nav-item">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {myLog}
              </NavLink>
            </li>
          ) : (
            <li className="nav-item">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={logOut}
              >
                LOGOUT
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
