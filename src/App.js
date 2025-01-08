import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  matchPath
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
import Basket from "./components/Basket";
import UpdateFullExamCategory from "./components/UpdateFullExamCategorty";
import UpdateExam from "./components/UpdateExam";
import UpdateUser from "./components/UpdateUser";
import DeleteUser from "./components/DeleteUser";
import DeleteCertExam from "./components/DeleteCertExam";
import CreateRole from "./components/CreateRole";
import Diploma from "./components/Diploma";
import UpdateCertExam from "./components/UpdateCertExam";
import CertificateResults from "./components/CertificateResults";
import UnmarketResults from "./components/UnmarkedResults";
import CertificateToBeChecked from "./components/CertificateToBeChecked";
import UpdateUserNavbar from "./components/UpdateUserNavbar";

function Layout() {
  const location = useLocation();
  const hideHeaderRoutes = ["/exam/:userStafId"];

  const shouldShowHeader = !hideHeaderRoutes.some(route =>
    matchPath(route, location.pathname)
  );
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
        <Route path="/schedule-exam/:userStafId" element={<ScheduleExam />} />
        <Route path="/my-certificates" element={<MyCertificates />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/assignrole" element={<AssignRole />} />
        <Route path="/addexam" element={<AddExam />} />
        <Route path="/exam/:userStafId" element={<Exam />} />
        <Route path="/addexam-category" element={<AddExamCategory />} />
        <Route path="/updateexam-category" element={<UpdateExamCategory />} />
        <Route path="/user-details/:userStafId" element={<UserDetails />} />
        <Route path="/user-details/" element={<UserDetails />} />
        <Route path="/addfull-category" element={<FullCategories />} />
        <Route path="/finish" element={<Finish />} />
        <Route
          path="/certificateResults/:certificateKey"
          element={<CertificateResults />}
        />
        <Route path="/diploma/:certificateKey" element={<Diploma />} />
        <Route path="/add-certexam" element={<CertExam />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/start-exam" element={<StartExam />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/delete-exam" element={<DeleteExam />} />
        <Route path="/delete-exam-category" element={<DeleteExamCategory />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/marker-panel" element={<UnmarketResults />} />

        <Route
          path="/delete-full-exam-category"
          element={<DeleteFullExamCategory />}
        />
        <Route
          path="/update-full-exam-category"
          element={<UpdateFullExamCategory />}
        />
        <Route path="/update-exam" element={<UpdateExam />} />
        <Route path="/update-user" element={<UpdateUser />} />
        <Route path="/update-user-nav" element={<UpdateUserNavbar />} />
        <Route path="/delete-user" element={<DeleteUser />} />
        <Route path="/delete-certexam" element={<DeleteCertExam />} />
        <Route path="/create-role" element={<CreateRole />} />
        <Route path="/update-certexam" element={<UpdateCertExam />} />
        <Route
          path="/cert-to-check/:certificateKey"
          element={<CertificateToBeChecked />}
        />
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
