import React from "react";
import "../css/Question.css";
import Image from "./Image";

function Question({ Exam, Id }) {
  return (
    <div className="question-container">
      {Exam.question !== "" && (
        <div className="question">
          <p className="questionText">{Exam.question}</p>
        </div>
      )}
      {Exam.photoLink !== "" && (
        <div className="image">
          <Image link={Exam.photoLink} />
        </div>
      )}
      <div className="answer">
        <p className="answerText">1. {Exam.answer1}</p>
      </div>
      <div className="answer">
        <p className="answerText">2. {Exam.answer2}</p>
      </div>
      <div className="answer">
        <p className="answerText">3. {Exam.answer3}</p>
      </div>
      <div className="answer">
        <p className="answerText">4. {Exam.answer4}</p>
      </div>
      {Exam.photoLink === "" && <div className="image"></div>}
      {Exam.question === "" && <div className="question"></div>}
    </div>
  );
}

export default Question;
