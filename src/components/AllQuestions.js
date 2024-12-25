import React from "react";
import "../css/AllQuestions.css";

function AllQuestions({ id }) {
  return <div className="container">Question {id + 1}</div>;
}

export default AllQuestions;
