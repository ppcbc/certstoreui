import React, { useState } from "react";
import "../css/Answer.css";

function Answer({
  answer,
  correct,
  number,
  getAnswer,
  questionNumber,
  Id,
  selectedAnswer,
  getAnsNum
}) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [select, setSelect] = useState({});

  function checkMouseOver() {
    setIsMouseOver(!isMouseOver);
  }

  const isSelected = selectedAnswer === number;

  return (
    <div
      className="answer"
      onMouseOver={checkMouseOver}
      onMouseOut={checkMouseOver}
      onClick={() => {
        getAnswer({
          isCorrect: correct,
          questionNumber: questionNumber,
          Id: Id,
          answered: true,
          selectedAnswer: number,
          myAnsweredQuestion: answer
        });
        getAnsNum({
          id: Id,
          answered: true,
          myAnsweredQuestion: answer
        });
      }}
      style={{
        // backgroundColor:
        //   (isMouseOver && "var(--color7)") || (isSelected && "var(--color7)"),
        // color: isMouseOver && "white"
        backgroundColor: isSelected
          ? "var(--color7)" // Highlight selected answer
          : isMouseOver
          ? "var(--color7)" // Hover color
          : "transparent",
        color: isSelected || isMouseOver ? "white" : "black"
      }}
    >
      <span className="make-larger">{number}:</span> {answer}
    </div>
  );
}

export default Answer;
