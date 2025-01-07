import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Certifications.css";
import axios from "axios";
import { useSelector } from "react-redux";
import http from "../data/http";
import Footer from "./Footer";
import Certification from "./Certification";

export default function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const myToken = useSelector(state => state.token.value.tok);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const res = await axios.get(http + "api/CertExams", {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      console.log(res.data);
      setCertifications(res.data);
    } catch (error) {
      console.error("Error fetching certifications:", error.message);
    }
  };

  const handleBuy = certification => {
    // alert(`Bought voucher for ${certification.categoryName}`);
    if (myToken) {
      navigate("/payment");
    } else {
      navigate("/register");
    }
  };

  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="certifications-main">
      <div className="certifications">
        <h1>Available Certifications</h1>
        <ul>
          {certifications.map(certification => (
            <Certification
              certification={certification}
              key={certification.certExamId}
            />
          ))}
        </ul>
      </div>
      <Footer color={"var(--color4)"} />
    </div>
  );
}
