import React from "react";
import "../css/AllQuestions.css";

function AllQuestions({ id, getCurrentQuestion }) {
  return (
    <div className="container" onClick={() => getCurrentQuestion(id)}>
      <p>Question {id + 1}</p>
    </div>
  );
}

export default AllQuestions;
