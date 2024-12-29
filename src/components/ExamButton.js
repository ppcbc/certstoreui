import React, { useState } from "react";
import "../css/ExamButton.css";

function ExamButton({ children, nextOrPrevious, what }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  function checkMouseOver() {
    setIsMouseOver(!isMouseOver);
  }
  return (
    <div
      className="question-button"
      onMouseOut={checkMouseOver}
      onMouseOver={checkMouseOver}
      style={{ backgroundColor: isMouseOver && "var(--color9" }}
      onClick={() => nextOrPrevious(what)}
    >
      {children}
    </div>
  );
}

export default ExamButton;
