// import React, { useState } from 'react';
// import '../css/DetailedCertification.css'
//
// export default function DetailedCertification() {
//     const [certifications] = useState([
//         {
//             id: 1,
//             name: 'SQL Certification',
//             price: 50,
//             skillLevel: 'Beginner',
//             duration: '2 hours',
//             description: 'The SQL Certification course is designed to equip learners with the essential skills to manage and query relational databases. You\'ll master SQL syntax, learn to create and manipulate tables, work with complex queries, and understand database normalization and optimization techniques. Ideal for anyone interested in data management, the course covers both fundamental and advanced topics, ensuring you can effectively interact with databases in real-world scenarios. Whether you\'re pursuing a career in data analysis, software development, or database administration, this certification provides the practical knowledge needed to excel in managing data and performing efficient queries.'
//         }
//     ]);
//
//     const handleBuy = (certification) => {
//         alert(`Bought voucher for ${certification.name}`);
//     };
//
//     return (
//         <div className="detailed_certification">
//             <ul>
//                 {certifications.map((certification) => (
//                     <li key={certification.id}>
//                         <h2>{certification.name}</h2>
//                         <p>{certification.description}</p>
//                         <p>Price: ${certification.price}</p>
//                         <p className="skill-level">Skill level: {certification.skillLevel}</p>
//                         <p className="duration">Duration: {certification.duration}</p>
//                         <button onClick={() => handleBuy(certification)}>Buy Voucher</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/DetailedCertification.css";
import axios from "axios";
import http from "../data/http";

export default function DetailedCertification() {
  const { certExamId } = useParams();
  const [certification, setCertification] = useState(null);

  useEffect(() => {
    const fetchCertification = async () => {
      try {
        const response = await axios.get(`${http}api/CertExams/${certExamId}`);
        setCertification(response.data);
      } catch (error) {
        console.error("Error fetching certification details:", error.message);
      }
    };

    fetchCertification();
  }, [certExamId]);

  const handleBuy = () => {
    alert(
      `Bought voucher for ${certification?.testTitle || "this certification"}`
    );
  };

  if (!certification) {
    return (
      <div className="detailed_certification">
        <h2>Loading certification details...</h2>
      </div>
    );
  }

  return (
    <div className="detailed_certification">
      <ul>
        <li>
          <h2>{certification.testTitle}</h2>
          <p>{certification.testDescription}</p>
          <p>Price: ${certification.price || "N/A"}</p>
          <p className="skill-level">
            Skill level: {certification.skillLevel || "N/A"}
          </p>
          <p className="duration">
            Duration: {certification.duration || "N/A"}
          </p>
          <button onClick={handleBuy}>Buy Voucher</button>
        </li>
      </ul>
    </div>
  );
}
