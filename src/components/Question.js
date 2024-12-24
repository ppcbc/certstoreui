import React from "react";
import "../css/Question.css";

function Question({ id }) {
  return <div className="container">Question {id + 1}</div>;
}

export default Question;
