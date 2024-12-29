import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Certifications from "./components/Certifications";
import Home from "./components/Home";
import ScheduleExam from "./components/ScheduleExam";
import MyCertificates from "./components/MyCertificates";
import Register from "./components/Register";
import Login from "./components/Login";
import AssignRole from "./components/AssignRole";
import AddExam from "./components/AddExam";
import Exam from "./components/Exam";
import AddExamCategory from "./components/AddExamCategory";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/schedule-exam" element={<ScheduleExam />} />
        <Route path="/my-certificates" element={<MyCertificates />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/test" element={<Test />} /> */}
        <Route path="/assignrole" element={<AssignRole />} />
        <Route path="/addexam" element={<AddExam />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/addexam-category" element={<AddExamCategory />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
