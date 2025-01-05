import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import http from "../data/http";
import "../css/DeleteExamCategory.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";

function DeleteExamCategory() {
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [message, setMessage] = useState("");
  const [check, setCheck] = useState(false);
  const [errors, setErrors] = useState({});

  const myToken = useSelector(state => state.token.value.tok);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await axios.get(http + "api/ExamCategories", {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      console.log("Fetched categories:", response.data);
      setCategories(response.data);
      // fetchCategories();
    } catch (error) {
      console.log("Error fetching categories:", error.message);
    }
  }

  async function deleteExamsInCategory(categoryId) {
    try {
      const response = await axios.get(http + `api/Exams`, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });

      const exams = response.data;
      let selectedExams = exams.filter(item => item.categoryId == categoryId);
      console.log(categoryId);

      console.log(selectedExams);

      for (const exam of selectedExams) {
        await axios.delete(http + `api/Exams/${exam.examId}`, {
          headers: {
            Authorization: "Bearer " + myToken
          }
        });
      }
    } catch (error) {
      console.log("Error deleting exams:", error.message);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    try {
      // delete exams
      await deleteExamsInCategory(selectedCategory);

      var response = await axios.delete(
        http + `api/ExamCategories/${selectedCategory}`,
        {
          headers: {
            Authorization: "Bearer " + myToken
          }
        }
      );

      if (response.status === 204 || response.status === 200) {
        setMessage("Category and associated exams successfully deleted");
        handleMessage();
        setSelectedCategory("");
      }
    } catch (error) {
      setMessage("Error deleting the category and exams, please try again");
      handleMessage();
      console.log(error.message);
      setErrors({});
    }
  }

  function validate() {
    let tempErrors = {};
    if (!selectedCategory)
      tempErrors.selectedCategory = "Please select a category";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  function onChange(e) {
    setSelectedCategory(e.target.value);
  }

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1400);
  }

  return (
    <div className="delete-exam-category-main">
      <form action="" onSubmit={onSubmit}>
        <div className="delete-exam-category">
          <div className="delete-box-ExCate">
            <h1>Delete Question Category</h1>
            <div className="delete-my-inner-box-ExCate">
              <label className="delete-my-label-ExCate">
                Select Category:
                <select
                  className="fadeIn second"
                  name="category"
                  value={selectedCategory}
                  onChange={onChange}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {errors.selectedCategory && (
              <p className="DeleteExamCategory-error-message">
                {errors.selectedCategory}
              </p>
            )}
            <div className="delete-my-inner-box-ExCate">
              <button type="submit" className="fadeIn fourth" value="submit">
                Delete
              </button>
            </div>
            <div className="delete-my-inner-box-ExCate">
              <button
                type="cancel"
                className="fadeIn fourth"
                onClick={() => navigate("/adminpanel")}
              >
                Cancel
              </button>
            </div>
            <div className="delete-my-label-ExCate">
              {check && <p>{message}</p>}
            </div>
          </div>
        </div>
      </form>
      <Footer color={"var(--color4)"} />
    </div>
  );
}

export default DeleteExamCategory;
