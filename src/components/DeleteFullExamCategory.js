import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import http from "../data/http";
import "../css/DeleteFullExamCategory.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";

function DeleteFullExamCategory() {
  let navigate = useNavigate();
  const [fullCategories, setFullCategories] = useState([]);
  const [selectedFullCategory, setSelectedFullCategory] = useState("");
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState(false);
  const [errors, setErrors] = useState({});

  const myToken = useSelector(state => state.token.value.tok);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchFullCategories();
  }, []);

  async function fetchFullCategories() {
    try {
      const response = await axios.get(http + "api/FullCategories", {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      console.log("Fetched full categories:", response.data);
      setFullCategories(response.data);
    } catch (error) {
      console.log("Error fetching full categories:", error.message);
    }
  }

  async function deleteExamsInFullCategory(fullCategoryId) {
    try {
      const responseCategories = await axios.get(http + `api/ExamCategories`, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      const categories = responseCategories.data.filter(
        item => item.fullCategoryId == fullCategoryId
      );
      console.log(fullCategoryId);

      for (const category of categories) {
        const responseExams = await axios.get(http + `api/Exams`, {
          headers: {
            Authorization: "Bearer " + myToken
          }
        });
        const exams = responseExams.data.filter(
          item => item.categoryId == category.categoryId
        );

        for (const exam of exams) {
          await axios.delete(http + `api/Exams/${exam.examId}`, {
            headers: {
              Authorization: "Bearer " + myToken
            }
          });
        }

        await axios.delete(http + `api/ExamCategories/${category.categoryId}`, {
          headers: {
            Authorization: "Bearer " + myToken
          }
        });
      }
      console.log(
        `Deleted all exams and categories in full category ${fullCategoryId}`
      );
    } catch (error) {
      console.log("Error deleting exams or categories:", error.message);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    try {
      await deleteExamsInFullCategory(selectedFullCategory);

      var response = await axios.delete(
        http + `api/FullCategories/${selectedFullCategory}`,
        {
          headers: {
            Authorization: "Bearer " + myToken
          }
        }
      );

      if (response.status === 204 || response.status === 200) {
        setMessage(
          "Full category and associated categories and exams successfully deleted"
        );
        handleMessage();
        setSelectedFullCategory("");
        fetchFullCategories();
      }
    } catch (error) {
      setMessage(
        "Error deleting the full category and associated items, please try again"
      );
      handleMessage();
      console.log(error.message);
      setErrors({});
    }
  }

  function validate() {
    let tempErrors = {};
    if (!selectedFullCategory)
      tempErrors.selectedFullCategory = "Please select a full category";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  function onChange(e) {
    setSelectedFullCategory(e.target.value);
  }

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 700);
  }

  return (
    <div className="delete-full-exam-category-main">
      <form action="" onSubmit={onSubmit}>
        <div className="delete-full-exam-category">
          <div className="delete-box-FullExCate">
            <h1>Delete Full Exam Category</h1>
            <div className="delete-my-inner-box-FullExCate">
              <label className="delete-my-label-FullExCate">
                Select Full Category:
                <select
                  className="fadeIn second"
                  name="fullCategory"
                  value={selectedFullCategory}
                  onChange={onChange}
                >
                  <option value="">Select a full category</option>
                  {fullCategories.map(category => (
                    <option key={category.fullId} value={category.fullId}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {errors.selectedFullCategory && (
              <p className="DeleteFullExamCategory-error-message">
                {errors.selectedFullCategory}
              </p>
            )}
            <div className="delete-my-inner-box-FullExCate">
              <button type="submit" className="fadeIn fourth" value="submit">
                Delete
              </button>
            </div>
            <div className="delete-my-label-FullExCate">
              {check && <p>{message}</p>}
            </div>
          </div>
        </div>
      </form>
      <Footer color={"var(--color4)"} />
    </div>
  );
}

export default DeleteFullExamCategory;
