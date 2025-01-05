import React, { useState } from "react";
import "../css/ExamButton.css";

function MyCertificateButton({ children, onClick, bkgrColor, clas }) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  function checkMouseOver() {
    setIsMouseOver(!isMouseOver);
  }
  return (
    <div
      className={clas}
      onMouseOut={checkMouseOver}
      onMouseOver={checkMouseOver}
      style={{ backgroundColor: isMouseOver && `var(--${bkgrColor})` }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default MyCertificateButton;
