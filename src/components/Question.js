import React, { useState } from "react";
import "../css/Question.css";
import Image from "./Image";
import Answer from "./Answer";

function Question({ Exam, questionNumber, idIsCorrect }) {
  // const [idIsCorrect, setIdIsCorrect] = useState({
  //   id: 0,
  //   isCorrect: false
  // });
  const [counter, setCounter] = useState(0);

  function getId() {}

  function getAnswer(isCorrect) {
    idIsCorrect(isCorrect);
  }

  return (
    <div className="question-container">
      {Exam.question !== "" && (
        <div className="question">
          <p className="questionText">
            {questionNumber + 1}. {Exam.question}
          </p>
        </div>
      )}
      {Exam.photoLink !== "" && (
        <div className="image">
          <Image link={Exam.photoLink} />
        </div>
      )}
      <Answer
        answer={Exam.answer1}
        correct={Exam.correct1}
        number={"A"}
        questionNumber={questionNumber}
        Id={Exam.examId}
        getAnswer={getAnswer}
      />
      <Answer
        answer={Exam.answer2}
        correct={Exam.correct2}
        number={"B"}
        questionNumber={questionNumber}
        Id={Exam.examId}
        getAnswer={getAnswer}
      />
      <Answer
        answer={Exam.answer3}
        correct={Exam.correct3}
        number={"C"}
        questionNumber={questionNumber}
        Id={Exam.examId}
        getAnswer={getAnswer}
      />
      <Answer
        answer={Exam.answer4}
        correct={Exam.correct4}
        number={"D"}
        questionNumber={questionNumber}
        Id={Exam.examId}
        getAnswer={getAnswer}
      />
      {Exam.photoLink === "" && <div className="image"></div>}
      {Exam.question === "" && <div className="question"></div>}
    </div>
  );
}

export default Question;
