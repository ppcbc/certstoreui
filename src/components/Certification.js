import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import http from "../data/http";
import fixDateToGmtPlusTwo from "../data/fixDateToGmtPlusTwo";
import { setBasketCount, setBasketNewItem } from "../features/loginSlice";

function Certification({ certification }) {
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
  const basketCount = useSelector(state => state.token.value.basketCount);
  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return (
        <>
          {text.slice(0, maxLength)}...{" "}
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "0.9em"
            }}
          >
            more
          </span>
        </>
      );
    }
    return text;
  };

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
    <li key={certification.certExamId} className="certification-box">
      <Link
        to={`/detailed-certification/${certification.certExamId}`}
        className="certification-link"
      >
        <div>
          <h2>{certification.testTitle}</h2>
          <p>{truncateDescription(certification.testDescription, 100)}</p>
          <p>Price: €{certification.price || "N/A"}</p>
        </div>
      </Link>
      <div className="certification-buttons">
        <div className="certification-button">
          <button onClick={() => handleCart(certification)}>Add To Cart</button>
          {check && <p>{successMessage}</p>}
        </div>
      </div>
    </li>
  );
}

export default Certification;
