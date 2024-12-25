import React from "react";
import "../css/AllQuestions.css";

function AllQuestions({ id, getCurrentQuestion }) {
  return (
    <div className="Questions-container" onClick={() => getCurrentQuestion(id)}>
      Question {id + 1}
    </div>
  );
}

export default AllQuestions;
