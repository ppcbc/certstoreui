import React, { useEffect, useState } from "react";
import "../css/Exam.css";
import http from "../data/http";
import axios from "axios";
import Question from "./Question";
import AllQuestions from "./AllQuestions";

function Exam() {
  const [exams, setExams] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [idCorrect, setIdCorrect] = useState({
    questionNumber: 0,
    isCorrect: false,
    answered: false
  });
  const [results, setResults] = useState([]);
  const [counter, setCounter] = useState(0);
  const [finish, setFinish] = useState(false);

  async function getExam() {
    try {
      let response = await axios.get(http + "api/exams");
      let myData = response.data;
      setExams(() => {
        return myData
          .filter(item => item.categoryId === 1)
          .map((item, index) => {
            return {
              examId: item.examId,
              categoryId: item.categoryId,
              question: item.questionText,
              photoLink: item.questionPhotoLink,
              answer1: item.option1,
              correct1: item.isCorrect1,
              answer2: item.option2,
              correct2: item.isCorrect1,
              answer3: item.option3,
              correct3: item.isCorrect3,
              answer4: item.option4,
              correct4: item.isCorrect4,
              isAnswered: false,
              selected: index === 0 ? true : false
            };
          });
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getExam();
  }, []);

  function getQuestion(currentQuestion) {
    setQuestionNumber(currentQuestion);
    let fullExams = exams.map(prev => {
      return {
        ...prev,
        selected: false
      };
    });
    setExams(prev => fullExams);
    fullExams[currentQuestion].selected = true;
    console.log(fullExams);
    setExams(prev => fullExams);
  }

  function checkSelect(currentQuestion) {
    let fullExams = exams.map(prev => {
      return {
        ...prev,
        selected: false
      };
    });
    setExams(prev => fullExams);
    fullExams[currentQuestion].selected = true;
    console.log(fullExams);
    setExams(prev => fullExams);
  }

  function checkCorrect(isCorrect) {
    setIdCorrect(isCorrect);

    let filteredExams = exams;
    filteredExams[isCorrect.questionNumber].isAnswered = true;
    setExams(prev => filteredExams);

    setResults(prev => {
      return [...prev, isCorrect];
    });

    if (isCorrect.isCorrect === true) {
      setCounter(prev => prev + 1);
    }
  }

  return (
    <div className="grid-container">
      {/* <h3 className="exam-title">hi</h3> */}
      <div className="grid-inner1">
        <div className="box box1 hidesb">
          {exams.map((item, index) => (
            <AllQuestions
              key={item.examId}
              id={item.examId}
              currentQuestion={index}
              getCurrentQuestion={getQuestion}
              isAnswered={item.isAnswered}
              selected={item.selected}
            />
          ))}
        </div>
        <div className="box box2">
          {exams[questionNumber] && (
            <Question
              Key={exams[questionNumber]}
              idIsCorrect={checkCorrect}
              Exam={exams[questionNumber]}
              questionNumber={questionNumber}
              isCorrect={checkCorrect}
            />
          )}
        </div>
        <div className="box1"></div>
      </div>

      {/* <div className="box box3">
        Box 3 <br />
        Correct Answers: {counter}
      </div>
      <div className="box box4">
        Box 4 <br />
        <ul>
          {results.length > 0 &&
            results.map((a, index) => (
              <li Key={index}>
                {a.id} is {a.isCorrect ? "correct" : "wrong"}
              </li>
            ))}
        </ul>
      </div>
      <div className="box box5">Box 5</div> */}
    </div>
  );
}

export default Exam;
