import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../css/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { setId, setLogReg, setRole, setToken } from "../features/loginSlice";

export default function Header() {
  const myLog = useSelector((state) => state.token.value.log);
  const myToken = useSelector((state) => state.token.value.tok);
  const myRole = useSelector((state) => state.token.value.role);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLogReg("LOGIN"));
  }, [dispatch]);

  function logOut() {
    dispatch(setToken(""));
    dispatch(setId(""));
    dispatch(setRole(""));
    localStorage.clear();
  }

  return (
    <header className="header">
      <nav>
        <ul className="nav">
          {/* Logo (instead of HOME button) */}
          <li className="nav-item logo-item">
            <NavLink to="/" className="nav-link logo-link">
              <img
                src="/images/logo.svg"
                alt="Certification Shop Logo"
                className="logo"
              />
            </NavLink>
          </li>

          {/* Other navigation items */}
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

          {myRole === "Admin" && (
            <li className="nav-item">
              <NavLink
                to="/adminpanel"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                ADMIN PANEL
              </NavLink>
            </li>
          )}

          <li className="nav-item">
            <NavLink
              to="/user-details"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              USER DETAILS
            </NavLink>
          </li>

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
            <li className="nav-item nav-right">
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
            <li className="nav-item nav-right">
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
