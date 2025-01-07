import React, { useState } from "react";
import "../css/ExamButton.css";
import { useNavigate } from "react-router-dom";

function CertificateResultsButton({
  onClick,
  bkgrColor,
  clas,
  dateOfSendCertExam,
  userStafId,
  today,
  certificateKey
}) {
  const navigate = useNavigate();
  const [isMouseOver, setIsMouseOver] = useState(false);

  function checkMouseOver() {
    setIsMouseOver(!isMouseOver);
  }

  return (
    <div
      className={clas}
      onMouseOut={checkMouseOver}
      onMouseOver={checkMouseOver}
      style={{ backgroundColor: isMouseOver && `var(--${bkgrColor})` }}
      onClick={() => navigate(`/cert-to-check/${certificateKey}`)}
    >
      Check
    </div>
  );
}

export default CertificateResultsButton;
