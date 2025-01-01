import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import http from "../data/http";
import "../css/CertExam.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setFullCategoryId,
  setId,
  setLogReg,
  setRole,
  setToken
} from "../features/loginSlice";
import SelectExamAndQuestions from "./SelectExamAndQuestions";

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

  async function onSubmit(e) {
    e.preventDefault();

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
    <form onSubmit={onSubmit} action="submit">
      <div className="certexam">
        <div className="certexam-box">
          <h1>Add Certification Exam</h1>
          <div className="certexam-my-inner-box">
            <label className="certexam-my-label">
              Certification Title:
              <input
                type="text"
                name="testTitle"
                placeholder="Certification Title"
                value={certExam.testTitle}
                onChange={onChange}
              />
            </label>
          </div>
          <div className="certexam-my-inner-box">
            <label className="certexam-my-label">
              Certification Description:
              <input
                type="text"
                name="testDescription"
                placeholder="Certification Description"
                value={certExam.testDescription}
                onChange={onChange}
              />
            </label>
          </div>
          <div className="certexam-my-inner-box">
            <label className="certexam-my-label">
              Certification Price:
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={certExam.price}
                onChange={onChange}
              />
            </label>
          </div>
          <div className="certexam-my-inner-box">
            <label className="certexam-my-label">
              Select Category:
              <select name="fullId" value={certExam.fullId} onChange={onChange}>
                <option value="">Category</option>
                {fullCategories.map(a => (
                  <option key={a.fullId} value={a.fullId}>
                    {a.name}
                  </option>
                ))}
              </select>
            </label>
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

          <div className="certexam-my-inner-box">
            <button type="submit" className="fadeIn fourth">
              Add
            </button>
          </div>
          <div className="certexam-my-label">{check && <p>{message}</p>}</div>
        </div>
      </div>
    </form>
  );
}

export default CertExam;
