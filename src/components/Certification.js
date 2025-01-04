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
    redeem: false,
    dateofSelecCertExam: Date.now()
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
    const today = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Athens" })
    );

    const offset = today.getTimezoneOffset(); // Get offset in minutes
    const adjustedTime = new Date(today.getTime() - offset * 60000); // Adjust offset

    if (myToken) {
      let staf = {
        userId: myId,
        certExamId: certification.certExamId,
        hasBought: false,
        redeem: false,
        dateOfSelectCertExam: adjustedTime.toISOString().replace("Z", "+02:00")
      };
      addStaf(staf);
      console.log(today.toISOString());
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
