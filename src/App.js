import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Certifications from "./components/Certifications";
import ScheduleExam from "./components/ScheduleExam";
import MyCertificates from "./components/MyCertificates";
import Register from "./components/Register";
import Login from "./components/Login";
import Test from "./components/Test";
import AssignRole from "./components/AssignRole";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/schedule-exam" element={<ScheduleExam />} />
          <Route path="/my-certificates" element={<MyCertificates />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/test" element={<Test />} />
          <Route path="/assignrole" element={<AssignRole />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
