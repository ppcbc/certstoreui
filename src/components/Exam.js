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

  async function getExam() {
    try {
      let response = await axios.get(http + "api/exams");
      console.log(response.data);
      let myData = response.data;
      setExams(() => {
        return myData
          .filter((item) => item.categoryId === 1)
          .map((item) => {
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
              correct4: item.isCorrect4,
            };
          });
      });
      console.log(exams);
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

  return (
    // <div className="container">
    <div className="grid-container">
      <div className="box1">
        {exams.map((item, index) => (
          <div key={index} className="all-question-item">
            <AllQuestions id={index} getCurrentQuestion={getQuestion} />
          </div>
        ))}
      </div>

      <div className="box box2">
        {exams[questionId] && (
          <Question Exam={exams[questionId]} Id={questionId} />
        )}
      </div>
      <div className="box box3">Box 3</div>
      <div className="box box4">Box 4</div>
      <div className="box box5">Box 5</div>
    </div>
  );
  /* </div> */
}

export default Exam;
