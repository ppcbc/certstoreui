import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { setId, setLogReg, setRole, setToken } from "../features/loginSlice";
import axios from "axios";
import http from "../data/http";

export default function Header() {
  const myLog = useSelector(state => state.token.value.log);
  const myToken = useSelector(state => state.token.value.tok);
  const myRole = useSelector(state => state.token.value.role);
  const basketIn = useSelector(state => state.token.value.basketNewItem);
  const basketCount = useSelector(state => state.token.value.basketCount);
  const dispatch = useDispatch();
  const myId = useSelector(state => state.token.value.id);

  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    dispatch(setLogReg("LOGIN"));
    fetchUserDetail();
  }, []);

  function logOut() {
    dispatch(setToken(""));
    dispatch(setId(""));
    dispatch(setRole(""));
    localStorage.clear();
  }
  const fetchUserDetail = async () => {
    try {
      const res = await axios.get(http + "api/UserDetails");
      console.log(res.data);
      //   setUsers(response.data);
      let currentUser = res.data.filter(a => a.id == myId);
      console.log(currentUser);
      let myUserId = currentUser[0].detailId;
      console.log(myUserId);
      const response = await axios.get(http + `api/UserDetails/${myUserId}`);
      console.log("USER DETAILS");
      console.log(response.data);
      setSelectedUserId(response.data);
    } catch (error) {
      console.error("There was an error fetching the user details!", error);
    }
  };

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

          {myToken !== "" && (
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
          )}
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
          {myRole === "Marker" && (
            <li className="nav-item">
              <NavLink
                to="/marker-panel"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                MARKER PANEL
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
                    fill={basketIn ? "#2e4854" : "white"}
                    width="34px"
                    height="34px"
                  >
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm0 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10-3c-1.1 0-1.99.9-1.99 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM7.12 6l1.2 5.1c.14.58.68 1 1.29 1h7.77c.62 0 1.16-.42 1.3-1.01L20.9 6H7.12zm-2.54 0H1v2h2.25L5 15.9C5.11 16.54 5.69 17 6.34 17H19v-2H6.34l-.22-.9L18.4 6H4.58z" />
                  </svg>
                </NavLink>
                <p
                  className="basket-paragraph"
                  style={{ color: basketIn ? "#2e4854" : "white" }}
                >
                  {basketCount}
                </p>
              </li>
            )}

            {myToken !== "" && selectedUserId && (
              <li className="nav-item nav-right">
                <NavLink
                  to="/update-user-nav"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  PROFILE
                </NavLink>
              </li>
            )}
            {myToken !== "" && selectedUserId == "" && (
              <li className="nav-item nav-right">
                <NavLink
                  to="/user-details/"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  PROFILE
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
