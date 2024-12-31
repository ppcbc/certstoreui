import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import http from "../data/http";
import "../css/AddExam.css";
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
  const [certExam, setCertExam] = useState({
    fullId: "",
    categoryId: "",
    testTitle: "",
    testDescription: "",
    price: "",
    examQuestions: []
  });
  const [examCategories, setExamCategories] = useState([]);
  const [fullCategories, setFullCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState(false);

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 700);
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

  async function onSubmit(e) {
    e.preventDefault();
    console.log(certExam);
    console.log(examCategories);
    try {
      var response = await axios.post(http + "api/CertExams", certExam, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      console.log(response.status);
      if (response.status === 201 || response.status === 200) {
        setCertExam({
          fullId: "",
          categoryId: "",
          testTitle: "",
          testDescription: "",
          price: "",
          examQuestions: []
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

  return (
    <form action="" onSubmit={onSubmit}>
      <div className="add-exam">
        <div className="add-box">
          <h1>Add Certification Exam</h1>
          <div className="add-my-box">
            <div className="add-my-inner-box">
              <label className="add-my-label">
                Certification title:
                <input
                  type="text"
                  className="fadeIn second"
                  name="questionText"
                  placeholder="Certification Title"
                  value={certExam.testTitle}
                  onChange={onChange}
                />
              </label>
            </div>
            <div className="add-my-inner-box">
              <label className="add-my-label">
                Certification description:
                <input
                  type="text"
                  className="fadeIn second"
                  name="questionText"
                  placeholder="Certification Description"
                  value={certExam.testDescription}
                  onChange={onChange}
                />
              </label>
            </div>
            <div className="add-my-inner-box">
              <label className="add-my-label">
                Certification Price:
                <input
                  type="number"
                  className="fadeIn second"
                  name="price"
                  placeholder="Price"
                  value={certExam.price}
                  onChange={onChange}
                />
              </label>
            </div>
            <div className="add-my-inner-box">
              <label className="add-my-label">
                Select category:
                <select
                  name="fullId"
                  value={certExam.fullId}
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
            <div className="add-my-inner-box">
              <label className="add-my-label">
                Select exam:
                <select
                  name="categoryId"
                  value={examCategories.categoryId}
                  onChange={onChange}
                >
                  <option value={0}>Exam</option>
                  {examCategories
                    .filter(
                      a => parseInt(a.fullId) === parseInt(certExam.fullId)
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
              <label className="add-my-label">First question:</label>
            </div>
          </div>
          <div className="add-my-inner-box">
            <button type="submit" class="fadeIn fourth" value="submit">
              Add
            </button>
          </div>
          <div className="add-my-label">{check && <p>{message}</p>}</div>
        </div>
      </div>
    </form>
  );
}

export default AddExam;
