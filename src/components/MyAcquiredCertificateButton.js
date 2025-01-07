import React from "react";
import "../css/ExamButton.css";
import { useNavigate } from "react-router-dom";

function MyAcquiredCertificateButton({ certificateKey, redeem, marked }) {
  const navigate = useNavigate();
  return (
    <div className="acquired-certificates-buttons-container">
      <button
        className="acquired-certificates-button"
        onClick={() => navigate(`/certificateResults/${certificateKey}`)}
      >
        View Results
      </button>

      {marked && (
        <button
          className="acquired-certificates-button"
          onClick={() => navigate(`/diploma/${certificateKey}`)}
        >
          View Diploma
        </button>
      )}
    </div>
  );
}

export default MyAcquiredCertificateButton;
