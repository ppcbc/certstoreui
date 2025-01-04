import React, { useState } from "react";
import axios from "axios";
import "../css/DeleteCertExam.css";
import { useSelector } from "react-redux";
import http from "../data/http";

const DeleteCertExam = () => {
  const myToken = useSelector(state => state.token.value.tok);
  const [certExamId, setCertExamId] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

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

  return (
    <div className="delete-cert-exam-main">
      <form onSubmit={handleSubmit}>
        <div className="delete-cert-exam">
          <div className="delete-box">
            <h1>Delete Exam</h1>
            <div className="delete-my-inner-box">
              <label className="delete-my-label">
                Enter Exam ID:
                <input
                  type="text"
                  name="certExamId"
                  value={certExamId}
                  onChange={handleIdChange}
                  className="delete-input"
                />
              </label>
            </div>
            {errors.certExamId && (
              <div className="delete-exam-error-message">
                {errors.certExamId}
              </div>
            )}
            <div className="delete-my-inner-box">
              <button type="submit" className="fadeIn fourth" value="submit">
                Delete Exam
              </button>
            </div>
            {message && <div className="delete-message">{message}</div>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeleteCertExam;
