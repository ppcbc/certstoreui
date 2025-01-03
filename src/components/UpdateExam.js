import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import http from "../data/http";
import "../css/UpdateExam.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setFullCategoryId,
  setId,
  setLogReg,
  setRole,
  setToken
} from "../features/loginSlice";
import Footer from "./Footer";

// Προσθέτουμε το preset_key εδώ
const preset_key = "112898813666492";

function UpdateExam() {
  let navigate = useNavigate();
  let { id } = useParams();
  const [exam, setExam] = useState({
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

  const myToken = useSelector(state => state.token.value.tok);
  const dispatch = useDispatch();

  useEffect(() => {
    getCategories();
    if (id) {
      getExam(id); // Φέρνουμε τα δεδομένα του εξεταστικού ερωτήματος
    }
  }, [id]);

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

      setExamCategories(response.data);
      setFullCategories(res.data);
      console.log(response.data);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getExam(examId) {
    try {
      const response = await axios.get(http + `api/Exams/${examId}`, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });

      setExam(response.data);
      setImageUrl(response.data.questionPhotoLink || "");
      console.log("Exam data:", response.data);
    } catch (error) {
      console.log("Error fetching exam:", error.message);
    }
  }

  function validate() {
    let tempErrors = {};
    if (!exam.fullId) tempErrors.fullId = "Category is required";
    if (!exam.categoryId) tempErrors.categoryId = "Exam is required";
    if (!exam.questionText && !imageUrl)
      tempErrors.questionText =
        "Either question text or a valid image is required";
    if (!exam.option1) tempErrors.option1 = "First question is required";
    if (!exam.option2) tempErrors.option2 = "Second question is required";
    if (!exam.option3) tempErrors.option3 = "Third question is required";
    if (!exam.option4) tempErrors.option4 = "Fourth question is required";

    setErrors(tempErrors);
    setValidationMessages(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  function onChange(e) {
    let { name, value } = e.target;
    if (!isNaN(parseInt(value))) {
      value = parseInt(value);
    }
    if (value === "true" || value === "false") {
      value = value === "true";
    }

    setExam(prev => ({
      ...prev,
      [name]: value,
      questionPhotoLink: imageUrl
    }));
  }

  function onChangeFullCategory(e) {
    const { value } = e.target;
    setExam(prev => ({
      ...prev,
      fullId: parseInt(value),
      categoryId: 0
    }));
    dispatch(setFullCategoryId(value));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    console.log(exam);
    console.log(examCategories);
    try {
      var response = await axios.put(http + `api/Exams/${id}`, exam, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      console.log(response.status);
      if (response.status === 200) {
        setMessage("Exam successfully updated");
        handleMessage();
      }
      console.log(response.data);
    } catch (error) {
      setMessage("Error updating exam");
      handleMessage();
      console.log(error.message);
    }
  }

  async function handleFile(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/doueltigf/image/upload",
        formData
      );
      setImageUrl(response.data.secure_url);
      setExam(prev => ({
        ...prev,
        questionPhotoLink: response.data.secure_url
      }));
      console.log(response.data.secure_url);
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
    }
  }

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 700);
  }

  async function handleExamSelection(e) {
    const { value } = e.target;
    setExam(prev => ({
      ...prev,
      categoryId: parseInt(value)
    }));
    await fetchExamData(value);
  }

  async function fetchExamData(examId) {
    try {
      const response = await axios.get(http + `api/Exams/${examId}`, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      setExam(prev => ({
        ...prev,
        questionText: response.data.questionText || "",
        option1: response.data.option1 || "",
        isCorrect1: response.data.isCorrect1,
        option2: response.data.option2 || "",
        isCorrect2: response.data.isCorrect2,
        option3: response.data.option3 || "",
        isCorrect3: response.data.isCorrect3,
        option4: response.data.option4 || "",
        isCorrect4: response.data.isCorrect4
      }));
      console.log("Selected exam data:", response.data);
    } catch (error) {
      console.log("Error fetching exam data:", error.message);
    }
  }
  {
    /* -> */
  }
  return (
    <div className="update-exam-main">
      <form onSubmit={onSubmit}>
        <div className="update-exam">
          <div className="update-box">
            <h1>Update Exam</h1>
            <div className="update-my-inner-box">
              <label className="update-my-label">
                Select category:
                <select
                  name="fullId"
                  value={exam.fullId}
                  onChange={onChangeFullCategory}
                >
                  <option value={0}>Category</option>
                  {fullCategories.map(a => (
                    <option key={a.fullId} value={a.fullId}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {validationMessages.fullId && (
              <p className="UpdateExam-error-message">
                {validationMessages.fullId}
              </p>
            )}
            <div className="update-my-inner-box">
              <label className="update-my-label">
                Select exam:
                <select
                  name="categoryId"
                  value={exam.categoryId}
                  onChange={handleExamSelection}
                >
                  <option value={0}>Exam</option>
                  {examCategories
                    .filter(a => parseInt(a.fullId) === parseInt(exam.fullId))
                    .map(a => (
                      <option key={a.categoryId} value={a.categoryId}>
                        {a.categoryName}
                      </option>
                    ))}
                </select>
              </label>
            </div>
            {validationMessages.categoryId && (
              <p className="UpdateExam-error-message">
                {validationMessages.categoryId}
              </p>
            )}
            <div className="update-my-inner-box">
              <label className="update-my-label">
                Question text:
                <input
                  type="text"
                  className="fadeIn second"
                  name="questionText"
                  placeholder="question text"
                  value={exam.questionText}
                  onChange={onChange}
                />
              </label>
            </div>
            {validationMessages.questionText && (
              <p className="UpdateExam-error-message">
                {validationMessages.questionText}
              </p>
            )}
            <div className="update-my-inner-box">
              <label className="update-my-label">
                Upload foto for code snipped (Less than 10mb):
                <label htmlFor="file-upload" className="custom-file-upload">
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
              <p className="UpdateExam-error-message">
                {validationMessages.imageUrl}
              </p>
            )}
            <div className="update-my-inner-box">
              <label className="update-my-label">
                First question:
                <input
                  type="text"
                  name="option1"
                  placeholder="first question"
                  value={exam.option1}
                  onChange={onChange}
                />
                <select
                  name="isCorrect1"
                  value={exam.isCorrect1}
                  onChange={onChange}
                >
                  <option value={false}>Wrong</option>
                  <option value={true}>Correct</option>
                </select>
              </label>
            </div>
            {validationMessages.option1 && (
              <p className="UpdateExam-error-message">
                {validationMessages.option1}
              </p>
            )}
            <div className="update-my-inner-box">
              <label className="update-my-label">
                Second question:
                <input
                  type="text"
                  className="fadeIn third"
                  name="option2"
                  placeholder="second question"
                  value={exam.option2}
                  onChange={onChange}
                />
                <select
                  name="isCorrect2"
                  value={exam.isCorrect2}
                  onChange={onChange}
                >
                  <option value={false}>Wrong</option>
                  <option value={true}>Correct</option>
                </select>
              </label>
            </div>
            {validationMessages.option2 && (
              <p className="UpdateExam-error-message">
                {validationMessages.option2}
              </p>
            )}
            <div className="update-my-inner-box">
              <label className="update-my-label">
                Third question:
                <input
                  type="text"
                  className="fadeIn third"
                  name="option3"
                  placeholder="third question"
                  value={exam.option3}
                  onChange={onChange}
                />
                <select
                  name="isCorrect3"
                  value={exam.isCorrect3}
                  onChange={onChange}
                >
                  <option value={false}>Wrong</option>
                  <option value={true}>Correct</option>
                </select>
              </label>
            </div>
            {validationMessages.option3 && (
              <p className="UpdateExam-error-message">
                {validationMessages.option3}
              </p>
            )}
            <div className="update-my-inner-box">
              <label className="update-my-label">
                Fourth question:
                <input
                  type="text"
                  className="fadeIn third"
                  name="option4"
                  placeholder="fourth question"
                  value={exam.option4}
                  onChange={onChange}
                />
                <select
                  name="isCorrect4"
                  value={exam.isCorrect4}
                  onChange={onChange}
                >
                  <option value={false}>Wrong</option>
                  <option value={true}>Correct</option>
                </select>
              </label>
            </div>
            {validationMessages.option4 && (
              <p className="UpdateExam-error-message">
                {validationMessages.option4}
              </p>
            )}
            <div className="update-my-inner-box">
              <button type="submit" className="fadeIn fourth" value="submit">
                Update
              </button>
            </div>
            <div className="update-my-label">{check && <p>{message}</p>}</div>
          </div>
        </div>
      </form>
      <Footer color={"var(--color4)"} />
    </div>
  );
}

export default UpdateExam;
