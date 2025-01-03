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
              <p className="admin-panel-category-title">Questions:</p>
              <div className="admin-panel-item-header">
                <h2>CREATE QUESTION</h2>
                <p className="admin-panel-item-paragraph">Create a new question by filling in the required fields and
                  options.</p>
                <button onClick={() => navigate("/addexam")}>Go</button>
              </div>
            </li>
            <li>
              <p className="admin-panel-category-title">Questions:</p>
              <div className="admin-panel-item-header">
                <h2>UPDATE QUESTION</h2>  {/*//NEW*/}
                <p className="admin-panel-item-paragraph">Edit an existing question to make changes or corrections.</p>
                <button onClick={() => navigate("/update-exam")}>Go</button>
              </div>
            </li>
            <li>
              <p className="admin-panel-category-title">Questions:</p>
              <div className="admin-panel-item-header">
                <h2>DELETE QUESTION</h2>
                <p className="admin-panel-item-paragraph">Remove an existing question from the system.</p>
                <button onClick={() => navigate("/delete-exam")}>Go</button>
              </div>
            </li>
            <li>
              <p className="admin-panel-category-title">Question Categories:</p>
              <div className="admin-panel-item-header">
                <h2>CREATE QUESTION CATEGORY</h2>
                <p className="admin-panel-item-paragraph">Create a new category to organize questions.</p>
                <button onClick={() => navigate("/addexam-category")}>Go</button>
              </div>
            </li>
            <li>
              <p className="admin-panel-category-title">Question Categories:</p>
              <div className="admin-panel-item-header">
                <h2>UPDATE QUESTION CATEGORY</h2>
                <p className="admin-panel-item-paragraph">Modify an existing category to update its details.</p>
                <button onClick={() => navigate("/updateexam-category")}>
                  Go
                </button>
              </div>
            </li>
            <li>
              <p className="admin-panel-category-title">Question Categories:</p>
              <div className="admin-panel-item-header">
                <h2>DELETE QUESTION CATEGORY</h2>
                <p className="admin-panel-item-paragraph">Remove a category that is no longer needed.</p>
                <button onClick={() => navigate("/delete-exam-category")}>
                  Go
                </button>
              </div>
            </li>
            <li>
              <p className="admin-panel-category-title">Module:</p>
              <div className="admin-panel-item-header">
                <h2>CREATE MODULE</h2>
                <p className="admin-panel-item-paragraph">Add a new module category to structure content effectively.</p>
                <button onClick={() => navigate("/addfull-category")}>Go</button>
              </div>
            </li>
            <li>
              <p className="admin-panel-category-title">Module:</p>
              <div className="admin-panel-item-header">
                <h2>UPDATE MODULE</h2> {/*//NEW*/}
                <p className="admin-panel-item-paragraph">Edit the details of an existing module category.</p>
                <button onClick={() => navigate("/update-full-exam-category")}>Go</button>
              </div>
            </li>
            <li>
              <p className="admin-panel-category-title">Module:</p>
              <div className="admin-panel-item-header">
                <h2>DELETE MODULE</h2>
                <p className="admin-panel-item-paragraph">Delete a module category from the system.</p>
                <button onClick={() => navigate("/delete-full-exam-category")}>
                  Go
                </button>
              </div>
            </li>
            <li>
              <p className="admin-panel-category-title">Exam:</p>
              <div className="admin-panel-item-header">
                <h2>CREATE EXAM</h2>
                <p className="admin-panel-item-paragraph">Design and add a new exam test to the system.</p>
                <button onClick={() => navigate("/add-certexam")}>Go</button>
              </div>
            </li>
            <li>
              <p className="admin-panel-category-title">Exam:</p>
              <div className="admin-panel-item-header">
                <h2>DELETE EXAM</h2> {/*//NEW*/}
                <p className="admin-panel-item-paragraph">Remove an existing exam test permanently.</p>
                <button onClick={() => navigate("/add-certexam")}>Go</button>
              </div>
            </li>
            <li>
              <p className="admin-panel-category-title">User Control:</p>
              <div className="admin-panel-item-header">
                <h2>UPDATE USER</h2> {/*//NEW*/}
                <p className="admin-panel-item-paragraph">Modify user details such as name, email, or other
                  attributes.</p>
                <button onClick={() => navigate("/assignrole")}>Go</button>
              </div>
            </li>
            <li>
              <p className="admin-panel-category-title">User Control:</p>
              <div className="admin-panel-item-header">
                <h2>DELETE USER</h2> {/*//NEW*/}
                <p className="admin-panel-item-paragraph">Permanently remove a user from the system</p>
                <button onClick={() => navigate("/assignrole")}>Go</button>
              </div>
            </li>
            <li>
              <div className="admin-panel-item-header">
                <h2>ROLE ACCESS</h2>
                <p className="admin-panel-item-paragraph">Select and assign a role (e.g., Marker, Administrator, etc.) to a user, defining their level of access and responsibilities.</p>
                <button onClick={() => navigate("/assignrole")}>Go</button>
              </div>
            </li>
          </ul>
        </div>
        <Footer color={"lightgrey"}/>
      </div>
  );
}
// <button onClick={() => handleBuy(certification)}>Go</button>
