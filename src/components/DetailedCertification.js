import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import http from "../data/http";
import fixDateToGmtPlusTwo from "../data/fixDateToGmtPlusTwo";
import { setBasketCount, setBasketNewItem } from "../features/loginSlice";
import Footer from "./Footer";
import "../css/DetailedCertification.css";

function DetailedCertification() {
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
  const { certExamId } = useParams();
  const [certification, setCertification] = useState(1);
  const basketCount = useSelector(state => state.token.value.basketCount);

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

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
      navigate("/certifications");
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
        dispatch(setBasketCount(basketCount + 1));
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
            <div className="detailed_certification-buttons">
              <div className="detailed_certification-first-button">
                <button onClick={() => handleCart(certification)}>
                  Add To Cart
                </button>
              </div>
              <div className="detailed_certification-second-button">
                <button onClick={() => navigate("/certifications")}>
                  Cancel
                </button>
              </div>
              <div className="detailed_certification-msg">
                {check && <p>{successMessage}</p>}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <Footer color={"var(--color4"} />
    </div>
  );
}

export default DetailedCertification;
