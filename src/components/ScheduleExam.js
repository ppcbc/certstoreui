import React, { useState } from "react";
import "../css/ScheduleExam.css";
import Footer from "./Footer";
import axios from "axios";

export default function ScheduleExam() {
  const [selectedDate, setSelectedDate] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [dateError, setDateError] = useState("");

  const handleSchedule = async () => {
    if (!selectedDate) {
      setDateError("Please select a date.");
      setMessage({ type: "", text: "" });
      return;
    }

    setDateError("");

    try {
      const response = await axios.post("/api/scheduleExam", { date: selectedDate });
      if (response.status === 201 || response.status === 200) {
        setMessage({ type: "success", text: `Exam scheduled for ${selectedDate}` });
      }
    } catch (error) {
      console.error(error.message);
      setMessage({ type: "error", text: "Failed to schedule the exam. Please try again." });
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
                  onChange={(e) => setSelectedDate(e.target.value)}
              />
            </label>
            {dateError && <p className="schedule-error-message">{dateError}</p>}

            {message.type === "success" && (
                <p className="schedule-success-message">{message.text}</p>
            )}

            <button onClick={handleSchedule}>Schedule Exam</button>

            {message.type === "error" && !dateError && (
                <p className="submitschedule-error-message">{message.text}</p>
            )}
          </div>
        </div>
        <Footer color={"var(--color4)"} />
      </div>
  );
}
