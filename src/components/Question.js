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
      <Answer answer={Exam.answer1} correct={Exam.correct1} number={"A"} />
      <Answer answer={Exam.answer2} correct={Exam.correct2} number={"B"} />
      <Answer answer={Exam.answer3} correct={Exam.correct3} number={"C"} />
      <Answer answer={Exam.answer4} correct={Exam.correct4} number={"D"} />
      {Exam.photoLink === "" && <div className="image"></div>}
      {Exam.question === "" && <div className="question"></div>}
    </div>
  );
}

export default Question;
