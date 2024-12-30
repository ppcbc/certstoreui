import React, { useState } from "react";
import "../css/AllQuestions.css";

function AllQuestions({
  id,
  getCurrentQuestion,
  currentQuestion,
  isAnswered,
  selected
}) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [select, setSelect] = useState(false);

  function checkMouseOver({ number, answer }) {
    setIsMouseOver(!isMouseOver);
  }

  if (selected) {
    isAnswered = false;
  }

  function answerThis() {
    // selected(currentQuestion);
    getCurrentQuestion(currentQuestion);
  }
  return (
    <div
      className="Questions-container"
      onMouseOver={checkMouseOver}
      onMouseOut={checkMouseOver}
      style={{
        backgroundColor:
          (isMouseOver && "var(--color7)") ||
          (isAnswered && "var(--color9)") ||
          (selected && "var(--color7"),
        color:
          (isMouseOver && "white") ||
          (isAnswered && "white") ||
          (selected && "white")
      }}
      onClick={answerThis}
    >
      Question {currentQuestion + 1}
    </div>
  );
}

export default AllQuestions;
