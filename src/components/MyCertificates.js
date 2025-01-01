import React, { useState } from "react";
import "../css/MyCertificates.css";
import Footer from "./Footer";

export default function MyCertificates() {
  const [certificates] = useState([
    { id: 1, name: "C# CERTIFICATE", mark: 85 },
    { id: 2, name: "JAVASCRIPT CERTIFICATE", mark: 92 }
  ]);
  return (
    <div className="my-certificates-main">
      <div className="my-certificates">
        <h1>My Certificates</h1>
        <ul>
          {certificates.map(cert => (
            <li key={cert.id}>
              <h2>{cert.name}</h2>
              <p>Mark: {cert.mark}</p>
            </li>
          ))}
        </ul>
      </div>
      <Footer color={"var(--color7)"} />
    </div>
  );
}
