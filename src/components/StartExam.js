import React, { useEffect, useState } from "react";
import "../css/StartExam.css";
import axios from "axios";
import { useSelector } from "react-redux";
import http from "../data/http";
import shuffle from "../data/shuffle";

function StartExam({ children, certId }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [certExam, setCertExam] = useState({
    certExamId: "",
    fullId: "",
    testTitle: "",
    testDescription: "",
    price: "",
    examQuestions: []
  });

  useEffect(() => {
    getCertExams(20);
  }, []);

  const myToken = useSelector(state => state.token.value.tok);
  //id 20

  function checkMouseOver() {
    setIsMouseOver(!isMouseOver);
  }

  async function getCertExams(certId) {
    try {
      var response = await axios.get(http + `api/CertExams/${certId}`, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });

      setCertExam(response.data);
      let myExams = response.data.examQuestions;
      // console.log(myExams);

      var res = await axios.get(http + "api/exams");
      let allExams = res.data;
      let selectedExams = [];

      for (let i = 0; i < myExams.length; i++) {
        selectedExams[i] = allExams.filter(
          item => item.categoryId == myExams[i].categoryId
        );
      }
      let finalExams = [];
      for (let i = 0; i < selectedExams.length; i++) {
        shuffle(selectedExams[i]);
        for (let y = 0; y < myExams[i].number; y++) {
          finalExams.push(selectedExams[i][y]);
        }
      }
      console.log("final exams");
      console.log(finalExams);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div
      className="start-exam"
      onMouseOut={checkMouseOver}
      onMouseOver={checkMouseOver}
      style={{ backgroundColor: isMouseOver && "var(--color9" }}
      onClick={""}
    >
      {children}
    </div>
  );
}

export default StartExam;
