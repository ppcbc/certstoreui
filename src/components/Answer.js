import React, { useState } from "react";
import "../css/Answer.css";

function Answer({ answer }) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  function checkMouseOver({ number, answer }) {
    setIsMouseOver(!isMouseOver);
  }
  return (
    <div
      className="answer"
      onMouseOver={checkMouseOver}
      onMouseOut={checkMouseOver}
      style={{ backgroundColor: isMouseOver && "#D9EAFD" }}
    >
      <p
        onMouseOver={checkMouseOver}
        onMouseOut={checkMouseOver}
        className="answerText"
      >
        {answer}
      </p>
    </div>
  );
}

export default Answer;
