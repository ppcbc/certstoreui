import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import http from "../data/http";
import "../css/CertExam.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import SelectExamAndQuestions from "./SelectExamAndQuestions";
import Footer from "./Footer";

function CertExam() {
  let navigate = useNavigate();
  const [certExam, setCertExam] = useState({
    fullId: "",
    testTitle: "",
    testDescription: "",
    price: "",
    examQuestions: []
  });
  const [examCategories, setExamCategories] = useState([]);
  const [fullCategories, setFullCategories] = useState([]);
  const [allExams, setAllExams] = useState([]);
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState(false);

  const [excategoryIds, setExCategoryIds] = useState([]);
  const [selectedExams, setSelectedExams] = useState([]);
  const [combinedExams, setCombinedExams] = useState([]);
  const [validationMessages, setValidationMessages] = useState({});
  const [errors, setErrors] = useState({});

  function handleExCategoryId(e, categoryId) {
    let { checked, type, value, name } = e.target;

    if (checked === "true" || checked === "false") {
      checked = checked === "true";
    }
    if (parseInt(categoryId) !== NaN) {
      parseInt(categoryId);
    }

    console.log(checked);
    console.log(categoryId);
    if (checked === true) {
      setExCategoryIds(prev => {
        return [
          ...prev,
          {
            categoryId: categoryId,
            selected: checked
          }
        ];
      });
    } else {
      setExCategoryIds(prev =>
        prev.filter(a => parseInt(a.categoryId) !== parseInt(categoryId))
      );
    }
    console.log(selectedExams);
  }
  function handleSelectedExams(e, categoryId) {
    let { name, value } = e.target;
    if (parseInt(value) !== NaN) {
      parseInt(value);
    }
    if (parseInt(categoryId) !== NaN) {
      parseInt(categoryId);
    }
    setSelectedExams(prev => {
      return [
        ...prev,
        {
          categoryId: categoryId,
          number: value
        }
      ];
    });
  }

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1400);
  }
  const myToken = useSelector(state => state.token.value.tok);
  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      var response = await axios.get(http + "api/ExamCategories", {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });

      var res = await axios.get(http + "api/FullCategories", {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      var ress = await axios.get(http + "api/Exams", {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });

      setExamCategories(response.data);
      setFullCategories(res.data);
      setAllExams(ress.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  function onChange(e) {
    let { name, value } = e.target;
    if (parseInt(value) !== NaN) {
      parseInt(value);
    }
    if (value === "true" || value === "false") {
      value = value === "true";
    }

    setCertExam(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  const validate = () => {
    let tempErrors = {};
    if (!certExam.testTitle)
      tempErrors.testTitle = "Certification title is required";
    if (!certExam.testDescription)
      tempErrors.testDescription = "Certification description is required";
    if (!certExam.price) tempErrors.price = "Certification price is required";
    if (!certExam.fullId) tempErrors.fullId = "Category is required";
    if (certExam.fullId && !excategoryIds.some(item => item.selected)) {
      tempErrors.examQuestions = "At least one category must be selected";
    }
    if (certExam.fullId && !selectedExams.length) {
      tempErrors.examQuestions = "At least one question must be selected";
    }

    setErrors(tempErrors);
    setValidationMessages(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    console.log("excategoryids");
    console.log(excategoryIds);

    try {
      let combinedSelectedExams = excategoryIds
        .filter(item => item.selected) // Only selected categories
        .map(item => {
          const selectedExam = selectedExams.find(
            exam => exam.categoryId === item.categoryId
          );
          return {
            categoryId: item.categoryId,
            selected: item.selected,
            number: selectedExam ? selectedExam.number : null // Include number if available
          };
        });
      combinedSelectedExams = combinedSelectedExams.filter(
        a => a.number !== null
      );

      setCombinedExams(combinedSelectedExams);

      let myObject = {
        ...certExam,
        price: parseInt(certExam.price),
        examQuestions: combinedSelectedExams
      };

      var response = await axios.post(http + "api/CertExams", myObject, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      console.log(response.status);
      if (response.status === 201 || response.status === 200) {
        setCertExam({
          fullId: "",
          testTitle: "",
          testDescription: "",
          price: "",
          examQuestions: []
        });
      }
      setMessage("Exam successfully added");
      handleMessage();
    } catch (error) {
      setMessage("Wrong credentials try again");
      handleMessage();
      console.log(error.message);
    }
  }

  return (
    <div className="certexam-main">
      <form onSubmit={onSubmit} action="submit">
        <div className="certexam">
          <div className="certexam-box">
            <h1>Create Exam</h1>
            <div className="certexam-my-inner-box">
              <label className="certexam-my-label">
                Exam Title:
                <input
                  type="text"
                  name="testTitle"
                  placeholder="Exam Title"
                  value={certExam.testTitle}
                  onChange={onChange}
                />
              </label>
            </div>
            {validationMessages.testTitle && (
              <p className="CertExam-error-message">
                {validationMessages.testTitle}
              </p>
            )}
            <div className="certexam-my-inner-box">
              <label className="certexam-my-label">
                Exam Description:
                <textarea
                  name="testDescription"
                  placeholder="Exam Description"
                  value={certExam.testDescription}
                  onChange={onChange}
                  rows="3"
                />
              </label>
            </div>
            {validationMessages.testDescription && (
              <p className="CertExam-error-message">
                {validationMessages.testDescription}
              </p>
            )}
            <div className="certexam-my-inner-box">
              <label className="certexam-my-label">
                Exam Price:
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={certExam.price}
                  onChange={onChange}
                />
              </label>
            </div>
            {validationMessages.price && (
              <p className="CertExam-error-message">
                {validationMessages.price}
              </p>
            )}
            <div className="certexam-my-inner-box">
              <label className="certexam-my-label">
                Select Module:
                <select
                  name="fullId"
                  value={certExam.fullId}
                  onChange={onChange}
                >
                  <option value="">Category</option>
                  {fullCategories.map(a => (
                    <option key={a.fullId} value={a.fullId}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </label>
              {validationMessages.fullId && (
                <p className="CertExam-error-message">
                  {validationMessages.fullId}
                </p>
              )}
            </div>
            {examCategories
              .filter(a => parseInt(a.fullId) === parseInt(certExam.fullId))
              .map((exam, index) => (
                <SelectExamAndQuestions
                  key={index}
                  exam={exam}
                  allExams={allExams}
                  onChange={onChange}
                  handleExCategoryId={handleExCategoryId}
                  handleSelectedExams={handleSelectedExams}
                  catId={exam.categoryId}
                />
              ))}
            {validationMessages.examQuestions && (
              <p className="CertExam-error-message">
                {validationMessages.examQuestions}
              </p>
            )}
            <div className="certexam-my-inner-box">
              <button type="submit" className="fadeIn fourth">
                Create
              </button>
            </div>
            <div className="certexam-my-inner-box">
              <button
                type="cancel"
                className="fadeIn fourth"
                onClick={() => navigate("/adminpanel")}
              >
                Cancel
              </button>
            </div>
            <div className="certexam-my-message">
              {check && <p>{message}</p>}
            </div>
          </div>
        </div>
      </form>
      <Footer color={"var(--color7)"} />
    </div>
  );
}

export default CertExam;
