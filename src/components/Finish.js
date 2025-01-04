import React from "react";
import { jsPDF } from "jspdf";
import "../css/Finish.css";

function Finish({ score, totalQuestions, paymentDate }) {
    const passMark = 0.5;
    const isPassed = parseInt(score.split(" / ")[0]) / totalQuestions >= passMark;
    const examDate = new Date().toLocaleDateString();
    const issueDate = paymentDate ? paymentDate.toLocaleDateString() : examDate;
    const randomUserId = Math.floor(Math.random() * 1000000);
    const candidateName = `Candidate ${Math.floor(Math.random() * 1000)}`;
    const examLevel = ["Beginner", "Intermediate", "Advanced"][Math.floor(Math.random() * 3)];
    const maximumResult = 100;
    const candidateScore = parseInt(score.split(" / ")[0]);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Statement of Result", 20, 20);
        doc.setFontSize(12);
        doc.text(`Candidate Id: ${randomUserId}`, 20, 40);
        doc.text(`Candidate Name: ${candidateName}`, 20, 50);
        doc.text(`Exam Date: ${examDate}`, 20, 60);
        doc.text(`Issue Date: ${issueDate}`, 20, 70);
        doc.text(`Exam Level: ${examLevel}`, 20, 80);
        doc.text(`Overall Result: ${isPassed ? "Pass" : "Fail"}`, 20, 90);
        doc.text(`Maximum Result: ${maximumResult}`, 20, 100);
        doc.text(`Candidate Score: ${candidateScore}`, 20, 110);
        doc.setLineWidth(0.5); doc.rect(15, 30, 180, 90);
        doc.setFontSize(10);
        doc.text("CertStore 2024.  All rights reserved.", 105, 130, null, null, "center");
        doc.save("statement-of-result.pdf");
    };

    return (
        <div className="finish-container">
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

