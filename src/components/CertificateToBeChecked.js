import React, { useEffect, useState } from "react";
import "../css/Finish.css";
import axios from "axios";
import http from "../data/http";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function CertificateToBeChecked() {
  const [totalScores, setTotalScores] = useState(null);
  const myToken = useSelector(state => state.token.value.tok);
  const { certificateKey } = useParams();
  const navigate = useNavigate();

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
  async function approve(marked, reject) {
    try {
      let approve = {
        ...totalScores,
        marked: marked,
        reject: reject
      };
      const response = await axios.put(
        `${http}api/Certificates/${certificateKey}`,
        approve,
        {
          headers: {
            Authorization: `Bearer ${myToken}`
          }
        }
      );
      console.log(response.data);
      navigate("/marker-panel");
    } catch (error) {
      console.error("Error fetching certificate data:", error.message);
    }
  }

  if (!totalScores) {
    return <p>Loading certificate data...</p>;
  }

  return (
    <div className="finish-container">
      <div className="finish-box">
        <h1 className="finish-title">
          {totalScores.finishTitle || "Certificate"}
        </h1>
        <div className="result-info">
          <p className="finish-total-score">
            Total score: {totalScores.score || 0} out of{" "}
            {totalScores.totalQuestions || 0}
          </p>
          <p className="percentage-total-score">
            Percentage Score: {totalScores.successRate || "0%"}
          </p>
          <p className="congratulations">
            {totalScores.score / totalScores.totalQuestions > 0.5
              ? "Congratulations!! You passed the exam."
              : "You Failed."}
          </p>
        </div>

        <div className="candidate-details">
          <div className="candidate-item">
            <span className="candidate-label">Candidate Name: </span>
            <span className="candidate-value">
              {totalScores.lastName || "N/A"} {totalScores.name || "N/A"}
            </span>
          </div>
          <div className="candidate-item">
            <span className="candidate-label">Candidate Number: </span>
            <span className="candidate-value">
              {totalScores.candidateNumber || "N/A"}
            </span>
          </div>
          <div className="candidate-item">
            <span className="candidate-label">Assessment Test Code: </span>
            <span className="candidate-value">
              {totalScores.testCode || "N/A"}
            </span>
          </div>
          <div className="candidate-item">
            <span className="candidate-label">Examination Date: </span>
            <span className="candidate-value">
              {totalScores.startTime || "N/A"}
            </span>
          </div>
          <div className="candidate-item">
            <span className="candidate-label">Test Report Date: </span>
            <span className="candidate-value">
              {totalScores.reportDate || "N/A"}
            </span>
          </div>
          <div className="candidate-item">
            <span className="candidate-label">Total Score: </span>
            <span className="candidate-value">
              {totalScores.totalScore || "N/A"}
            </span>
          </div>
          <div className="candidate-item">
            <span className="candidate-label">Percentage Score: </span>
            <span className="candidate-value">
              {totalScores.successRate || "0%"}
            </span>
          </div>
          <div className="candidate-item">
            <span className="candidate-label">Assessment Result Label: </span>
            <span className="candidate-value">
              {totalScores.score / totalScores.totalQuestions > 0.5
                ? "Passed"
                : "Not Pass"}
            </span>
          </div>
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
            <tr>
              <td className="topic-description">
                {totalScores.categoryName || "N/A"}
              </td>
              <td className="awarded-marks">{totalScores.score || 0}</td>
              <td className="possible-marks">
                {totalScores.totalQuestions || 0}
              </td>
              <td>
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${totalScores.successRate || 0}%`
                      }}
                    ></div>
                  </div>
                  <span className="percentage">
                    {(
                      (totalScores.score / totalScores.totalQuestions) * 100 ||
                      0
                    ).toFixed(2)}
                    %
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <button
          onClick={() => approve(true, false)}
          className="download-button"
        >
          Approve
        </button>
        <button
          onClick={() => approve(false, true)}
          className="download-button"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default CertificateToBeChecked;
