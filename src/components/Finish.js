import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "../css/Finish.css";

function Finish({ score, totalQuestions, paymentDate }) {
  const passMark = 0.5;
  const isPassed = parseInt(score.split(" / ")[0]) / totalQuestions >= passMark;
  const examDate = new Date().toLocaleDateString();
  const issueDate = paymentDate ? paymentDate.toLocaleDateString() : examDate;
  const randomUserId = Math.floor(Math.random() * 1000000);
  const candidateName = `Candidate ${Math.floor(Math.random() * 1000)}`;
  const examLevel = ["Beginner", "Intermediate", "Advanced"][
    Math.floor(Math.random() * 3)
  ];
  const maximumResult = 100;
  const candidateScore = parseInt(score.split(" / ")[0]);

  // Reference for the PDF content
  const pdfRef = useRef();

  const downloadPDF = async () => {
    const input = pdfRef.current;

    // Capture the rendered content using html2canvas
    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    // Calculate dimensions to fit the content
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("statement-of-result.pdf");
  };

  return (
    <div ref={pdfRef} className="finish-container">
      <h1>Statement of Result</h1>
      <div className="result-item">
        <span className="result-label">Candidate Number:</span>
        <span className="result-value">{randomUserId}</span>
      </div>
      <div className="result-item">
        <span className="result-label">Candidate ID:</span>
        <span className="result-value">{candidateName}</span>
      </div>
      <div className="result-item">
        <span className="result-label">Exam Date:</span>
        <span className="result-value">{examDate}</span>
      </div>
      <div className="result-item">
        <span className="result-label">Issue Date:</span>
        <span className="result-value">{issueDate}</span>
      </div>
      <div className="result-item">
        <span className="result-label">Exam Level:</span>
        <span className="result-value">{examLevel}</span>
      </div>
      <div className="result-item">
        <span className="result-label">Overall Result:</span>
        <span className="result-value">{isPassed ? "Pass" : "Fail"}</span>
      </div>
      <div className="result-item">
        <span className="result-label">Maximum Result:</span>
        <span className="result-value">{maximumResult}</span>
      </div>
      <div className="result-item">
        <span className="result-label">Candidate Score:</span>
        <span className="result-value">{candidateScore}</span>
      </div>
      <button onClick={downloadPDF} className="download-button">
        Download Results as PDF
      </button>
    </div>
  );
}

export default Finish;
