import React, { useState } from "react";
import "../css/ScheduleExam.css";
import Footer from "./Footer";
import StartExam from "./StartExam";

export default function ScheduleExam() {
  const [selectedDate, setSelectedDate] = useState("");

  const handleSchedule = () => {
    if (selectedDate) {
      alert(`Exam scheduled for ${selectedDate}`);
    } else {
      alert("Please select a date.");
    }
  };

  return (
    <div className="schedule-exam-main">
      <div className="schedule-exam">
        <div className="schedule-box">
          <h1>Schedule Your Exam</h1>
          <StartExam>START</StartExam>
          <label>
            Select Date:
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            />
          </label>

          <button onClick={handleSchedule}>Schedule Exam</button>
        </div>
      </div>
      <Footer color={"var(--color4)"} />
    </div>
  );
}
