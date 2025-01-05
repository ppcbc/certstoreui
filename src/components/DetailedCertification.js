// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import "../css/DetailedCertification.css";
// import axios from "axios";
// import http from "../data/http";
// import Footer from "./Footer";

// export default function DetailedCertification() {
//   const { certExamId } = useParams();
//   const [certification, setCertification] = useState(null);

//   useEffect(() => {
//     const fetchCertification = async () => {
//       try {
//         const response = await axios.get(`${http}api/CertExams/${certExamId}`);
//         setCertification(response.data);
//       } catch (error) {
//         console.error("Error fetching certification details:", error.message);
//       }
//     };

//     fetchCertification();
//   }, [certExamId]);

//   const handleBuy = () => {
//     alert(
//       `Bought voucher for ${certification?.testTitle || "this certification"}`
//     );
//   };

//   if (!certification) {
//     return (
//       <div className="detailed_certification">
//         <h2>Loading certification details...</h2>
//       </div>
//     );
//   }
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import http from "../data/http";
import fixDateToGmtPlusTwo from "../data/fixDateToGmtPlusTwo";
import { setBasketNewItem } from "../features/loginSlice";
import Footer from "./Footer";
import "../css/DetailedCertification.css";

function DetailedCertification() {
  const { certExamId } = useParams();
  const [certification, setCertification] = useState(1);

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
  const dispatch = useDispatch();

  const [successMessage, setSuccessMessage] = useState("");
  const [check, setCheck] = useState(false);
  const [myStaf, setMyStaf] = useState({
    userId: "",
    certExamId: "",
    hasBought: false,
    redeem: false,
    dateofSelecCertExam: Date.now()
  });
  const navigate = useNavigate();
  const myToken = useSelector(state => state.token.value.tok);
  const myId = useSelector(state => state.token.value.id);

  // const truncateDescription = (text, maxLength) => {
  //   if (text.length > maxLength) {
  //     return text.slice(0, maxLength) + "...";
  //   }
  //   return text;
  // };

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1400);
  }

  async function addStaf(staf) {
    try {
      var response = await axios.post(http + "api/UserStafs", staf, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      // console.log(staf);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleBuy = certification => {
    if (myToken) {
      navigate("/payment");
    } else {
      navigate("/register");
    }
  };

  const handleCart = certification => {
    const today = fixDateToGmtPlusTwo();

    if (myToken) {
      let staf = {
        userId: myId,
        certExamId: certification.certExamId,
        hasBought: false,
        redeem: false,
        dateOfSelectCertExam: today
      };
      addStaf(staf);
      setSuccessMessage("Added to cart");
      handleMessage();
      setTimeout(() => {
        dispatch(setBasketNewItem());
        setTimeout(() => {
          dispatch(setBasketNewItem());
        }, 700);
      });
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="detailed_certification-main">
      <div className="detailed_certification">
        <ul>
          <li>
            <h2>{certification.testTitle}</h2>
            <p>{certification.testDescription}</p>
            <p>Price: €{certification.price || "N/A"}</p>
            {/* <p className="skill-level">
              Skill level: {certification.skillLevel || "N/A"}
            </p>
            <p className="duration">
              Duration: {certification.duration || "N/A"}
            </p> */}
            <button onClick={() => handleCart(certification)}>
              Buy Voucher
            </button>
          </li>
        </ul>
      </div>
      <Footer color={"var(--color4"} />
    </div>
  );
}

export default DetailedCertification;
