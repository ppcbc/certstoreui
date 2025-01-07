import React from "react";
import "../App.css";
import "../css/AdminPanel.css";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import AdminPanelLi from "./AdminPanelLi";

export default function AdminPanel() {
  const navigate = useNavigate();
  return (
    <div className="admin-panel-main">
      <div className="admin-panel">
        <h1>Admin Panel</h1>
        <ul>
          <div className="admin-panel-container">
            <h2>Exam</h2>
            <div className="admin-panel-group">
              <AdminPanelLi
                title={"Create Exam"}
                description={"Design and add a new exam test to the system."}
                link={"/add-certexam"}
              />
              <AdminPanelLi
                title={"Update Exam"}
                description={"Update the title or details of the exam"}
                link={"/update-certexam"}
              />

              <AdminPanelLi
                title={"Delete Exam"}
                description={"Remove an existing exam test permanently."}
                link={"/delete-certexam"}
              />
            </div>
          </div>
          <div className="admin-panel-container">
            <h2>Question</h2>
            <div className="admin-panel-group">
              <AdminPanelLi
                title={"Create Question"}
                description={
                  "Create a new question by filling in the required fields and options."
                }
                link={"/addexam"}
              />

              <AdminPanelLi
                title={"Update Question"}
                description={
                  "Edit an existing question to make changes or corrections."
                }
                link={"/update-exam"}
              />

              <AdminPanelLi
                title={"Delete Question"}
                description={"Remove an existing question from the system."}
                link={"/delete-exam"}
              />
            </div>

            <div className="admin-panel-container">
              <h2>Category</h2>
              <div className="admin-panel-group">
                <AdminPanelLi
                  title={"Create Category"}
                  description={"Create a new category to organize questions."}
                  link={"/addexam-category"}
                />

                <AdminPanelLi
                  title={"Update Category"}
                  description={
                    "Modify an existing category to update its details."
                  }
                  link={"/updateexam-category"}
                />

                <AdminPanelLi
                  title={"Delete Category"}
                  description={"Remove a category that is no longer needed."}
                  link={"/delete-exam-category"}
                />
              </div>
            </div>
            <div className="admin-panel-container">
              <h2>Module</h2>
              <div className="admin-panel-group">
                <AdminPanelLi
                  title={"Create Module"}
                  description={
                    "Add a new module category to structure content effectively."
                  }
                  link={"/addfull-category"}
                />

                <AdminPanelLi
                  title={"Update Module"}
                  description={
                    "Edit the details of an existing module category."
                  }
                  link={"/update-full-exam-category"}
                />

                <AdminPanelLi
                  title={"Delete Module"}
                  description={"Delete a module category from the system."}
                  link={"/delete-full-exam-category"}
                />
              </div>
            </div>

            <div className="admin-panel-container">
              <h2>User</h2>
              <div className="admin-panel-group">
                <AdminPanelLi
                  title={"Role Access"}
                  description={
                    "Select and assign a role to a user, defining their level of access."
                  }
                  link={"/assignrole"}
                />
                <AdminPanelLi
                  title={"Update User"}
                  description={
                    "Modify user details such as name, email, or other attributes."
                  }
                  link={"/update-user"}
                />

                <AdminPanelLi
                  title={"Delete User"}
                  description={"Permanently remove a user from the system"}
                  link={"/delete-user"}
                />
              </div>
            </div>
          </div>
        </ul>
      </div>
      <Footer color={"lightgrey"} />
    </div>
  );
}
