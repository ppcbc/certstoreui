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
            <div className="admin-panel-item-header">
              <h2>ASSIGN ROLE</h2>
              <p className="admin-panel-item-paragraph">Manage user roles and assign appropriate permissions.</p>
              <button onClick={() => navigate("/assignrole")}>Go</button>
            </div>
          </li>
          <li>
            <div className="admin-panel-item-header">
              <h2>ADD EXAM</h2>
              <p className="admin-panel-item-paragraph">Add new exams to the certificate store system for certification purposes.</p>
              <button onClick={() => navigate("/addexam")}>Go</button>
            </div>
          </li>
          <li>
            <div className="admin-panel-item-header">
              <h2>DELETE EXAM</h2>
              <p className="admin-panel-item-paragraph">Remove unwanted or outdated exams from the system.</p>
              <button onClick={() => navigate("/delete-exam")}>Go</button>
            </div>
          </li>
          <li>
            <div className="admin-panel-item-header">
              <h2>ADD EXAM CATEGORY</h2>
              <p className="admin-panel-item-paragraph">Create new categories for organizing exams based on specific criteria.</p>
              <button onClick={() => navigate("/addexam-category")}>Go</button>
            </div>
          </li>
          <li>
            <div className="admin-panel-item-header">
              <h2>UPDATE EXAM CATEGORY</h2>
              <p className="admin-panel-item-paragraph">Modify existing exam categories for better organization and clarity.</p>
              <button onClick={() => navigate("/updateexam-category")}>
                Go
              </button>
            </div>
          </li>
          <li>
            <div className="admin-panel-item-header">
              <h2>DELETE EXAM CATEGORY</h2>
              <p className="admin-panel-item-paragraph">Remove outdated or unnecessary exam categories.</p>
              <button onClick={() => navigate("/delete-exam-category")}>
                Go
              </button>
            </div>
          </li>
          <li>
            <div className="admin-panel-item-header">
              <h2>ADD FULL EXAM CATEGORY</h2>
              <p className="admin-panel-item-paragraph">Add complete categories for full exam sets to expand offerings.</p>
              <button onClick={() => navigate("/addfull-category")}>Go</button>
            </div>
          </li>
          <li>
            <div className="admin-panel-item-header">
              <h2>DELETE FULL EXAM CATEGORY</h2>
              <p className="admin-panel-item-paragraph">Remove full exam categories from the system.</p>
              <button onClick={() => navigate("/delete-full-exam-category")}>
                Go
              </button>
            </div>
          </li>
          <li>
            <div className="admin-panel-item-header">
              <h2>ADD CERT FULL EXAM</h2>
              <p className="admin-panel-item-paragraph">Add a full exam certification to the store's offerings.</p>
              <button onClick={() => navigate("/add-certexam")}>Go</button>
            </div>
          </li>
        </ul>
      </div>
      <Footer color={"lightgrey"}/>
    </div>
  );
}
// <button onClick={() => handleBuy(certification)}>Go</button>
