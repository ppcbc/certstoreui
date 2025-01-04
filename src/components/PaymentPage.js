import React, { useEffect, useState } from "react";
import "../css/PaymentPage.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import http from "../data/http";
import axios from "axios";
import fixDateToStringGmtPlusTwo from "../data/fixDateToGmtPlusTwo";

function PaymentPage() {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: ""
  });
  const [currentStaf, setCurrentStaf] = useState({});
  const navigate = useNavigate();
  const userStafId = useSelector(state => state.token.value.stafId);
  const myToken = useSelector(state => state.token.value.tok);

  useEffect(() => {
    getCurrentStaf();
  }, []);

  const getCurrentStaf = async () => {
    try {
      const response = await axios.get(http + `api/UserStafs/${userStafId}`, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      setCurrentStaf(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateStaf = async () => {
    try {
      const today = fixDateToStringGmtPlusTwo();
      let staf = {
        ...currentStaf,
        dateOfBuyCertExam: today,
        hasBought: true
      };
      const response = await axios.put(
        http + `api/UserStafs/${userStafId}`,
        staf,
        {
          headers: {
            Authorization: "Bearer " + myToken
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setCardDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateStaf();
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="payment-category">
        <div className="payment-add-box">
          <h1>Payment Information</h1>
          <div className>
            <div className="payment-inner-box">
              <label className="payment-add-my-label">
                Card Number:
                <input
                  type="text"
                  className="fadeIn second"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={cardDetails.cardNumber}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="payment-inner-box">
              <label className="payment-add-my-label">
                Expiry Date:
                <input
                  type="date"
                  className="fadeIn second"
                  name="expiryDate"
                  placeholder="Expiry Date"
                  value={cardDetails.expiryDate}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="payment-inner-box">
              <label className="payment-add-my-label">
                CVV:
                <input
                  type="text"
                  className="fadeIn second"
                  name="cvv"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="payment-inner-box">
              <label className="payment-add-my-label">
                Card Holder Name:
                <input
                  type="text"
                  className="fadeIn second"
                  name="cardHolderName"
                  placeholder="Card Holder Name"
                  value={cardDetails.cardHolderName}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <div className="payment-inner-box">
            <button type="submit" className="fadeIn fourth">
              Submit Payment
            </button>
          </div>
          <div className="payment-inner-box">
            <button
              type="cancel"
              className="fadeIn fourth"
              onClick={() => navigate("/basket")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PaymentPage;
