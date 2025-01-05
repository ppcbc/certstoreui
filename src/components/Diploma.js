import React from "react";
import "../css/Diploma.css";
import logoDiploma from "../images/logo_diploma.svg";
import signature from "../images/signature.png";

function Diploma() {
    return (
        <div className="diploma-container">
            <div className="diploma-box">
                <img src={logoDiploma} alt="Logo-diploma" className="logo-diploma"/>

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
                    <img src={signature} alt="Signature" className="diploma-signature"/>
                    <hr className="diploma-signature-line"/>
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
        </div>
    );
}

export default Diploma;
