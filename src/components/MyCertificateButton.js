import React, { useState } from "react";
import "../css/ExamButton.css";
import fixDateToStringGmtPlusTwo from "../data/fixDateToGmtPlusTwo";
import formatDate from "../data/formatDate";

function MyCertificateButton({
  onClick,
  bkgrColor,
  clas,
  dateOfSendCertExam,
  userStafId,
  date
}) {
  const [text, setText] = useState("Select");
  const today = fixDateToStringGmtPlusTwo();
  let formatedDate = formatDate(today);
  const [isMouseOver, setIsMouseOver] = useState(false);
  function checkMouseOver() {
    setIsMouseOver(!isMouseOver);
  }
  // if (dateOfSendCertExam == formatedDate) {
  //   setText("Start");
  // }

  return (
    <div
      className={clas}
      onMouseOut={checkMouseOver}
      onMouseOver={checkMouseOver}
      style={{ backgroundColor: isMouseOver && `var(--${bkgrColor})` }}
      onClick={() => onClick(userStafId)}
    >
      {dateOfSendCertExam == "January 1, 1"
        ? "Select"
        : dateOfSendCertExam != formatDate
        ? dateOfSendCertExam
        : "Start"}
    </div>
  );
}

export default MyCertificateButton;
