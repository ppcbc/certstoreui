import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import http from "../data/http";
import "../css/ScheduleExam.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setId, setLogReg, setRole, setToken } from "../features/loginSlice";

function AddExam() {
  let navigate = useNavigate();
  const [newExam, setNewExam] = useState({
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
    isCorrect4: true
  });
  const [examCategories, setExamCategories] = useState([]);
  const [fullCategories, setFullCategories] = useState([]);
  const [fullCategoryId, setFullCategoryId] = useState(1);

  const myToken = useSelector(state => state.token.value.tok);
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
    setNewExam(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  }
  function onChangeFullCategory(e) {
    setFullCategoryId(e.target.value);
  }

  return (
    <form
      action=""
      onSubmit={() => {
        console.log("ff");
      }}
    >
      <div className="schedule-exam">
        <div className="schedule-box">
          <div className="my-box">
            <div className="my-inner-box">
              <label className="my-label">
                Select category:
                <select
                  name="id"
                  value={fullCategoryId}
                  onChange={onChangeFullCategory}
                >
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
                <select name="name">
                  {examCategories
                    .filter(
                      a => parseInt(a.fullId) === parseInt(fullCategoryId)
                    )
                    .map(a => (
                      <option key={a.categoryId} value={a.fullId}>
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
                Price:
                <input
                  type="text"
                  className="fadeIn second"
                  name="questionText"
                  placeholder="price"
                  value={newExam.questionText}
                  onChange={onChange}
                />
              </label>
            </div>
            <div className="my-inner-box">
              <label className="my-label">
                Question photo link:
                <input
                  type="text"
                  class="fadeIn third"
                  name="questionPhotoLink"
                  placeholder="question photo link"
                  value={newExam.questionPhotoLink}
                  onChange={onChange}
                />
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
                <select name="isCorrect1">
                  <option value="false">Wrong</option>
                  <option value="true">Correct</option>
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
                <select name="isCorrect1">
                  <option value="false">Wrong</option>
                  <option value="true">Correct</option>
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
                <select name="isCorrect1">
                  <option value="false">Wrong</option>
                  <option value="true">Correct</option>
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
                <select name="isCorrect1">
                  <option value="false">Wrong</option>
                  <option value="true">Correct</option>
                </select>
              </label>
            </div>
          </div>
          <button type="submit" class="fadeIn fourth" value="Log In">
            Add
          </button>
          <div className="my-label"></div>
        </div>
      </div>
    </form>
  );
}

export default AddExam;
