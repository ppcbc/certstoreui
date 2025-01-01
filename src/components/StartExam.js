import React, { useEffect, useState } from "react";
import "../css/StartExam.css";
import axios from "axios";
import { useSelector } from "react-redux";
import http from "../data/http";

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
    let theCertExam = async () => await getCertExams(20);
    console.log(theCertExam);
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

      //   console.log(response.data);
      return response.data;
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
