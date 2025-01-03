import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import http from "../data/http";

export const BasketItem = ({
  certExamTitle,
  certExamPrice,
  removeStaf,
  navigate,
  selectDate,
  id
}) => {
  //   const [message, setMessage] = useState("");
  //   const [check, setCheck] = useState(false);
  //   setMessage("Item successfully removed");
  //   handleMessage();
  //   function handleMessage() {
  //     setCheck(true);
  //     setTimeout(() => {
  //       setCheck(false);
  //     }, 700);
  //   }

  return (
    <div>
      <li>
        <div className="basket-header">
          <h2>{certExamTitle}</h2>
          <h2>Price {certExamPrice}</h2>
          <p>Added at {selectDate}</p>
          <div className="basket-buttons">
            <button
              className="basket-delete-button"
              onClick={() => removeStaf(id)}
            >
              Remove
            </button>
            <button
              className="basket-buy-button"
              onClick={() => navigate("/payment")}
            >
              Buy
            </button>
          </div>
        </div>
      </li>
      {/* <div className="">{check && <p>{message}</p>}</div> */}
    </div>
  );
};
