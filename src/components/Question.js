import React, { useState } from "react";
import "../css/Question.css";
import Image from "./Image";
import Answer from "./Answer";
import ExamButton from "./ExamButton";
import FinishButton from "./FinishButton";

function Question({
  Exam,
  questionNumber,
  idIsCorrect,
  nextOrPrevious,
  timeLeft,
  finish,
  selectedAnswer,
  getAnsNum
}) {
  // const [idIsCorrect, setIdIsCorrect] = useState({
  //   id: 0,
  //   isCorrect: false
  // });
  const [counter, setCounter] = useState(0);
  // const [selectedAnswer, setSelectedAnswer] = useState(null);

  function getId() {}

  function getAnswer(isCorrect) {
    idIsCorrect(isCorrect);
    // setSelectedAnswer(isCorrect.selectedAnswer);
  }

  return (
    <div className="question-container">
      <div className="question-title">
        <p>
          Time Left:{" "}
          {Math.floor(timeLeft / 3600) > 0
            ? `${Math.floor(timeLeft / 3600)}h ` // Display hours if greater than 0
            : ""}
          {Math.floor((timeLeft % 3600) / 60)}m{" "}
          {String(timeLeft % 60).padStart(2, "0")}s
        </p>
        <FinishButton finish={finish}>Finish Exam</FinishButton>
      </div>
      {Exam.question !== "" && (
        <div className="question">
          <p className="questionText">
            <span className="make-larger">{questionNumber + 1}.</span>{" "}
            {Exam.question}
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
        selectedAnswer={selectedAnswer}
        getAnsNum={getAnsNum}
      />
      <Answer
        answer={Exam.answer2}
        correct={Exam.correct2}
        number={"B"}
        questionNumber={questionNumber}
        Id={Exam.examId}
        getAnswer={getAnswer}
        selectedAnswer={selectedAnswer}
        getAnsNum={getAnsNum}
      />
      <Answer
        answer={Exam.answer3}
        correct={Exam.correct3}
        number={"C"}
        questionNumber={questionNumber}
        Id={Exam.examId}
        getAnswer={getAnswer}
        selectedAnswer={selectedAnswer}
        getAnsNum={getAnsNum}
      />
      <Answer
        answer={Exam.answer4}
        correct={Exam.correct4}
        number={"D"}
        questionNumber={questionNumber}
        Id={Exam.examId}
        getAnswer={getAnswer}
        selectedAnswer={selectedAnswer}
        getAnsNum={getAnsNum}
      />
      {Exam.photoLink === "" && <div className="image"></div>}
      {Exam.question === "" && <div className="question"></div>}
      <div className="question-buttons">
        <ExamButton nextOrPrevious={nextOrPrevious} what="previous">
          Previous
        </ExamButton>
        <ExamButton nextOrPrevious={nextOrPrevious} what="next">
          Next
        </ExamButton>
      </div>
    </div>
  );
}

export default Question;
