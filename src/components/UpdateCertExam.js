import React, { useEffect, useState } from "react";
import axios from "axios";
import http from "../data/http";
import "../css/UpdateCertExam.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Footer from "./Footer";

function UpdateCertExam() {
  let navigate = useNavigate();
  const [examId, setExamId] = useState("");
  const [certExam, setCertExam] = useState({
    certExamId: "",
    testTitle: "",
    testDescription: ""
  });
  const [allExams, setAllExams] = useState([]);
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState(false);
  const [validationMessages, setValidationMessages] = useState({});
  const [errors, setErrors] = useState({});

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1400);
  }

  const myToken = useSelector(state => state.token.value.tok);

  useEffect(() => {
    getExams();
    if (examId) {
      getCertExamDetails(examId);
    }
  }, [examId]);

  async function getExams() {
    try {
      const response = await axios.get(http + "api/CertExams", {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      setAllExams(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getCertExamDetails(certExamId) {
    try {
      const response = await axios.get(http + `api/CertExams/${certExamId}`, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      setCertExam({
        certExamId: response.data.certExamId,
        testTitle: response.data.testTitle,
        testDescription: response.data.testDescription
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  function onChange(e) {
    let { name, value } = e.target;
    setCertExam(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const validate = () => {
    let tempErrors = {};
    if (!certExam.testTitle)
      tempErrors.testTitle = "Certification title is required";
    if (!certExam.testDescription)
      tempErrors.testDescription = "Certification description is required";

    setErrors(tempErrors);
    setValidationMessages(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.put(
        http + `api/CertExams/${certExam.certExamId}`,
        certExam,
        {
          headers: {
            Authorization: "Bearer " + myToken
          }
        }
      );

      setMessage("Exam successfully updated");
      handleMessage();
      // setCheck(true);
    } catch (error) {
      setMessage("Failed to update exam. Try again.");
      // setCheck(true);
      console.log(error.message);
      handleMessage();
    }
  }

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1400);
  }

  return (
    <div className="update-cert-exam-main">
      <form onSubmit={onSubmit} action="submit">
        <div className="update-cert-exam">
          <div className="update-cert-exam-box">
            <h1>Update Exam</h1>
            <div className="update-cert-exam-my-inner-box">
              <label className="update-cert-exam-my-label">
                Select Exam:
                <select
                  name="examId"
                  value={examId}
                  onChange={e => setExamId(e.target.value)}
                >
                  <option value="">Select Exam</option>
                  {allExams.map(exam => (
                    <option key={exam.certExamId} value={exam.certExamId}>
                      {exam.testTitle}
                    </option>
                  ))}
                </select>
              </label>
              {validationMessages.examId && (
                <p className="update-cert-exam-error-message">
                  {validationMessages.examId}
                </p>
              )}
            </div>
            <div className="update-cert-exam-my-inner-box">
              <label className="update-cert-exam-my-label">
                Exam Title:
                <input
                  type="text"
                  name="testTitle"
                  placeholder="Exam Title"
                  value={certExam.testTitle || ""}
                  onChange={onChange}
                />
              </label>
            </div>
            {validationMessages.testTitle && (
              <p className="update-cert-exam-error-message">
                {validationMessages.testTitle}
              </p>
            )}
            <div className="update-cert-exam-my-inner-box">
              <label className="update-cert-exam-my-label">
                Exam Description:
                <textarea
                  name="testDescription"
                  placeholder="Exam Description"
                  value={certExam.testDescription || ""}
                  onChange={onChange}
                  rows="3"
                />
              </label>
            </div>
            {validationMessages.testDescription && (
              <p className="update-cert-exam-error-message">
                {validationMessages.testDescription}
              </p>
            )}
            <div className="update-cert-exam-my-inner-box">
              <button type="submit" className="fadeIn fourth">
                Update
              </button>
            </div>
            <div className="update-cert-exam-my-inner-box">
              <button
                type="cancel"
                className="fadeIn fourth"
                onClick={() => navigate("/adminpanel")}
              >
                Cancel
              </button>
            </div>
            <div className="update-cert-exam-message">
              {check && <p>{message}</p>}
            </div>
          </div>
        </div>
      </form>
      <Footer color={"var(--color4)"} />
    </div>
  );
}

export default UpdateCertExam;
