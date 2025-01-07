import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import http from "../data/http";
import "../css/AddExam.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Footer from "./Footer";

function UpdateExam() {
  let navigate = useNavigate();
  const [newExam, setNewExam] = useState({
    fullId: 0,
    categoryId: 0,
    questionText: "",
    questionPhotoLink: "",
    option1: "",
    isCorrect1: false,
    option2: "",
    isCorrect2: false,
    option3: "",
    isCorrect3: false,
    option4: "",
    isCorrect4: false
  });
  const [examCategories, setExamCategories] = useState([]);
  const [fullCategories, setFullCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [validationMessages, setValidationMessages] = useState({});
  const [startedExams, setStartedExams] = useState([]);

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1400);
  }

  const preset_key = "112898813666492";
  const precet = "certphoto";
  const api_secret = "WiNm8fism4GXfgYe0k8nME36EeY";

  const myToken = useSelector(state => state.token.value.tok);

  useEffect(() => {
    getCategories();
  }, [onSubmit]);

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

      var resq = await axios.get(http + "api/exams", {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      setStartedExams(resq.data);

      setExamCategories(response.data);
      setFullCategories(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  function validate() {
    let tempErrors = {};
    if (!newExam.fullId) tempErrors.fullId = "Category is required";
    if (!newExam.categoryId) tempErrors.categoryId = "Exam is required";
    if (!newExam.questionText && !imageUrl)
      tempErrors.questionText =
        "Either question text or a valid image is required";
    if (!newExam.option1) tempErrors.option1 = "First question is required";
    if (!newExam.option2) tempErrors.option2 = "Second question is required";
    if (!newExam.option3) tempErrors.option3 = "Third question is required";
    if (!newExam.option4) tempErrors.option4 = "Fourth question is required";

    setErrors(tempErrors);
    setValidationMessages(errors);
    return Object.keys(tempErrors).length === 0;
  }

  function onChange(e) {
    let { name, value } = e.target;
    if (parseInt(value) !== NaN) {
      parseInt(value);
    }
    if (value === "true" || value == "false") {
      value = value === "true";
    }

    setNewExam(prev => {
      return {
        ...prev,
        [name]: value,
        questionPhotoLink: imageUrl
      };
    });
  }
  function onGetStartedExam(e) {
    let { name, value } = e.target;

    let ffExam = startedExams.filter(a => a.examId == value);

    console.log(ffExam[0]);

    setNewExam(prev => {
      return {
        ...prev,
        ...ffExam[0]
      };
    });

    if (parseInt(value) !== NaN) {
      parseInt(value);
    }
    let settedExam = startedExams.filter(a => a.examId == value);
    let testExam = settedExam[0];
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    let test = {
      categoryId: newExam.categoryId,
      examId: newExam.examId,
      //   fullId: "1",
      isCorrect1: newExam.isCorrect1,
      isCorrect2: newExam.isCorrect2,
      isCorrect3: newExam.isCorrect3,
      isCorrect4: newExam.isCorrect4,
      option1: newExam.option1,
      option2: newExam.option2,
      option3: newExam.option3,
      option4: newExam.option4,
      questionPhotoLink: imageUrl !== "" ? imageUrl : newExam.questionPhotoLink,
      questionText: newExam.questionText
    };
    console.log(test);
    try {
      var response = await axios.put(http + "api/Exams/" + test.examId, test, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      console.log(response.status);

      if (response.status === 204 || response.status === 200) {
        setNewExam({
          examId: 0,
          fullId: 0,
          categoryId: 0,
          questionText: "",
          questionPhotoLink: "",
          option1: "",
          isCorrect1: false,
          option2: "",
          isCorrect2: false,
          option3: "",
          isCorrect3: false,
          option4: "",
          isCorrect4: false
        });
      }
      setMessage("Exam successfully added");
      handleMessage();
      console.log(response.data);
    } catch (error) {
      setMessage("Wrong credentials try again");
      handleMessage();
      console.log(error.message);
    }
  }

  async function handleFile(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", precet);

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/doueltigf/image/upload",
        formData
      );
      setImageUrl(response.data.secure_url);
      console.log(response.data.secure_url);
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
    }
  }

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1400);
  }

  return (
    <div className="add-exam-main">
      <form action="" onSubmit={onSubmit}>
        <div className="add-exam">
          <div className="add-box">
            <h1>Update Question</h1>
            <div className="add-my-inner-box">
              <label className="add-my-label">
                Select Module:
                <select
                  name="fullId"
                  value={newExam.fullId}
                  onChange={onChange}
                >
                  <option value={0}>Module</option>
                  {fullCategories.map(a => (
                    <option key={a.fullId} value={a.fullId}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {validationMessages.fullId && (
              <p className="AddExam-error-message">
                {validationMessages.fullId}
              </p>
            )}
            <div className="add-my-inner-box">
              <label className="add-my-label">
                Select Category:
                <select
                  name="categoryId"
                  value={examCategories.categoryId}
                  onChange={onChange}
                >
                  <option value={0}>Category</option>
                  {examCategories
                    .filter(
                      a => parseInt(a.fullId) === parseInt(newExam.fullId)
                    )
                    .map(a => (
                      <option key={a.categoryId} value={a.categoryId}>
                        {a.categoryName}
                      </option>
                    ))}
                </select>
              </label>
            </div>
            <div className="add-my-inner-box">
              <label className="add-my-label">
                Select Question:
                <select
                  name="examId"
                  value={newExam.examId}
                  onChange={onGetStartedExam}
                >
                  <option value={0}>Question</option>
                  {startedExams
                    .filter(
                      a =>
                        parseInt(a.categoryId) === parseInt(newExam.categoryId)
                    )
                    .map(a => (
                      <option key={a.examId} value={a.examId}>
                        Question: {a.questionText} - Id: {a.examId}
                      </option>
                    ))}
                </select>
              </label>
            </div>
            {validationMessages.categoryId && (
              <p className="AddExam-error-message">
                {validationMessages.categoryId}
              </p>
            )}
            <div className="add-my-inner-box">
              <label className="add-my-label">
                Question Text:
                <input
                  type="text"
                  className="fadeIn second"
                  name="questionText"
                  placeholder="Question text"
                  value={newExam.questionText}
                  onChange={onChange}
                />
              </label>
            </div>
            {validationMessages.questionText && (
              <p className="AddExam-error-message">
                {validationMessages.questionText}
              </p>
            )}
            <div className="add-my-inner-box">
              <label className="add-my-label">
                Upload foto for code snipped (Less than 10mb):
                <label for="file-upload" className="custom-file-upload">
                  Upload Photo
                  <input
                    id="file-upload"
                    type="file"
                    name="image"
                    onChange={handleFile}
                  ></input>
                </label>
              </label>
            </div>
            {validationMessages.imageUrl && (
              <p className="AddExam-error-message">
                {validationMessages.imageUrl}
              </p>
            )}
            <div className="add-my-inner-box">
              <label className="add-my-label">
                First Answer:
                <input
                  type="text"
                  name="option1"
                  placeholder="First answer"
                  value={newExam.option1}
                  onChange={onChange}
                />
                <select
                  name="isCorrect1"
                  value={newExam.isCorrect1}
                  onChange={onChange}
                >
                  <option value={false}>Wrong</option>
                  <option value={true}>Correct</option>
                </select>
              </label>
            </div>
            {validationMessages.option1 && (
              <p className="AddExam-error-message">
                {validationMessages.option1}
              </p>
            )}
            <div className="add-my-inner-box">
              <label className="add-my-label">
                Second Answer:
                <input
                  type="text"
                  className="fadeIn third"
                  name="option2"
                  placeholder="Second answer"
                  value={newExam.option2}
                  onChange={onChange}
                />
                <select
                  name="isCorrect2"
                  value={newExam.isCorrect2}
                  onChange={onChange}
                >
                  <option value={false}>Wrong</option>
                  <option value={true}>Correct</option>
                </select>
              </label>
            </div>
            {validationMessages.option2 && (
              <p className="AddExam-error-message">
                {validationMessages.option2}
              </p>
            )}
            <div className="add-my-inner-box">
              <label className="add-my-label">
                Third Answer:
                <input
                  type="text"
                  className="fadeIn third"
                  name="option3"
                  placeholder="Third answer"
                  value={newExam.option3}
                  onChange={onChange}
                />
                <select
                  name="isCorrect3"
                  value={newExam.isCorrect3}
                  onChange={onChange}
                >
                  <option value={false}>Wrong</option>
                  <option value={true}>Correct</option>
                </select>
              </label>
            </div>
            {validationMessages.option3 && (
              <p className="AddExam-error-message">
                {validationMessages.option3}
              </p>
            )}
            <div className="add-my-inner-box">
              <label className="add-my-label">
                Fourth Answer:
                <input
                  type="text"
                  className="fadeIn third"
                  name="option4"
                  placeholder="Fourth answer"
                  value={newExam.option4}
                  onChange={onChange}
                />
                <select
                  name="isCorrect4"
                  value={newExam.isCorrect4}
                  onChange={onChange}
                >
                  <option value={false}>Wrong</option>
                  <option value={true}>Correct</option>
                </select>
              </label>
            </div>
            {validationMessages.option4 && (
              <p className="AddExam-error-message">
                {validationMessages.option4}
              </p>
            )}
            <div className="add-my-inner-box">
              <button type="submit" className="fadeIn fourth" value="submit">
                Update
              </button>
            </div>
            <div className="add-my-inner-box">
              <button
                type="cancel"
                className="fadeIn fourth"
                onClick={() => navigate("/adminpanel")}
              >
                Cancel
              </button>
            </div>
            <div className="add-my-label">{check && <p>{message}</p>}</div>
          </div>
        </div>
      </form>
      <Footer color={"var(--color4)"} />
    </div>
  );
}

export default UpdateExam;
