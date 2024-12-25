import React, { useState } from "react";
import "../css/Question.css";
import Image from "./Image";
import Answer from "./Answer";

function Question({ Exam, Id }) {
  return (
    <div className="question-container">
      {Exam.question !== "" && (
        <div className="question">
          <p className="questionText">
            {Id + 1}. {Exam.question}
          </p>
        </div>
      )}
      {Exam.photoLink !== "" && (
        <div className="image">
          <Image link={Exam.photoLink} />
        </div>
      )}
      <Answer answer={Exam.answer1} />
      <Answer answer={Exam.answer2} />
      <Answer answer={Exam.answer3} />
      <Answer answer={Exam.answer4} />
      {Exam.photoLink === "" && <div className="image"></div>}
      {Exam.question === "" && <div className="question"></div>}
    </div>
  );
}

export default Question;
