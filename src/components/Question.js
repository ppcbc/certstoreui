import React from "react";
import "../css/Question.css";
import Image from "./Image";

function Question({
  question,
  photoLink,
  answer1,
  correct1,
  answer2,
  correct2,
  answer3,
  correct3,
  answer4,
  correct4
}) {
  return (
    <div className="container">
      <div className="question">
        <p className="questionText">{question}</p>
      </div>
      <div className="image">
        <Image link={photoLink} />
      </div>
      <div className="answer">
        <p className="answerText">{answer1}</p>
      </div>
      <div className="answer">
        <p className="answerText">{answer2}</p>
      </div>
      <div className="answer">
        <p className="answerText">{answer3}</p>
      </div>
      <div className="answer">
        <p className="answerText">{answer4}</p>
      </div>
    </div>
  );
}

export default Question;
