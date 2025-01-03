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
          <li className="nav-item logo-item">
            <NavLink to="/" className="nav-link logo-link">
              <img
                src="../images/logo.svg"
                alt="Certification Shop Logo"
                className="logo"
              />
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
                to="/payment"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                PAYMENT
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
          <div className="nav-item nav-right">
            {myToken !== "" && (
              <li className="nav-item nav-right">
                <NavLink
                  to="/basket"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    width="34px"
                    height="34px"
                  >
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm0 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10-3c-1.1 0-1.99.9-1.99 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM7.12 6l1.2 5.1c.14.58.68 1 1.29 1h7.77c.62 0 1.16-.42 1.3-1.01L20.9 6H7.12zm-2.54 0H1v2h2.25L5 15.9C5.11 16.54 5.69 17 6.34 17H19v-2H6.34l-.22-.9L18.4 6H4.58z" />
                  </svg>
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
          </div>
        </ul>
      </nav>
    </header>
  );
}
