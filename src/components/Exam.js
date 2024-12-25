import React, { useEffect, useState } from "react";
import "../css/Exam.css";
import http from "../data/http";
import axios from "axios";
import Question from "./Question";
import AllQuestions from "./AllQuestions";

function Exam() {
  const [exams, setExams] = useState([]);

  async function getExam() {
    try {
      let response = await axios.get(http + "api/exams");
      console.log(response.data);
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
      console.log(exams);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getExam();
  }, []);
  return (
    <div className="container">
      <div className="title">
        <h1>hello</h1>
      </div>
      <div className="grid-container">
        <div className="box box1">
          {exams.map((item, index) => (
            <AllQuestions key={index} id={index} />
          ))}
        </div>
        <div className="box box2">
          {exams[0] && (
            <Question
              key={0}
              question={exams[0].question}
              photoLink={exams[0].photoLink}
              answer1={exams[0].answer1}
              correct1={exams[0].correct1}
              answer2={exams[0].answer2}
              correct2={exams[0].correct2}
              answer3={exams[0].answer3}
              correct3={exams[0].correct3}
              answer4={exams[0].answer4}
              correct4={exams[0].correct4}
            />
          )}
        </div>
        <div className="box box3">
          <button onClick={getExam}>Box 3</button>
        </div>
        <div className="box box4">Box 4</div>
        <div className="box box5">Box 5</div>
      </div>
    </div>
  );
}

export default Exam;
