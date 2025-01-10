import React, { useEffect, useState } from "react";
import "../css/MyCertificates.css";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import axios from "axios";
import http from "../data/http";
import formatDate from "../data/formatDate";
import { useNavigate, useParams } from "react-router-dom";
import MyCertificateButton from "./MyCertificateButton";
import MyAcquiredCertificateButton from "./MyAcquiredCertificateButton";
import fixDateToStringGmtPlusTwo from "../data/fixDateToGmtPlusTwo";

export default function MyCertificates() {
  const myToken = useSelector(state => state.token.value.tok);
  const myId = useSelector(state => state.token.value.id);
  const navigate = useNavigate();
  const { userStafId } = useParams();

  const [myStaf, setMyStaf] = useState([]);
  // const [allCertExams, setAllCertExams] = useState([]);
  const [acquiredCertificates, setAcquiredCertificates] = useState([]);
  // const [userDetails, setUserDetails] = useState([]);
  const [haveUserDetails, setHaveUserDetails] = useState(false);

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
    getAllUserDetails();
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

      const today = fixDateToStringGmtPlusTwo();

      for (let y = 0; y < myStaf.length; y++)
        for (let i = 0; i < myCertExams.length; i++) {
          if (myStaf[y].certExamId === myCertExams[i].certExamId) {
            selectedExams.push({
              ...myStaf[y],
              ...myCertExams[i],
              dateOfSendCertExam:
                formatDate(myStaf[y].dateOfSendCertExam) == "January 1, 1"
                  ? "Select an exam date"
                  : formatDate(myStaf[y].dateOfSendCertExam)
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
      const response = await axios.get(`${http}api/Certificates`, {
        headers: {
          Authorization: `Bearer ${myToken}`
        }
      });
      let myCertificates = response.data.filter(cert => cert.userId == myId);
      // let myCertificates = response.data;
      setAcquiredCertificates(myCertificates);
    } catch (error) {
      console.error("Failed to fetch certifications:", error.message);
    }
  }

  async function getAllUserDetails() {
    try {
      const response = await axios.get(`${http}api/UserDetails/`, {
        headers: {
          Authorization: `Bearer ${myToken}`
        }
      });
      // setUserDetails(response.data);
      let userDetails = response.data;
      checkIfHaveUserDetails(userDetails);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch certifications:", error.message);
    }
  }

  function checkIfHaveUserDetails(userDetails) {
    let myDetails = userDetails.filter(a => a.id == myId);
    console.log(myDetails);
    if (myDetails.length > 0) {
      setHaveUserDetails(true);
    }
  }
  function goToDetailsOrSchedule(userStafId, dateOfSendCertExam) {
    const today = fixDateToStringGmtPlusTwo();
    const scheduledDate = new Date(dateOfSendCertExam);
    const currentDate = new Date(today);

    if (
      scheduledDate.toDateString() === currentDate.toDateString() &&
      haveUserDetails
    ) {
      navigate(`/exam/${userStafId}`);
    } else if (haveUserDetails) {
      navigate(`/schedule-exam/${userStafId}`);
    } else {
      navigate(`/user-details/${userStafId}`);
    }
  }

  return (
    <div className="my-certificates-main">
      <div className="my-certificates-container">
        <div className="future-exams">
          <h1 className={myStaf.length === 0 ? "hidden" : ""}>
            My Future Exams
          </h1>
          <ul>
            {myStaf.map(staf => (
              <li key={staf.userStafId}>
                <h2>{staf.testTitle}</h2>
                <p className="myfutureexams-description">
                  {truncateDescription(staf.testDescription, 150)}
                </p>
                <div className="future-certificates-buttons-container">
                  <p className="myfutureexams-date">
                    Date: {staf.dateOfSendCertExam}
                  </p>
                  <MyCertificateButton
                    clas={"future-certificates-button"}
                    bkgrColor={"color16"}
                    onClick={userStafId =>
                      goToDetailsOrSchedule(userStafId, staf.dateOfSendCertExam)
                    }
                    haveUserDetails={haveUserDetails}
                    userStafId={staf.userStafId}
                    dateOfSendCertExam={staf.dateOfSendCertExam}
                    today={fixDateToStringGmtPlusTwo()}
                  />
                </div>
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
                  key={certification.certificateKey}
                  className="certification-box"
                >
                  <div>
                    <h2>{certification.finishTitle}</h2>
                    <p className="myacquiredcertificates-description">
                      {truncateDescription(certification.testDescription, 150)}
                    </p>
                    <div className="acquired-certificates-buttons-container">
                      <p className="myacquiredcertificates-mark">
                        Mark: {certification.successRate}
                      </p>
                      <MyAcquiredCertificateButton
                        certificateKey={certification.certificateKey}
                        bkgrColor={"color10"}
                        clas={"acquired-certificates-button"}
                        dateOfSendCertExam={"Select an exam date"}
                        marked={certification.marked}
                      >
                        Show
                      </MyAcquiredCertificateButton>
                    </div>
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
