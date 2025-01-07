import React, { useState } from "react";
import "../css/ExamButton.css";

function MyCertificateButton({
  onClick,
  bkgrColor,
  clas,
  dateOfSendCertExam,
  userStafId,
  today
}) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  function checkMouseOver() {
    setIsMouseOver(!isMouseOver);
  }

  // Convert dates to Date objects for accurate comparison
  const scheduledDate = new Date(dateOfSendCertExam);
  const currentDate = new Date(today);

  // Button text logic
  let buttonText;
  if (scheduledDate.toDateString() === currentDate.toDateString()) {
    buttonText = "Begin Exam";
  } else if (dateOfSendCertExam === "Select an exam date") {
    buttonText = "Select";
  } else {
    buttonText = "Change";
  }

  return (
    <div
      className={clas}
      onMouseOut={checkMouseOver}
      onMouseOver={checkMouseOver}
      style={{ backgroundColor: isMouseOver && `var(--${bkgrColor})` }}
      onClick={() => onClick(userStafId)}
    >
      {buttonText}
    </div>
  );
}

export default MyCertificateButton;
