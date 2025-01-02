import React from "react";
import "../App.css";
import "../css/AdminPanel.css";
import { setLogReg } from "../features/loginSlice";
import http from "../data/http";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function AdminPanel() {
  const navigate = useNavigate();
  return (
    <div className="admin-panel-main">
      <div className="admin-panel">
        <h1>Admin Panel</h1>
        <ul>
          <li>
            <div className="item-header">
              <h2>ADD FULL EXAM CATEGORY</h2>
              <button onClick={() => navigate("/addfull-category")}>Go</button>
            </div>
          </li>
          <li>
            <div className="item-header">
              <h2>ADD EXAM CATEGORY</h2>
              <button onClick={() => navigate("/addexam-category")}>Go</button>
            </div>
          </li>
          <li>
            <div className="item-header">
              <h2>UPDATE EXAM CATEGORY</h2>
              <button onClick={() => navigate("/updateexam-category")}>
                Go
              </button>
            </div>
          </li>
          <li>
            <div className="item-header">
              <h2>ADD EXAM</h2>
              <button onClick={() => navigate("/addexam")}>Go</button>
            </div>
          </li>
          <li>
            <div className="item-header">
              <h2>DELETE EXAM</h2>
              <button onClick={() => navigate("/delete-exam")}>Go</button>
            </div>
          </li>
          <li>
            <div className="item-header">
              <h2>ADD CERT FULL EXAM</h2>
              <button onClick={() => navigate("/add-certexam")}>Go</button>
            </div>
          </li>
          <li>
            <div className="item-header">
              <h2>ASSIGN ROLE</h2>
              <button onClick={() => navigate("/assignrole")}>Go</button>
            </div>
          </li>
        </ul>
      </div>
      <Footer color={"lightgrey"} />
    </div>
  );
}
// <button onClick={() => handleBuy(certification)}>Go</button>
