import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Certifications from "./components/Certifications";
import ScheduleExam from "./components/ScheduleExam";
import MyCertificates from "./components/MyCertificates";
import Register from "./components/Register";
import Login from "./components/Login";
import AssignRole from "./components/AssignRole";
import AddExam from "./components/AddExam";
import Exam from "./components/Exam";
import AddExamCategory from "./components/AddExamCategory";
import "./App.css";
import UserDetails from "./components/UserDetails";
import FullCategories from "./components/FullCategories";
import UpdateExamCategory from "./components/UpdateExamCategory";
import Finish from "./components/Finish";

function Layout() {
  const location = useLocation();
  const hideHeaderRoutes = ["/exam"];

  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/schedule-exam" element={<ScheduleExam />} />
        <Route path="/my-certificates" element={<MyCertificates />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/assignrole" element={<AssignRole />} />
        <Route path="/addexam" element={<AddExam />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/addexam-category" element={<AddExamCategory />} />
        <Route path="/updateexam-category" element={<UpdateExamCategory />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/addfull-category" element={<FullCategories />} />
        <Route path="/finish" element={<Finish />} />
      </Routes>
    </>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
