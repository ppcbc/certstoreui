import React, { useEffect, useState } from "react";
import "../css/MyCertificates.css";
import http from "../data/http";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Test() {
  const myToken = useSelector(state => state.token.value.tok);
  const [imgStyle, setImgStyle] = useState({
    width: "100%",
    height: "100%"
  });
  const [checkClick, setCheckClick] = useState(false);

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
  function enlargeImg() {
    setImgStyle({
      scale: "2",
      transform: "0.25s ease"
    });
    setCheckClick(false);
  }

  function resetImg() {
    setImgStyle({
      scale: "1",
      transform: "0.25s ease",
      width: "100%",
      height: "100%"
    });
    setCheckClick(true);
  }

  return (
    <div className="my-certificates">
      <h1>My Tests</h1>
      <ul>
        {test.map(a => (
          <li key={a.examId}>
            <h2>{a.questionText}</h2>

            {a.questionPhotoLink !== "" && (
              <div className="mytests">
                <img
                  className="image"
                  src={a.questionPhotoLink}
                  alt="code"
                  onClick={checkClick ? enlargeImg : resetImg}
                  style={imgStyle}
                />
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
