import React, { useState } from "react";
import "../css/AllQuestions.css";

function AllQuestions({ id, getCurrentQuestion }) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  function checkMouseOver({ number, answer }) {
    setIsMouseOver(!isMouseOver);
  }
  return (
    <div
      className="Questions-container"
      onMouseOver={checkMouseOver}
      onMouseOut={checkMouseOver}
      style={{
        backgroundColor: isMouseOver && "var(--color7)",
        color: isMouseOver && "white"
      }}
      onClick={() => getCurrentQuestion(id)}
    >
      Question {id + 1}
    </div>
  );
}

export default AllQuestions;
