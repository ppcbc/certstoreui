import React, { useEffect, useRef, useState } from "react";
import "../css/Diploma.css";
import { jsPDF } from "jspdf";
import logoDiploma from "../images/logo_diploma.svg";
import signature from "../images/signature.png";
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";
import http from "../data/http";
import axios from "axios";
import { useSelector } from "react-redux";

function Diploma() {
  const pdfRef = useRef();
  const { certificateKey } = useParams();
  const myToken = useSelector(state => state.token.value.tok);

  const [totalScores, setTotalScores] = useState(null);

  useEffect(() => {
    getCertificate();
  }, []);

  async function getCertificate() {
    try {
      const response = await axios.get(
        `${http}api/Certificates/${certificateKey}`,
        {
          headers: {
            Authorization: `Bearer ${myToken}`
          }
        }
      );
      console.log(response.data);
      setTotalScores(response.data);
    } catch (error) {
      console.error("Error fetching certificate data:", error.message);
    }
  }

  const downloadPDF = async () => {
    const input = pdfRef.current;
    if (!input) {
      console.error("Diploma content not found.");
      return;
    }

    const button = input.querySelector(".download-button");
    if (button) button.style.display = "none";

    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true
      });
      if (button) button.style.display = "block";

      const imgData = canvas.toDataURL("image/png");

      // PDF dimensions in cm
      const pdfWidth = 25.35; // Landscape width
      const pdfHeight = 17.9; // Landscape height

      const pdf = new jsPDF("l", "cm", [pdfWidth, pdfHeight]);
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${totalScores?.finishTitle || "Diploma"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (!totalScores) {
    return <p>Loading diploma data...</p>;
  }

  return (
    <div className="diploma-container">
      <div className="diploma-box" ref={pdfRef}>
        {/* Diploma Header */}
        <img src={logoDiploma} alt="Diploma Logo" className="logo-diploma" />

        {/* Certificate Text */}
        <p className="diploma-certify-text">This is to certify</p>
        <h1 className="diploma-candidate-name">
          {totalScores.lastName} {totalScores.name}
        </h1>

        <p className="diploma-achieved-text">Has achieved</p>
        <h2 className="diploma-certificate-title">
          {totalScores.finishTitle || "Certificate Title"}
        </h2>

        <p className="diploma-effective-date">
          Effective from: {totalScores.startTime || "N/A"}
        </p>

        {/* Certificate Details */}
        <div className="diploma-details-row">
          <span>Certificate Number: {totalScores.testCode || "N/A"}</span>
          <span>Candidate Number: {totalScores.candidateNumber || "N/A"}</span>
        </div>

        {/* Signature Section */}
        <div className="diploma-signature-section">
          <img src={signature} alt="Signature" className="diploma-signature" />
          <hr className="diploma-signature-line" />
          <p className="diploma-signature-name">Jane Doe</p>
          <p className="diploma-signature-title">Founder and CEO</p>
        </div>

        {/* Footer */}
        <div className="diploma-footer">
          <span className="printed-date">
            Printed on: {new Date().toLocaleDateString()}
          </span>
          <span className="rights">
            All rights reserved. No part of this document or the information in
            it may be copied, distributed, disclosed or used other than as
            authorized.
          </span>
        </div>
      </div>

      {/* Download Button */}
      <div className="diploma-button-wrapper">
        <button onClick={downloadPDF} className="download-button">
          Download Diploma as PDF
        </button>
      </div>
    </div>
  );
}

export default Diploma;
