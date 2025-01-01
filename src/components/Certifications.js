import React, { useState } from "react";
import "../css/Certifications.css";
import Footer from "./Footer";

export default function Certifications() {
  const [certifications] = useState([
    {
      id: 1,
      name: "SQL Certification",
      price: 50,
      description:
        "Master SQL to manage and query relational databases effectively in modern applications."
    },
    {
      id: 2,
      name: "C# Certification",
      price: 60,
      description:
        "Learn C# for building powerful and scalable applications across various platforms, including .NET."
    },
    {
      id: 3,
      name: "JavaScript Certification",
      price: 40,
      description:
        "Develop dynamic web applications by mastering JavaScript, the cornerstone of modern front-end development."
    },
    {
      id: 4,
      name: "Python Certification",
      price: 55,
      description:
        "Gain proficiency in Python for data science, web development, and automation tasks."
    },
    {
      id: 5,
      name: "ITIL 4 Foundation",
      price: 70,
      description:
        "A solid foundation for understanding IT service management and its core elements."
    },
    {
      id: 6,
      name: "PRINCE2 Risk Management",
      price: 65,
      description:
        "Identify, assess, and control risks, to enhance decision-making and resilience."
    }
  ]);

  const handleBuy = certification => {
    alert(`Bought voucher for ${certification.name}`);
  };

  return (
    <div className="certifications-main">
      <div className="certifications">
        <h1>Available Certifications</h1>
        <ul>
          {certifications.map(certification => (
            <li key={certification.id}>
              <h2>{certification.name}</h2>
              <p>{certification.description}</p>
              <p>Price: ${certification.price}</p>
              <button onClick={() => handleBuy(certification)}>
                Buy Voucher
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Footer color={"var(--color7)"} />
    </div>
  );
}
