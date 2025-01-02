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
import CertExam from "./components/CertExam";
import AdminPanel from "./components/AdminPanel";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";
import About from "./components/About";
import DetailedCertification from "./components/DetailedCertification";
import StartExam from "./components/StartExam";
import PaymentPage from "./components/PaymentPage";
import DeleteExam from "./components/DeleteExam";
import DeleteExamCategory from "./components/DeleteExamCategory";
import DeleteFullExamCategory from "./components/DeleteFullExamCategory";

function Layout() {
  const location = useLocation();
  const hideHeaderRoutes = ["/exam"];

  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      {/* <div className="container-app"> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route
          path="/detailed-certification/:certExamId"
          element={<DetailedCertification />}
        />
        <Route path="/schedule-exam" element={<ScheduleExam />} />
        <Route path="/my-certificates" element={<MyCertificates />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
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
        <Route path="/add-certexam" element={<CertExam />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/start-exam" element={<StartExam />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/delete-exam" element={<DeleteExam />} />
        <Route path="/delete-exam-category" element={<DeleteExamCategory />} />
        <Route path="/delete-full-exam-category" element={<DeleteFullExamCategory />} />
      </Routes>
      {/* </div> */}
      {/* {shouldShowHeader && <Footer color={"red"} />} */}
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
