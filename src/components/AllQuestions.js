import React, { useState } from "react";
import "../css/AllQuestions.css";

function AllQuestions({ id, getCurrentQuestion, currentQuestion, isAnswered }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [answered, setAnswered] = useState(false);

  function checkMouseOver({ number, answer }) {
    setIsMouseOver(!isMouseOver);
  }

  function answerThis() {
    setAnswered(true);
    getCurrentQuestion(currentQuestion);
  }
  return (
    <div
      className="Questions-container"
      onMouseOver={checkMouseOver}
      onMouseOut={checkMouseOver}
      style={{
        backgroundColor:
          (isMouseOver && "var(--color7)") || (isAnswered && "var(--color6)"),
        color: isMouseOver && "white"
      }}
      onClick={answerThis}
    >
      Question {currentQuestion + 1}
    </div>
  );
}

export default AllQuestions;
