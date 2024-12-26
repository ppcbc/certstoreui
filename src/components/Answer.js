import React, { useState } from "react";
import "../css/Answer.css";

function Answer({ answer, correct, number }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [select, setSelect] = useState({});

  function checkMouseOver() {
    setIsMouseOver(!isMouseOver);
  }
  return (
    <div
      className="answer"
      onMouseOver={checkMouseOver}
      onMouseOut={checkMouseOver}
      style={{ backgroundColor: isMouseOver && "var(--color3)" }}
    >
      {number}: {answer}
    </div>
  );
}

export default Answer;
