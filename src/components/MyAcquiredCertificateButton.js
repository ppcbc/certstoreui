import React from "react";
import "../css/ExamButton.css";
import { useNavigate } from "react-router-dom";

function MyAcquiredCertificateButton({ userStafId, redeem }) {
  const navigate = useNavigate();
  return (
    <div className="acquired-certificates-buttons-container">
      <button
        className="acquired-certificates-button"
        onClick={() => navigate("/finish")}
      >
        View Results
      </button>
      {redeem && (
        <button
          className="acquired-certificates-button"
          onClick={() => navigate("/diploma")}
        >
          View Diploma
        </button>
      )}
    </div>
  );
}

export default MyAcquiredCertificateButton;
