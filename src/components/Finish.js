import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "../css/Finish.css";
import axios from "axios";
import http from "../data/http";
import { useSelector } from "react-redux";
import formatDateWithHours from "../data/formatDateWithHours";

function Finish({
  score,
  myAnswers,
  userStafId,
  originalExams,
  startTime,
  endTime
}) {
  const [myDetails, setMyDetails] = useState([]);
  const [scores, setScores] = useState([]);
  const [totalScores, setTotalScores] = useState([]);

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
      console.log(test1);
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
    let startDate = new Date(myDetails[0].testTime);
    const formattedDate = `${startDate.toLocaleDateString(
      "en-GB"
    )} ${startDate.getHours()}:${startDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    for (let quest of questionsAll) {
      score += quest.score;
      totalQuestions += quest.totalQuestions;
    }
    return {
      score,
      totalQuestions,
      successRate: `${(score / totalQuestions) * 100}%`,
      description: questionsAll[0].categoryName,
      name: myDetails[0].name,
      lastName: myDetails[0].lastName,
      totalScore: `${score}/${totalQuestions}`,
      candidateNumber: myDetails[0].candidateNumber,
      testCode: myDetails[0].testCode,
      startTime: formattedDate
    };
  }
  //
  //   return (
  //     <div ref={pdfRef} className="finish-container">
  //       <div className="finish-box">
  //         <h1 className="finish-title">{myDetails[0].testTitle}</h1>
  //         <div className="result-info">
  //           <p className="finish-total-score">
  //             Total score: {totalScores.score} out of {totalScores.totalQuestions}
  //           </p>
  //           <p className="percentage-total-score">
  //             Percentage Score: {totalScores.score / totalScores.totalQuestions}
  //           </p>
  //           <p className="congratulations">
  //             {totalScores.score / totalScores.totalQuestions > 0.5
  //               ? "Congratulations!! You passed the exam."
  //               : "You Failed."}
  //           </p>
  //         </div>
  //
  //         <div className="candidate-details">
  //           {Object.entries(candidateDetails).map(([label, value]) => (
  //             <div key={label} className="candidate-item">
  //               <span className="candidate-label">
  //                 {label.replace(/([A-Z])/g, " $1")}:{" "}
  //               </span>
  //               <span className="candidate-value">{value}</span>
  //             </div>
  //           ))}
  //         </div>
  //
  //         <table className="topic-table">
  //           <thead>
  //             <tr>
  //               <th>Topic Description</th>
  //               <th>
  //                 Number of <br />
  //                 Awarded Marks
  //               </th>
  //               <th>
  //                 Number of <br />
  //                 Possible Marks
  //               </th>
  //               <th>Success Rate</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {totalScores.map((topic, index) => (
  //               <tr key={index}>
  //                 <td className="topic-description">{topic.description}</td>
  //                 <td className="awarded-marks">{topic.score}</td>
  //                 <td className="possible-marks">{topic.totalQuestions}</td>
  //                 <td>
  //                   <div className="progress-container">
  //                     <div className="progress-bar">
  //                       <div
  //                         className="progress-bar-fill"
  //                         style={{ width: `${topic.successRate}%` }}
  //                       ></div>
  //                     </div>
  //                     <span className="percentage">{topic.successRate}%</span>
  //                   </div>
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //           <tfoot>
  //             <tr>
  //               <td className="topic-description">Total score</td>
  //               <td>84.00</td>
  //               <td>100.00</td>
  //               <td colSpan="1"></td>
  //             </tr>
  //           </tfoot>
  //         </table>
  //         <button className="download-button" onClick={test}>
  //           Test
  //         </button>
  //
  //         <button onClick={downloadPDF} className="download-button">
  //           Download Results as PDF
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }
  //
  // export default Finish;

  // import React, { useRef } from "react";
  // import { jsPDF } from "jspdf";
  // import html2canvas from "html2canvas";
  // import "../css/Finish.css";

  // function Finish() {
  //     const pdfRef = useRef();

  //     const downloadPDF = async () => {
  //         const input = pdfRef.current.querySelector(".finish-box");
  //         const button = input.querySelector(".download-button");
  //         button.style.display = "none";
  //         const canvas = await html2canvas(input, {
  //             scale: 2,
  //             useCORS: true
  //         });
  //         button.style.display = "block";
  //         const imgData = canvas.toDataURL("image/png");
  //         const pdf = new jsPDF("p", "mm", "a4");

  //         const pdfWidth = pdf.internal.pageSize.getWidth();
  //         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  //         pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //         pdf.save("Software-Development-Skills-Foundation-C#.pdf");
  //     };

  return (
    <div ref={pdfRef} className="finish-container">
      <div className="finish-box">
        <h1 className="finish-title">
          Software Development Skills Foundation (C#)
        </h1>
        <div className="result-info">
          <p className="finish-total-score">Total score: 84.00 out of 100.00</p>
          <p className="percentage-total-score">Percentage Score: 84%</p>
          <p className="congratulations">
            Congratulations!! You passed the exam.
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
            <span className="candidate-value">9980021300646498</span>
          </div>
          <div className="candidate-item">
            <span className="candidate-label">Assessment Test Code: </span>
            <span className="candidate-value">101114977802_en</span>
          </div>
          <div className="candidate-item">
            <span className="candidate-label">Examination Date: </span>
            {/* <span className="candidate-value">Dec 14 2024 17:05:01</span> */}
            <span className="candidate-value">{totalScores.startTime}</span>
          </div>
          <div className="candidate-item">
            <span className="candidate-label">Test Report Date: </span>
            <span className="candidate-value">Dec 14 2024 19:00:07</span>
          </div>
          <div className="candidate-item">
            <span className="candidate-label">Total Score: </span>
            <span className="candidate-value">84 / 100</span>
          </div>
          <div className="candidate-item">
            <span className="candidate-label">Percentage Score: </span>
            <span className="candidate-value">84%</span>
          </div>
          <div className="candidate-item">
            <span className="candidate-label">Assessment Result Label: </span>
            <span className="candidate-value">Passed</span>
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
            <tr>
              <td className="topic-description">
                1. Software Design and Development
              </td>
              <td className="awarded-marks">5.0</td>
              <td className="possible-marks">6.0</td>
              <td>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: "83.33%" }}
                    ></div>
                  </div>
                  <span className="percentage">83.33%</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="topic-description">
                2. Introduction to Programming
              </td>
              <td className="awarded-marks">6.0</td>
              <td className="possible-marks">7.0</td>
              <td>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: "85.71%" }}
                    ></div>
                  </div>
                  <span className="percentage">85.71%</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="topic-description">
                3. Object Oriented Programming
              </td>
              <td className="awarded-marks">33.0</td>
              <td className="possible-marks">41.0</td>
              <td>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: "80.49%" }}
                    ></div>
                  </div>
                  <span className="percentage">80.49%</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="topic-description">
                4. Web Design and Development Fundamentals (Front-End)
              </td>
              <td className="awarded-marks">11.0</td>
              <td className="possible-marks">13.0</td>
              <td>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: "84.62%" }}
                    ></div>
                  </div>
                  <span className="percentage">84.62%</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="topic-description">5. (Relational) Databases</td>
              <td className="awarded-marks">24.0</td>
              <td className="possible-marks">26.0</td>
              <td>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: "92.31%" }}
                    ></div>
                  </div>
                  <span className="percentage">92.31%</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="topic-description">
                6. Web Application Development, MVC and Other Frameworks
              </td>
              <td className="awarded-marks">3.0</td>
              <td className="possible-marks">4.0</td>
              <td>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: "75.0%" }}
                    ></div>
                  </div>
                  <span className="percentage">75.0%</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="topic-description">
                7. Software Testing & Debugging
              </td>
              <td className="awarded-marks">0.0</td>
              <td className="possible-marks">1.0</td>
              <td>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: "0.0%" }}
                    ></div>
                  </div>
                  <span className="percentage">0.0%</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="topic-description">8. UI/UX - Usability</td>
              <td className="awarded-marks">1.0</td>
              <td className="possible-marks">1.0</td>
              <td>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: "100.0%" }}
                    ></div>
                  </div>
                  <span className="percentage">100.0%</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="topic-description">
                9. Developer Soft Skills and Teamwork
              </td>
              <td className="awarded-marks">1.0</td>
              <td className="possible-marks">1.0</td>
              <td>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: "100.0%" }}
                    ></div>
                  </div>
                  <span className="percentage">100.0%</span>
                </div>
              </td>
            </tr>
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
        <button onClick={test} className="download-button">
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
