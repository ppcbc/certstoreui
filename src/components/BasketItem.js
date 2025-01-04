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
            <h3 className="basket-item-price" style={{fontSize: "1" + "rem" }}>Price: €{certExamPrice}</h3>
            <h3 className="basket-item-date" style={{color: "var(--color13)", fontSize: "1" +
                  "rem" }}>Added at: {selectDate}</h3>
          </div>
        </div>
        <div className="basket-buttons">
          <button
              className="basket-buy-button"
              onClick={() => navigate("/payment")}
          >
            Buy
          </button>
          <button
              className="basket-delete-button"
              onClick={() => removeStaf(id)}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};
