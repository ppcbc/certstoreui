import React, { useEffect, useState } from "react";
import "../css/Exam.css";
import http from "../data/http";
import axios from "axios";
import Question from "./Question";
import AllQuestions from "./AllQuestions";

// pass categoryId and category name as parameters
function Exam() {
  const [exams, setExams] = useState([]);
  const [questionId, setQuestionId] = useState(0);
  const [idCorrect, setIdCorrect] = useState({
    id: 0,
    isCorrect: false
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
              question: item.questionText,
              photoLink: item.questionPhotoLink,
              answer1: item.option1,
              correct1: item.isCorrect1,
              answer2: item.option2,
              correct2: item.isCorrect1,
              answer3: item.option3,
              correct3: item.isCorrect3,
              answer4: item.option4,
              correct4: item.isCorrect4
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

  function getQuestion(id) {
    setQuestionId(id);
  }

  function checkCorrect(isCorrect) {
    console.log(isCorrect);
    setIdCorrect(isCorrect);

    // setResults(prev => (prev[isCorrect.id] = isCorrect.isCorrect));
    setResults(prev => {
      return [...prev, isCorrect];
    });
    setExams(prev => prev.filter((a, i) => i !== isCorrect.id));
    if (isCorrect.isCorrect === true) {
      setCounter(prev => prev + 1);
    }
  }

  return (
    <div className="grid-container">
      <div className="box box1 hidesb">
        {exams.map((item, index) => (
          <AllQuestions
            key={index}
            id={index}
            getCurrentQuestion={getQuestion}
          />
        ))}
      </div>
      <div className="box box2">
        {exams[questionId] && (
          <Question
            idIsCorrect={checkCorrect}
            Exam={exams[questionId]}
            Id={questionId}
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
