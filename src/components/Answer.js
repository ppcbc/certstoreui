import React, { useState } from "react";
import "../css/Answer.css";

function Answer({ answer, correct, number, getAnswer, questionNumber, Id }) {
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
      onClick={() =>
        getAnswer({
          isCorrect: correct,
          questionNumber: questionNumber,
          Id: Id,
          answered: true
        })
      }
      style={{
        backgroundColor: isMouseOver && "var(--color7)",
        color: isMouseOver && "white"
      }}
    >
      <span className="make-larger">{number}</span>: {answer}
    </div>
  );
}

export default Answer;
