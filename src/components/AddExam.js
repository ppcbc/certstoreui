import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import http from "../data/http";
import "../css/ScheduleExam.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setFullCategoryId,
  setId,
  setLogReg,
  setRole,
  setToken
} from "../features/loginSlice";

function AddExam() {
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

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 2000);
  }

  const [imageUrl, setImageUrl] = useState("");

  const preset_key = "112898813666492";
  const precet = "certphoto";
  const api_secret = "WiNm8fism4GXfgYe0k8nME36EeY";

  const myToken = useSelector(state => state.token.value.tok);
  const fullCategoryId = useSelector(state => state.token.value.fullCategoryId);
  // const myToken = localStorage.getItem("tok");
  // const fullCategoryId = localStorage.getItem("fullCategoryId");
  const dispatch = useDispatch();

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

      setExamCategories(response.data);
      setFullCategories(res.data);
      console.log(response.data);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
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
        // fullId: fullCategoryId,
        questionPhotoLink: imageUrl
      };
    });
  }
  function onChangeFullCategory(e) {
    // dispatch(setFullCategoryId(e.target.value));
    const { value } = e.target;
  }
  async function onSubmit(e) {
    e.preventDefault();
    console.log(newExam);
    console.log(examCategories);
    try {
      var response = await axios.post(http + "api/Exams", newExam, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      console.log(response.status);
      if (response.status === 201 || response.status === 200) {
        setNewExam({
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

  return (
    <form action="" onSubmit={onSubmit}>
      <div className="schedule-exam">
        <div className="schedule-box">
          <div className="my-box">
            <div className="my-inner-box">
              <label className="my-label">
                Select category:
                <select
                  name="fullId"
                  value={newExam.fullId}
                  onChange={onChange}
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
            <div className="my-inner-box">
              <label className="my-label">
                Select exam:
                <select
                  name="categoryId"
                  value={examCategories.categoryId}
                  onChange={onChange}
                >
                  <option value={0}>Exam</option>
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
            <div className="my-inner-box">
              <label className="my-label">
                Question Text:
                <input
                  type="text"
                  className="fadeIn second"
                  name="questionText"
                  placeholder="question text"
                  value={newExam.questionText}
                  onChange={onChange}
                />
              </label>
            </div>
            <div className="my-inner-box">
              <label className="my-label">
                Question photo link:
                <input type="file" name="image" onChange={handleFile}></input>
              </label>
            </div>
            <div className="my-inner-box">
              <label className="my-label">
                First question:
                <input
                  type="text"
                  class="fadeIn third"
                  name="option1"
                  placeholder="first question"
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
            <div className="my-inner-box">
              <label className="my-label">
                Second question:
                <input
                  type="text"
                  class="fadeIn third"
                  name="option2"
                  placeholder="second question"
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
            <div className="my-inner-box">
              <label className="my-label">
                Third question:
                <input
                  type="text"
                  class="fadeIn third"
                  name="option3"
                  placeholder="third question"
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
            <div className="my-inner-box">
              <label className="my-label">
                Fourth question:
                <input
                  type="text"
                  class="fadeIn third"
                  name="option4"
                  placeholder="fourth question"
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
          </div>
          <button type="submit" class="fadeIn fourth" value="Log In">
            Add
          </button>
          <div className="my-label">{check && <p>{message}</p>}</div>
        </div>
      </div>
    </form>
  );
}

export default AddExam;
