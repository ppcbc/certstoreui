import React, { useEffect, useState } from "react";
import "../css/Exam.css";
import http from "../data/http";
import axios from "axios";
import Question from "./Question";
import AllQuestions from "./AllQuestions";

// pass categoryId and category name as parameters
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

  async function getExam() {
    try {
      let response = await axios.get(http + "api/exams");
      // console.log(response.data);
      let myData = response.data;
      setExams(() => {
        return myData
          .filter(item => item.categoryId === 1)
          .map(item => {
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
              isAnswered: false
            };
          });
      });
      // console.log(exams);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getExam();
  }, []);

  function getQuestion(currentQuestion) {
    setQuestionNumber(currentQuestion);
  }

  function checkCorrect(isCorrect) {
    console.log(isCorrect);
    setIdCorrect(isCorrect);

    let answeredExam = exams.filter(item => item.examId === isCorrect.Id);
    console.log(answeredExam);
    let filteredExams = exams.filter(prev => prev.examId !== isCorrect.Id);
    filteredExams[0].isAnswered = true;
    filteredExams.push(answeredExam[0]);
    setExams(prev => filteredExams);
    console.log(filteredExams);

    // setResults(prev => (prev[isCorrect.id] = isCorrect.isCorrect));
    setResults(prev => {
      return [...prev, isCorrect];
    });

    // setExams(prev => prev.filter((a, i) => i !== isCorrect.id));
    // setExams(prev => {
    //   prev[isCorrect.id].isAnswered = true;
    // });

    if (isCorrect.isCorrect === true) {
      setCounter(prev => prev + 1);
    }
  }

  return (
    <div className="grid-container">
      <div className="box box1 hidesb">
        {exams.map((item, index) => (
          <AllQuestions
            key={item.examId}
            id={item.examId}
            currentQuestion={index}
            getCurrentQuestion={getQuestion}
            isAnswered={item.isAnswered}
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
      <div className="box box3">
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
      <div className="box box5">Box 5</div>
    </div>
  );
}

export default Exam;
