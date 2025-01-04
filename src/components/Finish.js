import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "../css/Finish.css";

function Finish() {
  const candidateDetails = {
    CandidateName: "Efthimios Mantzinos",
    CandidateNumber: "9980021300646498",
    AssessmentTestCode: "101114977802_en",
    ExaminationDate: "Dec 14 2024 17:05:01",
    TestReportDate: "Dec 14 2024 19:00:07",
    TotalScore: "84 / 100",
    PercentageScore: "84%",
    AssessmentResultLabel: "Passed"
  };

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
    const input = pdfRef.current;
    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Software-Development-Skills-Foundation-C#.pdf");
  };

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
                <td>{topic.awardedMarks}</td>
                <td>{topic.possibleMarks}</td>
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

        <button onClick={downloadPDF} className="download-button">
          Download Results as PDF
        </button>
      </div>
    </div>
  );
}

export default Finish;
