import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../css/Home.css";
import axios from "axios";
import http from "../data/http";
import Footer from "./Footer";
import Certification from "./Certification";

export default function Home() {
  const [certifications, setCertifications] = useState([]);
  const myToken = useSelector(state => state.token.value.tok);
  const myId = useSelector(state => state.token.value.id);
  const myRole = useSelector(state => state.token.value.role);

  useEffect(() => {
    fetchCertifications();
  }, []);
  const navigate = useNavigate();

  const fetchCertifications = async () => {
    try {
      const res = await axios.get(http + "api/CertExams", {
        // headers: {
        //     Authorization: "Bearer " + myToken
        // }
      });
      console.log(res.data);
      setCertifications(res.data);
    } catch (error) {
      console.error("Error fetching certifications:", error.message);
    }
  };

  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="my-home-main">
      <div className="my-home">
        <div className="my-home-upper">
          <h1>Welcome to the Certification Shop</h1>
          <hr className="divider" />
          <p className="main-text">
            Welcome to the Certification Shop, your go-to platform for
            professional certifications in programming. Founded in 2024, our
            mission is to provide individuals with the tools they need to
            advance in the tech industry by offering high-quality,
            industry-recognized certifications in programming languages like C#,
            JavaScript, Python, and more. Whether you're just starting your
            programming journey or you're a seasoned developer looking to
            enhance your skill set, Certification Shop offers a wide range of
            exams designed to validate your expertise and help you stand out in
            the competitive tech landscape. Join thousands of learners who trust
            Certification Shop for their professional development. Start your
            certification journey with us today and unlock new opportunities!
            {/* <p className="question-certify">
            <p>Ready to Get Certified?</p>
            <p>
              Browse our certification programs today and take the next step in
              your journey to excellence.
            </p>
          </p> */}
            {/* <p className="question-certify">{myId}</p> */}
          </p>
        </div>

        <div className="preview-certifications">
          <h1>Most Popular Certifications</h1>
          <ul>
            {certifications.slice(0, 3).map(certification => (
              <Certification
                certification={certification}
                key={certification.certExamId}
              />
            ))}
          </ul>
          {/* "EXPLORE ALL CERTIFICATIONS" link */}
          <Link to="/certifications" className="explore-link">
            Explore all Certifications →
          </Link>
        </div>
      </div>
      <Footer color={"var(--color4)"} />
    </div>
  );
}
