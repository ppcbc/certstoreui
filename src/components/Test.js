import React, { useEffect, useState } from "react";
import "../css/MyCertificates.css";
import http from "../data/http";
import axios from "axios";
import { useSelector } from "react-redux";
import Image from "./Image";

export default function Test() {
  const myToken = useSelector(state => state.token.value.tok);
  // const myToken = localStorage.getItem("tok");

  const [test, setTests] = useState([]);
  async function getTests() {
    try {
      var response = await axios.get(http + "api/Exams", {
        headers: {
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
          <li key={a.examId}>
            {a.questionText !== "" && <h2>{a.questionText}</h2>}

            {a.questionPhotoLink !== "" && (
              <div className="mytests">
                <Image link={a.questionPhotoLink} />
              </div>
            )}
            <p>Answer: {a.option1}</p>
            <p>It is {a.isCorrect1 ? "Correct" : "Wrong"}</p>
            <p>Answer: {a.option2}</p>
            <p>It is {a.isCorrect2 ? "Correct" : "Wrong"}</p>
            <p>Answer: {a.option3}</p>
            <p>It is {a.isCorrect3 ? "Correct" : "Wrong"}</p>
            <p>Answer: {a.option4}</p>
            <p>It is {a.isCorrect4 ? "Correct" : "Wrong"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
