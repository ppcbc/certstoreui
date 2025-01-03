import React from "react";
import "../css/Basket.css";

export const BasketItem = ({
  certExamTitle,
  certExamPrice,
  selectDate,
  removeStaf,
  navigate,
  id
}) => {
  return (
    <li className="basket-item">
      <div className="basket-header">
        <div className="basket-strings">
          <h2>{certExamTitle}</h2>
          <div className="basket-bot-strings">
            <h3>Price: €{certExamPrice}</h3>
            <h3>Added at: {selectDate}</h3>
          </div>
        </div>
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
  );
};
