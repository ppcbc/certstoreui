import React, { useEffect, useState } from "react";
import "../css/MyCertificates.css";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import axios from "axios";
import http from "../data/http";
import formatDate from "../data/formatDate";
import { useNavigate } from "react-router-dom";

export default function MyCertificates() {
  const myToken = useSelector(state => state.token.value.tok);
  const myId = useSelector(state => state.token.value.id);
  const navigate = useNavigate();

  const [myStaf, setMyStaf] = useState([]);
  const [allCertExams, setAllCertExams] = useState([]);
  const [acquiredCertificates, setAcquiredCertificates] = useState([]);

  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  // Fetch future exams
  useEffect(() => {
    getAcquiredCertificates();
    getStaf();
  }, []);

  // Fetch acquired certificates

  async function getStaf() {
    try {
      const res = await axios.get(`${http}api/CertExams`, {
        headers: {
          Authorization: `Bearer ${myToken}`
        }
      });
      let selectedExams = [];
      let myCertExams = res.data;
      const response = await axios.get(`${http}api/UserStafs`, {
        headers: {
          Authorization: `Bearer ${myToken}`
        }
      });
      let myStaf = response.data.filter(
        a => a.userId == myId && a.hasBought === true
      );
      console.log(myStaf);
      for (let y = 0; y < myStaf.length; y++)
        for (let i = 0; i < myCertExams.length; i++) {
          if (myStaf[y].certExamId === myCertExams[i].certExamId) {
            selectedExams.push({
              ...myStaf[y],
              ...myCertExams[i],
              dateOfSendCertExam:
                myStaf[y].dateOfSelectCertExam != "0001-01-01T00:00:00"
                  ? "Pick your date"
                  : myStaf[y].dateOfSendCertExam
            });
          }
        }
      console.log(selectedExams);
      setMyStaf(selectedExams);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getAcquiredCertificates() {
    try {
      const response = await axios.get(`${http}api/CertExams`, {
        headers: {
          Authorization: `Bearer ${myToken}`
        }
      });
      setAcquiredCertificates(response.data);
    } catch (error) {
      console.error("Failed to fetch certifications:", error.message);
    }
  }

  return (
    <div className="my-certificates-main">
      <div className="my-certificates-container">
        {/* Future Exams Section */}
        <div className="future-exams">
          <h1>My Future Exams</h1>
          <ul>
            {myStaf.map(staf => (
              <li key={staf.userStafId}>
                <h2>{staf.testTitle}</h2>
                <p className="myfutureexams-description">
                  {truncateDescription(staf.testDescription, 150)}
                </p>
                <p className="myfutureexams-date">
                  Date: {staf.dateOfSendCertExam}
                </p>
                <button>ff</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Acquired Certificates Section */}
        <div className="acquired-certificates">
          <h1>My Acquired Certificates</h1>
          <ul>
            {acquiredCertificates.length === 0 ? (
              <p>No certificates acquired yet.</p>
            ) : (
              acquiredCertificates.map(certification => (
                <li
                  key={certification.certExamId}
                  className="certification-box"
                >
                  <div>
                    <h2>{certification.testTitle}</h2>
                    <p className="myacquiredcertificates-description">
                      {truncateDescription(certification.testDescription, 150)}
                    </p>
                    <p className="myacquiredcertificates-mark">Mark: 65</p>
                    <button>ff</button>
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
