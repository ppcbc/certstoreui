import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "../css/Finish.css";
import axios from "axios";
import http from "../data/http";
import { useSelector } from "react-redux";

function Finish({
  score,
  myAnswers,
  userStafId,
  originalExams,
  startTime,
  endTime
}) {
  useEffect(() => {
    getExams();
  }, []);

  const myToken = useSelector(state => state.token.value.tok);
  const myId = useSelector(state => state.token.value.id);
  const candidateDetails = {
    CandidateName: "Jonathan Doe",
    CandidateNumber: "9980021300646498",
    AssessmentTestCode: "101114977802_en",
    ExaminationDate: "Dec 14 2024 17:05:01",
    TestReportDate: "Dec 14 2024 19:00:07",
    TotalScore: "84 / 100",
    PercentageScore: "84%",
    AssessmentResultLabel: "Passed"
  };
  const [myDetails, setMyDetails] = useState([]);
  const [scores, setScores] = useState([]);
  const [totalScores, setTotalScores] = useState([]);

  const topicBreakdown = [
    {
      topic: "1. Software Design and Development",
      awardedMarks: 5.0,
      possibleMarks: 6.0,
      successRate: 83.33
    },
    {
      topic: "2. Introduction to Programming",
      awardedMarks: 6.0,
      possibleMarks: 7.0,
      successRate: 85.71
    },
    {
      topic: "3. Object Oriented Programming",
      awardedMarks: 33.0,
      possibleMarks: 41.0,
      successRate: 80.49
    },
    {
      topic: "4. Web Design and Development Fundamentals (Front-End)",
      awardedMarks: 11.0,
      possibleMarks: 13.0,
      successRate: 84.62
    },
    {
      topic: "5. (Relational) Databases",
      awardedMarks: 24.0,
      possibleMarks: 26.0,
      successRate: 92.31
    },
    {
      topic: "6. Web Application Development, MVC and Other Frameworks",
      awardedMarks: 3.0,
      possibleMarks: 4.0,
      successRate: 75.0
    },
    {
      topic: "7. Software Testing & Debugging",
      awardedMarks: 0.0,
      possibleMarks: 1.0,
      successRate: 0.0
    },
    {
      topic: "8. UI/UX - Usability",
      awardedMarks: 1.0,
      possibleMarks: 1.0,
      successRate: 100.0
    },
    {
      topic: "9. Developer Soft Skills and Teamwork",
      awardedMarks: 1.0,
      possibleMarks: 1.0,
      successRate: 100.0
    }
  ];

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
    pdf.save("Software-Development-Skills-Foundation-C#.pdf");
  };

  async function getExams() {
    try {
      let selectedExams = [];
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
          testCode: myStaf.userStafId
        };
      }

      var resExamCategories = await axios.get(http + `api/ExamCategories`, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      var resCategories = resExamCategories.data;
      for (let i = 0; i < selectedExams.length; i++) {
        for (let y = 0; y < resCategories.length; y++) {
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
      setMyDetails(test1);
    } catch (error) {
      console.log(error.message);
    }
  }

  function test() {
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

    console.log(myCategory);

    let x = calculateScoresForAllGroups(myCategory);
    console.log(x);
    setScores(x);
    let y = calculateFullScores(x);
    console.log(y);
    setTotalScores(y);
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

  function calculateFullScores(questionsAll) {
    let score = 0;
    let totalQuestions = 0;
    for (let quest of questionsAll) {
      score += quest.score;
      totalQuestions += quest.totalQuestions;
    }
    return {
      score,
      totalQuestions
    };
  }

  return (
    <div ref={pdfRef} className="finish-container">
      <div className="finish-box">
        <h1 className="finish-title">{myDetails[0].testTitle}</h1>
        <div className="result-info">
          <p className="finish-total-score">
            Total score: {totalScores.score} out of {totalScores.totalQuestions}
          </p>
          <p className="percentage-total-score">
            Percentage Score: {totalScores.score / totalScores.totalQuestions}
          </p>
          <p className="congratulations">
            {totalScores.score / totalScores.totalQuestions > 0.5
              ? "Congratulations!! You passed the exam."
              : "You Fail."}
          </p>
        </div>

        <div className="candidate-details">
          {Object.entries(candidateDetails).map(([label, value]) => (
            <div key={label} className="candidate-item">
              <span className="candidate-label">
                {label.replace(/([A-Z])/g, " $1")}:{" "}
              </span>
              <span className="candidate-value">{value}</span>
            </div>
          ))}
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
            {topicBreakdown.map((topic, index) => (
              <tr key={index}>
                <td className="topic-description">{topic.topic}</td>
                <td className="awarded-marks">{topic.awardedMarks}</td>
                <td className="possible-marks">{topic.possibleMarks}</td>
                <td>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${topic.successRate}%` }}
                      ></div>
                    </div>
                    <span className="percentage">{topic.successRate}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="topic-description">Total score</td>
              <td>84.00</td>
              <td>100.00</td>
              <td colSpan="1"></td>
            </tr>
          </tfoot>
        </table>
        <button className="download-button" onClick={test}>
          Test
        </button>

        <button onClick={downloadPDF} className="download-button">
          Download Results as PDF
        </button>
      </div>
    </div>
  );
}

export default Finish;
