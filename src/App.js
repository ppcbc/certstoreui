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
import AddExam from "./components/AddExam";
import Exam from "./components/Exam";
import AddExamCategory from "./components/AddExamCategory";

function App() {
  return (
    <Router>
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
        <Route path="/addexam" element={<AddExam />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/addexam-category" element={<AddExamCategory />} />
      </Routes>
    </Router>
  );
}

export default App;
