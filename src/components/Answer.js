import React, { useState } from "react";
import "../css/Answer.css";

function Answer({ answer, correct, number, getAnswer, id }) {
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
      onClick={() => getAnswer({ isCorrect: correct, id: id })}
      style={{
        backgroundColor: isMouseOver && "var(--color7)",
        color: isMouseOver && "white"
      }}
    >
      {number}: {answer}
    </div>
  );
}

export default Answer;
