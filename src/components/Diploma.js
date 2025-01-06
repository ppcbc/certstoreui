import React, { useRef } from "react";
import "../css/Diploma.css";
import { jsPDF } from "jspdf";
import logoDiploma from "../images/logo_diploma.svg";
import signature from "../images/signature.png";
import html2canvas from "html2canvas";

function Diploma() {
    const pdfRef = useRef();

    const downloadPDF = async () => {
        const input = pdfRef.current;
        if (!input) {
            console.error("Element with class 'diploma-box' not found.");
            return;
        }
        const button = input.querySelector(".download-button");
        if (button) {
            button.style.display = "none";
        }
        try {
            const canvas = await html2canvas(input, {
                scale: 2,
                useCORS: true
            });
            if (button) {
                button.style.display = "block";
            }
            const imgData = canvas.toDataURL("image/png");

            // Set the dimensions to match the actual size of the diploma
            const pdfWidth = 25.35; // cm
            const pdfHeight = 17.9;  // cm

            const pdf = new jsPDF("l", "cm", [pdfWidth, pdfHeight]); // 'l' for landscape
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("Software-Development-Skills-Foundation-C#.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    return (
        <div className="diploma-container">
            <div className="diploma-box" ref={pdfRef}>
                <img src={logoDiploma} alt="Logo-diploma" className="logo-diploma" />

                <p className="diploma-certify-text">This is to certify</p>
                <h1 className="diploma-candidate-name">Jonathan Doe</h1>

                <p className="diploma-achieved-text">Has achieved</p>
                <h2 className="diploma-certificate-title">
                    Software Development Skills C#, Foundation Certificate
                </h2>

                <p className="diploma-effective-date">Effective from: 14 Dec 2024</p>

                <div className="diploma-details-row">
                    <span>Certificate Number: 00000000000EM</span>
                    <span>Candidate Number: 9980021300646498</span>
                </div>

                <div className="diploma-signature-section">
                    <img src={signature} alt="Signature" className="diploma-signature" />
                    <hr className="diploma-signature-line" />
                    <p className="diploma-signature-name">Jane Doe</p>
                    <p className="diploma-signature-title">Founder and CEO</p>
                </div>

                <div className="diploma-footer">
                    <span className="printed-date">Printed on: 15 December 2024</span>
                    <span className="rights">
                        All rights reserved. No part of this document or the information in it may
                        be copied, distributed, disclosed or used other than as authorized
                    </span>
                </div>
            </div>

            <div className="diploma-button-wrapper">
                <button onClick={downloadPDF} className="download-button">
                    Download Results as PDF
                </button>
            </div>
        </div>
    );
}

export default Diploma;
