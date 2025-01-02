import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Certification({ certification }) {
  const navigate = useNavigate();
  const myToken = useSelector(state => state.token.value.tok);
  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
  const handleBuy = certification => {
    // alert(`Bought voucher for ${certification.categoryName}`);
    if (myToken) {
      navigate("/payment");
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
      <button onClick={() => handleBuy(certification)}>Buy Voucher</button>
    </li>
  );
}

export default Certification;
