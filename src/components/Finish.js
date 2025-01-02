import React from "react";
import { jsPDF } from "jspdf";
import "../css/Finish.css";

function Finish({ score, totalQuestions }) {
    const passMark = 0.5; 
    const isPassed = parseInt(score.split(" / ")[0]) / totalQuestions >= passMark;
    const examDate = new Date().toLocaleDateString(); 

   
    const randomUserId = Math.floor(Math.random() * 1000000);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Exam Completed", 20, 20);
        doc.text(`User ID: ${randomUserId}`, 20, 30);
        doc.text(`Exam Date: ${examDate}`, 20, 40);
        doc.text(`Score: ${score}`, 20, 50);
        doc.text(`Status: ${isPassed ? "Pass" : "Fail"}`, 20, 60);
        doc.save("exam-results.pdf");
    };

    return (
        <div className="finish-container">
            <h1>Exam Completed</h1>
            <h2>User ID: {randomUserId}</h2>
            <h2>Exam Date: {examDate}</h2>
            <h2>Score: {score}</h2>
            <h2>
                Status: <span className={isPassed ? "status-pass" : "status-fail"}>
                    {isPassed ? "Pass" : "Fail"}
                </span>
            </h2>
            <button onClick={downloadPDF} className="download-button">
                Download Results as PDF
            </button>
        </div>
    );
}

export default Finish;

