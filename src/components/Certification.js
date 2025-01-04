import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import http from "../data/http";

function Certification({ certification }) {
  const [myStaf, setMyStaf] = useState({
    userId: "",
    certExamId: "",
    hasBought: false,
    redeem: false
  });
  const navigate = useNavigate();
  const myToken = useSelector(state => state.token.value.tok);
  const myId = useSelector(state => state.token.value.id);
  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

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
    // alert(`Bought voucher for ${certification.categoryName}`);
    if (myToken) {
      navigate("/payment");
    } else {
      navigate("/register");
    }
  };

  const handleCart = certification => {
    if (myToken) {
      let staf = {
        userId: myId,
        certExamId: certification.certExamId,
        hasBought: false,
        redeem: false
        // dateOfSelectCertExam: Date.now()
      };
      addStaf(staf);
      // console.log(staf);
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
          {/* <div className="admin-panel-paragraph-container"> */}
          <p>{truncateDescription(certification.testDescription, 100)}</p>
          {/* </div> */}
          <p>Price: €{certification.price || "N/A"}</p>
        </div>
      </Link>
      <div className="certification-buttons">
        <div className="certification-button">
          <button onClick={() => handleCart(certification)}>Add To Cart</button>
        </div>
        {/* <div className="certification-button">
          <button onClick={() => handleBuy(certification)}>Buy Voucher</button>
        </div> */}
      </div>
    </li>
  );
}

export default Certification;
