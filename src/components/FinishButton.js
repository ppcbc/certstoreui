import React, { useState } from "react";
import "../css/FinishButton.css";

function FinishButton({ children, finish }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  function checkMouseOver() {
    setIsMouseOver(!isMouseOver);
  }
  return (
    <div
      className="finish-button"
      onMouseOut={checkMouseOver}
      onMouseOver={checkMouseOver}
      style={{ backgroundColor: isMouseOver && "var(--color9" }}
      onClick={() => finish()}
    >
      {children}
    </div>
  );
}

export default FinishButton;
