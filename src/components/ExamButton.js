import React, { useState } from "react";
import "../css/ExamButton.css";

function ExamButton({ children }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  function checkMouseOver() {
    setIsMouseOver(!isMouseOver);
  }
  return (
    <div
      className="question-button"
      onMouseOut={checkMouseOver}
      onMouseOver={checkMouseOver}
      style={{ backgroundColor: isMouseOver && "var(--color5" }}
    >
      {children}
    </div>
  );
}

export default ExamButton;
