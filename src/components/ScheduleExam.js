import React, { useState, useEffect } from "react";
import "../css/ScheduleExam.css";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import http from "../data/http";

export default function ScheduleExam() {
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState({ type: "", text: "" });
  const [dateError, setDateError] = useState("");
  const { userStafId } = useParams();
  const myToken = useSelector(state => state.token.value.tok);
  const myId = useSelector(state => state.token.value.id);
  const [myStaf, setMyStaf] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(userStafId);
    getStaf();
  }, []);

  async function getStaf() {
    try {
      const response = await axios.get(`${http}api/UserStafs/${userStafId}`, {
        headers: { Authorization: `Bearer ${myToken}` }
      });
      console.log(response.data);
      setMyStaf(response.data);
    } catch (error) {
      console.error("Failed to fetch staff:", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (message.type) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSchedule = async () => {
    navigate("/my-certificates");
    if (!selectedDate) {
      setDateError("Please select a date.");
      setMessage({ type: "", text: "" });
      return;
    }

    setDateError("");

    console.log(myStaf);
    let finalStaf = {
      ...myStaf,
      redeem: true,
      dateOfSendCertExam: selectedDate
    };
    console.log(finalStaf);

    try {
      const response = await axios.put(
        http + `api/UserStafs/${userStafId}`,
        finalStaf,
        {
          headers: {
            Authorization: "Bearer " + myToken
          }
        }
      );
      if (response.status === 201 || response.status === 200) {
        setMessage({
          type: "success",
          text: `Exam scheduled for ${selectedDate}`
        });
      }
    } catch (error) {
      console.error(error.message);
      setMessage({
        type: "error",
        text: "Failed to schedule the exam. Please try again."
      });
    }
  };

  return (
    <div className="schedule-exam-main">
      <div className="schedule-exam">
        <div className="schedule-box">
          <h1>Schedule Your Exam</h1>

          <label className="schedule-label">
            Select Date:
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            />
          </label>
          {dateError && <p className="schedule-error-message">{dateError}</p>}

          {message.type === "success" && (
            <p className="schedule-success-message">{message.text}</p>
          )}

          <button onClick={handleSchedule}>Schedule Exam</button>
          <div className="shedule-buttons">
            <button
              type="cancel"
              className="fadeIn fourth"
              onClick={() => navigate("/my-certificates")}
            >
              Cancel
            </button>
          </div>

          {message.type === "error" && !dateError && (
            <p className="submitschedule-error-message">{message.text}</p>
          )}
        </div>
      </div>
      <Footer color={"var(--color4)"} />
    </div>
  );
}
