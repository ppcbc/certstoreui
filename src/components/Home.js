import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../css/Home.css";
import axios from 'axios';
import http from '../data/http';

export default function Home() {
  const [certifications, setCertifications] = useState([]);
  const myToken = useSelector(state => state.token.value.tok);
  const myId = useSelector(state => state.token.value.id);
  const myRole = useSelector(state => state.token.value.role);

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

  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
      <div className="my-home">
        <h1>Welcome to the Certification Shop</h1>
        <hr className="divider"/>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </p>
 


        <div className="preview-certifications">
          <h1>Available Certifications</h1>
          <ul>
            {certifications.slice(0, 3).map((certification) => (
                <li key={certification.certExamId}>
                  <Link to={`/detailed-certification/${certification.certExamId}`} className="certification-link">
                    <div>
                      <h2>{certification.testTitle}</h2>
                      <p>{truncateDescription(certification.testDescription, 100)}</p>
                      <p>Price: ${certification.price || "N/A"}</p>
                    </div>
                  </Link>
                  <button
                      onClick={() =>
                          alert(`Bought voucher for ${certification.name}`)
                      }
                  >
                    Buy Voucher
                  </button>
                </li>
            ))}
          </ul>
          {/* "EXPLORE ALL CERTIFICATIONS" link */}
          <Link to="/certifications" className="explore-link">
            Explore all Certifications →
          </Link>
        </div>
        

      </div>
  );
}
