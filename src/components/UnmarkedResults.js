import React, { useEffect, useState } from "react";
import "../css/MyCertificates.css";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import axios from "axios";
import http from "../data/http";
import { useNavigate, useParams } from "react-router-dom";
import fixDateToStringGmtPlusTwo from "../data/fixDateToGmtPlusTwo";
import CertificateResultsButton from "./CertificateResultsButton";

export default function MyCertificates() {
  const myToken = useSelector(state => state.token.value.tok);
  const myId = useSelector(state => state.token.value.id);
  const navigate = useNavigate();
  const { userStafId } = useParams();

  const [myStaf, setMyStaf] = useState([]);
  // const [allCertExams, setAllCertExams] = useState([]);
  const [acquiredCertificates, setAcquiredCertificates] = useState([]);
  // const [userDetails, setUserDetails] = useState([]);
  //   const [haveUserDetails, setHaveUserDetails] = useState(false);

  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  // Fetch future exams
  useEffect(() => {
    getAcquiredCertificates();
  }, []);

  async function getAcquiredCertificates() {
    try {
      const response = await axios.get(`${http}api/Certificates`, {
        headers: {
          Authorization: `Bearer ${myToken}`
        }
      });
      let myCertificates = response.data.filter(
        cert => cert.marked == false && cert.reject == false
      );
      setAcquiredCertificates(myCertificates);
    } catch (error) {
      console.error("Failed to fetch certifications:", error.message);
    }
  }

  return (
    <div className="my-certificates-main">
      <div className="my-certificates-container">
        <div className="future-exams">
          <h1>Exams results to be checked</h1>
          <ul>
            {acquiredCertificates.length === 0 ? (
              <p>No certificates to check for the moment.</p>
            ) : (
              acquiredCertificates.map(cert => (
                <li key={cert.certificateKey}>
                  <h2>{cert.finishTitle}</h2>
                  <p className="myfutureexams-description">
                    {truncateDescription(cert.testDescription, 150)}
                  </p>
                  <div className="future-certificates-buttons-container">
                    <p className="myfutureexams-date">
                      Date: {cert.reportDate}
                    </p>
                    <CertificateResultsButton
                      clas={"future-certificates-button"}
                      bkgrColor={"color16"}
                      onClick={""}
                      // haveUserDetails={haveUserDetails}
                      certificateKey={cert.certificateKey}
                      dateOfSendCertExam={cert.startTime}
                      today={fixDateToStringGmtPlusTwo()}
                    />
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      <Footer className="mycertificates-footer" color={"var(--color4)"} />
    </div>
  );
}
