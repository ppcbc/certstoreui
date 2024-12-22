import React, { useEffect, useState } from "react";
import "../css/MyCertificates.css";
import http from "../data/http";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Test() {
  const myToken = useSelector(state => state.token.value.tok);

  const [test, setTests] = useState([]);
  async function getTests() {
    try {
      var response = await axios.get(http + "api/Tests", {
        headers: {
          // "Content-Type": "application/json",
          Authorization: "Bearer " + myToken
        }
      });
      console.log("Admin Response:", response.data);
      setTests(response.data);
    } catch (error) {
      console.error("Admin Error:", error.message);
    }
  }

  useEffect(() => {
    getTests();
  }, []);

  return (
    <div className="my-certificates">
      <h1>My Tests</h1>
      <ul>
        {test.map(a => (
          <li key={a.testId}>
            <h2>{a.testTitle}</h2>
            <p>Description: {a.testDescription}</p>
            <p>Author: {a.testAuthor}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
