import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/DeleteCertExam.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import http from "../data/http";
import Footer from "./Footer";

const DeleteCertExam = () => {
  const myToken = useSelector(state => state.token.value.tok);
  const [certExamId, setCertExamId] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [certExams, setCertExams] = useState([]);

  useEffect(() => {
    const fetchCertExams = async () => {
      try {
        const res = await axios.get(http + "api/CertExams", {
          headers: {
            Authorization: "Bearer " + myToken
          }
        });
        setCertExams(res.data);
      } catch (error) {
        console.error("Error fetching certifications:", error.message);
      }
    };
    fetchCertExams();
  }, [myToken]);

  const handleIdChange = e => {
    setCertExamId(e.target.value);
  };

  const validate = () => {
    let tempErrors = {};
    if (!certExamId) tempErrors.certExamId = "Exam ID is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.delete(http + `api/CertExams/${certExamId}`, {
          headers: {
            Authorization: "Bearer " + myToken
          }
        });
        setMessage(`Exam with ID ${certExamId} deleted successfully!`);
        setCertExamId("");
      } catch (error) {
        console.error("There was an error deleting the exam!", error);
        setMessage("There was an error deleting the exam.");
      }
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="delete-cert-exam-main">
      <form onSubmit={handleSubmit}>
        <div className="delete-cert-exam">
          <div className="delete-cert-exam-box">
            <h1>Delete Exam</h1>
            {/* <div className="delete-cert-exam-my-inner-box">
              <label className="delete-cert-exam-my-label">
                Enter Exam ID:
                <input
                  type="text"
                  name="certExamId"
                  value={certExamId}
                  onChange={handleIdChange}
                  className="delete-input"
                />
              </label>
            </div> */}
            <div className="delete-cert-exam-my-inner-box">
              <label className="delete-cert-exam-my-label">
                Select Exam:
                <select
                  name="certExamId"
                  value={certExamId}
                  onChange={handleIdChange}
                  className="delete-select"
                >
                  <option value="">Select an Exam</option>
                  {certExams.map(Exam => (
                    <option key={Exam.certExamId} value={Exam.certExamId}>
                      {Exam.testTitle}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {errors.certExamId && (
              <p className="delete-cert-exam-error-message">
                {errors.certExamId}
              </p>
            )}
            <div className="delete-cert-exam-my-inner-box">
              <button type="submit" className="fadeIn fourth" value="submit">
                Delete Exam
              </button>
            </div>
            <div className="delete-cert-exam-my-inner-box">
              <button
                type="cancel"
                className="fadeIn fourth"
                onClick={() => navigate("/adminpanel")}
              >
                Cancel
              </button>
            </div>
            <div className="delete-message">{message && <p>{message}</p>}</div>
          </div>
        </div>
      </form>
      <Footer color={"var(--color4)"} />
    </div>
  );
};

export default DeleteCertExam;
