import React, { useState } from "react";
import "../css/CertExam.css";

function SelectExamAndQuestions({
  exam,
  handleExCategoryId,
  handleSelectedExams,
  allExams,
  catId
}) {
  const [isChecked, setIsChecked] = useState(false);

  function onCheckChange(e) {
    let { checked, value, name } = e.target;
    console.log(name);
    console.log(checked);
  }

  function onCheckNumber(e) {
    let { name, value } = e.target;
    console.log(value);
  }

  return (
    <div className="certexam-my-inner-box">
      <label className="certexam-my-label">
        <div className="certexam-first-label">
          {exam.categoryName.slice(0, 10)}
        </div>
        <div className="num-of-questions">
          <span className="num-title">Number of Questions:</span>
          <select
            name="selectedNumber"
            onChange={e => handleSelectedExams(e, catId)}
            //   onChange={(e) => onCheckNumber}
          >
            <option value="disabled">
              Select the number of questions you'd like
            </option>
            {allExams
              .filter(a => parseInt(a.categoryId) === parseInt(exam.categoryId))
              .map((number, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
          </select>
        </div>
      </label>
      <div className="my-checkbox-container">
        <div className="my-select-checkbox">
          <label className="select-text">Select:</label>
          <input
            className="my-checkbox"
            type="checkbox"
            name="categId"
            onChange={e => {
              handleExCategoryId(e, catId);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectExamAndQuestions;
