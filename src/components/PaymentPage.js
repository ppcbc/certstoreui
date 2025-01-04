import React, { useState } from "react";
import "../css/PaymentPage.css";

function PaymentPage() {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setCardDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Handle payment processing here
    // alert("Payment processed successfully!");
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
        </div>
      </div>
    </form>
  );
}

export default PaymentPage;
