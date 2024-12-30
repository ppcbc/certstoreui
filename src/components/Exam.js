import React, { useEffect, useState } from "react";
import "../css/Exam.css";
import http from "../data/http";
import axios from "axios";
import Question from "./Question";
import AllQuestions from "./AllQuestions";
import { Link, useNavigate } from "react-router-dom";
import Finish from "./Finish";

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
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();

  async function getExam() {
    try {
      let response = await axios.get(http + "api/exams");
      let myData = response.data;
      const filteredExams = myData
        .filter(item => item.categoryId === 1)
        .map((item, index) => ({
          examId: item.examId,
          categoryId: item.categoryId,
          question: item.questionText,
          photoLink: item.questionPhotoLink,
          answer1: item.option1,
          correct1: item.isCorrect1,
          answer2: item.option2,
          correct2: item.isCorrect2,
          answer3: item.option3,
          correct3: item.isCorrect3,
          answer4: item.option4,
          correct4: item.isCorrect4,
          isAnswered: false,
          selected: index === 0
        }));

      setExams(filteredExams);

      if (filteredExams.length > 0) {
        setTimeLeft(filteredExams.length * 150);
        setIsTimerRunning(true);
      }

      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getExam();
  }, []);

  useEffect(() => {
    if (loading || !isTimerRunning || timeLeft <= 0) {
      if (timeLeft <= 0 && !loading) {
        setFinish(true);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setFinish(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isTimerRunning, loading]);

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
  function nextOrPrevious(what) {
    let filteredExam = exams.filter((prev, index) => prev.selected === true);
    let fullExam = exams;
    let index = fullExam.indexOf(filteredExam[0]);
    if (what === "previous" && index > 0) {
      fullExam = exams.map(prev => {
        return {
          ...prev,
          selected: false
        };
      });
      setExams(prev => fullExam);
      fullExam[index - 1].selected = true;
      setExams(prev => fullExam);
      setQuestionNumber(index - 1);
    }
    if (what === "next" && index < exams.length - 1) {
      fullExam = exams.map(prev => {
        return {
          ...prev,
          selected: false
        };
      });
      setExams(prev => fullExam);
      fullExam[index + 1].selected = true;
      setExams(prev => fullExam);
      setQuestionNumber(index + 1);
    }
  }
  function handleFinishExam() {
    setFinish(true);
    setIsTimerRunning(false);
  }

  if (loading) {
    return <div>Loading Exam...</div>;
  }

  return (
    <div className="grid-container">
      {!finish ? (
        <>
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
                  nextOrPrevious={nextOrPrevious}
                  timeLeft={timeLeft}
                  finish={handleFinishExam}
                />
              )}
            </div>
            <div className="box1"></div>
          </div>
        </>
      ) : (
        <Finish score={`${counter} / ${exams.length}`} />
      )}
    </div>
  );
}

export default Exam;
