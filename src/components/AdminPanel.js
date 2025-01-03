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
          <div className="admin-panel-inside-all">
            <div className="admin-panel-inside">
              <li>
                <div className="item-header">
                  <h2>Create Question</h2>
                  <button onClick={() => navigate("/addexam")}>Go</button>
                </div>
              </li>
              <li>
                <div className="item-header">
                  <h2>Update Question (need fix)</h2>
                  <button onClick={() => navigate("/")}>Go</button>
                </div>
              </li>

              <li>
                <div className="item-header">
                  <h2>Delete Question</h2>
                  <button onClick={() => navigate("/delete-exam")}>Go</button>
                </div>
              </li>
            </div>
            <div className="admin-panel-inside">
              <li>
                <div className="item-header">
                  <h2>Create Question Category</h2>
                  <button onClick={() => navigate("/addexam-category")}>
                    Go
                  </button>
                </div>
              </li>
              <li>
                <div className="item-header">
                  <h2>Update Question Category</h2>
                  <button onClick={() => navigate("/updateexam-category")}>
                    Go
                  </button>
                </div>
              </li>
              <li>
                <div className="item-header">
                  <h2>Delete Question Category</h2>
                  <button onClick={() => navigate("/delete-exam-category")}>
                    Go
                  </button>
                </div>
              </li>
            </div>
            <div className="admin-panel-inside">
              <li>
                <div className="item-header">
                  <h2>Create Module</h2>
                  <button onClick={() => navigate("/addfull-category")}>
                    Go
                  </button>
                </div>
              </li>
              <li>
                <div className="item-header">
                  <h2>Update Module (need fix)</h2>
                  <button onClick={() => navigate("/")}>Go</button>
                </div>
              </li>
              <li>
                <div className="item-header">
                  <h2>Delete Module</h2>
                  <button
                    onClick={() => navigate("/delete-full-exam-category")}
                  >
                    Go
                  </button>
                </div>
              </li>
            </div>
            <div className="admin-panel-inside">
              <li>
                <div className="item-header">
                  <h2>Create Exam</h2>
                  <button onClick={() => navigate("/add-certexam")}>Go</button>
                </div>
              </li>
              <li>
                <div className="item-header">
                  <h2>Delete Exam (need fix)</h2>
                  <button onClick={() => navigate("/")}>Go</button>
                </div>
              </li>
            </div>
            <li>
              <div className="item-header">
                <h2>Role Access</h2>
                <button onClick={() => navigate("/assignrole")}>Go</button>
              </div>
            </li>
          </div>
        </ul>
      </div>
      <Footer color={"lightgrey"} />
    </div>
  );
}
// <button onClick={() => handleBuy(certification)}>Go</button>
