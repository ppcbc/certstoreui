import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "../css/Finish.css";
import axios from "axios";
import http from "../data/http";
import { useSelector } from "react-redux";
import formatDateWithHours from "../data/formatDateWithHours";
import { useNavigate } from "react-router-dom";

function Finish({
  score,
  myAnswers,
  userStafId,
  originalExams,
  startTime,
  endTime
}) {
  const [myDetails1, setMyDetails1] = useState([]);
  const [scores, setScores] = useState([]);
  const [totalScores, setTotalScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getExams();
  }, []);

  const myToken = useSelector(state => state.token.value.tok);
  const myId = useSelector(state => state.token.value.id);

  const pdfRef = useRef();

  const downloadPDF = async () => {
    const input = pdfRef.current.querySelector(".finish-box");
    const button = input.querySelector(".download-button");
    button.style.display = "none";
    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true
    });
    button.style.display = "block";
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${totalScores.finishTitle}.pdf`);
  };

  async function getExams() {
    try {
      console.log("ORIGINAL EXAMS");
      console.log("ORIGINAL EXAMS");
      console.log("ORIGINAL EXAMS");
      console.log("ORIGINAL EXAMS");
      console.log(originalExams);
      console.log("ORIGINAL EXAMS");
      console.log("ORIGINAL EXAMS");
      console.log("ORIGINAL EXAMS");
      console.log("ORIGINAL EXAMS");
      let selectedExams = [];

      selectedExams = originalExams;
      for (let i = 0; i < originalExams.length; i++) {
        for (let y = 0; y < myAnswers.length; y++) {
          if (originalExams[i].examId == myAnswers[y].id) {
            selectedExams[i] = {
              ...originalExams[i],
              ...myAnswers[y]
            };
          }
        }
      }
      console.log("SELECTED");
      console.log("SELECTED");
      console.log("SELECTED");
      console.log("SELECTED");
      console.log(selectedExams);
      console.log("SELECTED");
      console.log("SELECTED");
      console.log("SELECTED");
      console.log("SELECTED");

      var response = await axios.get(http + `api/UserStafs/${userStafId}`, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      let myStaf = response.data;

      var resCert = await axios.get(
        http + `api/CertExams/${myStaf.certExamId}`,
        {
          headers: {
            Authorization: "Bearer " + myToken
          }
        }
      );
      let myCertExam = resCert.data;

      for (let y = 0; y < selectedExams.length; y++) {
        selectedExams[y] = {
          ...selectedExams[y],
          testTitle: myCertExam.testTitle,
          testCode: myStaf.userStafId,
          testDescription: myCertExam.testDescription
        };
      }

      var resExamCategories = await axios.get(http + `api/ExamCategories`, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      var resCategories = resExamCategories.data;
      for (let y = 0; y < resCategories.length; y++) {
        for (let i = 0; i < selectedExams.length; i++) {
          if (selectedExams[i].categoryId == resCategories[y].categoryId) {
            selectedExams[i] = {
              ...selectedExams[i],
              categoryName: resCategories[y].categoryName
            };
          }
        }
      }
      let resUserDetails = await axios.get(http + `api/UserDetails`, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      let myDetails = resUserDetails.data.filter(a => a.id == myId);

      let test1 = selectedExams.map(prev => {
        return {
          ...prev,
          name: myDetails[0].name,
          lastName: myDetails[0].lastName,
          candidateNumber: myDetails[0].detailId,
          examDate: startTime,
          testReportDate: endTime
        };
      });
      // console.log(selectedExams);
      // console.log(test1);
      setMyDetails1(test1);
      // console.log(test1);
      test(test1);
      deleteStaf();
    } catch (error) {
      console.log(error.message);
    }
  }

  function test(myDetails) {
    console.log(myDetails);
    const myCategory = Object.values(
      myDetails.reduce((acc, item) => {
        if (!acc[item.categoryName]) {
          acc[item.categoryName] = [];
        }
        acc[item.categoryName].push(item);
        return acc;
      }, {})
    );

    // console.log(myCategory);

    let x = calculateScoresForAllGroups(myCategory);
    // console.log(x);
    setScores(x);
    let y = calculateFullScores(x, myDetails);
    // console.log(y);
    setTotalScores(y);
    createMyCertificate(y);
  }

  function calculateScoreForGroup(questions) {
    let score = 0;

    for (const question of questions) {
      if (
        question.isCorrect1 == true &&
        question.option1 == question.myAnsweredQuestion
      ) {
        score += 1;
      }
      if (
        question.isCorrect2 == true &&
        question.option2 == question.myAnsweredQuestion
      ) {
        score += 1;
      }
      if (
        question.isCorrect3 == true &&
        question.option3 == question.myAnsweredQuestion
      ) {
        score += 1;
      }
      if (
        question.isCorrect4 == true &&
        question.option4 == question.myAnsweredQuestion
      ) {
        score += 1;
      }
    }

    return score;
  }

  function calculateScoresForAllGroups(groupedQuestions) {
    return groupedQuestions.map((group, index) => {
      return {
        categoryName: group[0]?.categoryName || null,
        score: calculateScoreForGroup(group),
        totalQuestions: group.length
      };
    });
  }

  function calculateFullScores(questionsAll, myDetails) {
    let score = 0;
    let totalQuestions = 0;
    for (let quest of questionsAll) {
      score += quest.score;
      totalQuestions += quest.totalQuestions;
    }
    return {
      score,
      totalQuestions,
      successRate: `${((score / totalQuestions) * 100).toFixed(2)}%`,
      description: questionsAll[0].categoryName,
      name: myDetails[0].name,
      lastName: myDetails[0].lastName,
      totalScore: `${score}/${totalQuestions}`,
      candidateNumber: myDetails[0].candidateNumber,
      testCode: myDetails[0].testCode,
      startTime: formatDateWithHours(startTime),
      reportDate: formatDateWithHours(endTime),
      finishTitle: myDetails[0].testTitle,
      userId: myId,
      passed: score / totalQuestions > 0.5,
      marked: false,
      testDescription: myDetails[0].testDescription
    };
  }

  async function createMyCertificate(cert) {
    try {
      var response = await axios.post(
        "https://localhost:7117/api/Certificates",
        cert,
        {
          headers: {
            Authorization: "Bearer " + myToken
          }
        }
      );
      console.log("response");
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteStaf() {
    try {
      var response = await axios.delete(http + `api/UserStafs/${userStafId}`, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div ref={pdfRef} className="finish-container">
      <div className="finish-box">
        <h1 className="finish-title">
          {/* Software Development Skills Foundation (C#) */}
          {totalScores.finishTitle}
        </h1>
        <div className="result-info">
          <p className="finish-total-score">
            Total score: {totalScores.score} out of {totalScores.totalQuestions}
          </p>
          <p className="percentage-total-score">
            Percentage Score: {totalScores.successRate}
          </p>
          <p className="congratulations">
            {totalScores.score / totalScores.totalQuestions > 0.5
              ? "Congratulations!! You passed the exam."
              : "You Failed."}
          </p>
        </div>

        <div className="candidate-details">
          <div className="candidate-item">
            <span className="candidate-label">Candidate Name: </span>
            <span className="candidate-value">
              {totalScores.lastName} {totalScores.name}
            </span>
          </div>
          <div className="candidate-item">
            <span className="candidate-label">Candidate Number: </span>
            <span className="candidate-value">
              {totalScores.candidateNumber}
            </span>
          </div>
          <div className="candidate-item">
            <span className="candidate-label">Assessment Test Code: </span>
            <span className="candidate-value">{totalScores.testCode}</span>
          </div>
          <div className="candidate-item">
            <span className="candidate-label">Examination Date: </span>
            <span className="candidate-value">{totalScores.startTime}</span>
          </div>
          <div className="candidate-item">
            <span className="candidate-label">Test Report Date: </span>
            <span className="candidate-value">{totalScores.reportDate}</span>
          </div>
          <div className="candidate-item">
            <span className="candidate-label">Total Score: </span>
            <span className="candidate-value">{totalScores.totalScore}</span>
          </div>
          <div className="candidate-item">
            <span className="candidate-label">Percentage Score: </span>
            <span className="candidate-value">{totalScores.successRate}</span>
          </div>
          <div className="candidate-item">
            <span className="candidate-label">Assessment Result Label: </span>
            <span className="candidate-value">
              {totalScores.score / totalScores.totalQuestions > 0.5
                ? "Passed"
                : "Not Pass"}
            </span>
          </div>
        </div>

        <table className="topic-table">
          <thead>
            <tr>
              <th>Topic Description</th>
              <th>
                Number of <br />
                Awarded Marks
              </th>
              <th>
                Number of <br />
                Possible Marks
              </th>
              <th>Success Rate</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((totalScore, index) => (
              <tr key={index}>
                <td className="topic-description">{totalScore.categoryName}</td>
                <td className="awarded-marks">{totalScore.score}</td>
                <td className="possible-marks">{totalScore.totalQuestions}</td>
                <td>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${
                            (totalScore.score / totalScore.totalQuestions) * 100
                          }`
                        }}
                      ></div>
                    </div>
                    <span className="percentage">{`${(
                      (totalScore.score / totalScore.totalQuestions) *
                      100
                    ).toFixed(2)}`}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="topic-description">Total score</td>
              <td>{totalScores.score}</td>
              <td>{totalScores.totalQuestions}</td>
              <td colSpan="1"></td>
            </tr>
          </tfoot>
        </table>
        {/* <button onClick={() => test(myDetails1)} className="download-button">
          Test
        </button> */}

        <button onClick={downloadPDF} className="download-button">
          Download Results as PDF
        </button>
        {/* <button className="download-button" onClick={() => navigate("home")}>
          Return
        </button> */}
      </div>
    </div>
  );
}

export default Finish;
