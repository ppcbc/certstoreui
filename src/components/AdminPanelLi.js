import React from "react";
import { useNavigate } from "react-router-dom";

function AdminPanelLi({ title, description, link }) {
  const navigate = useNavigate();
  return (
    <div className="admin-panel-item">
      <li>
        <div className="admin-panel-item-header">
          <h2>{title}</h2>
          <div className="admin-panel-paragraph-container">
            <p className="admin-panel-item-paragraph">{description}</p>
          </div>
          <button onClick={() => navigate(`${link}`)}>Go</button>
        </div>
      </li>
    </div>
  );
}

export default AdminPanelLi;
