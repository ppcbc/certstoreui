import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Certifications.css";
import axios from "axios";
import { useSelector } from "react-redux";
import http from "../data/http";

export default function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const myToken = useSelector(state => state.token.value.tok);

  useEffect(() => {
    fetchCertifications();
  }, []);

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

  const handleBuy = certification => {
    alert(`Bought voucher for ${certification.categoryName}`);
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
            <li key={certification.certExamId} className="certification-box">
              <Link
                to={`/detailed-certification/${certification.certExamId}`}
                className="certification-link"
              >
                <div>
                  <h2>{certification.testTitle}</h2>
                  <p>
                    {truncateDescription(certification.testDescription, 100)}
                  </p>
                  <p>Price: ${certification.price || "N/A"}</p>
                </div>
              </Link>
              <button onClick={() => handleBuy(certification)}>
                Buy Voucher
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
