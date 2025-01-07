import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../css/AddExamCategory.css";
import http from "../data/http";
import Footer from "./Footer";

function AddExamCategory() {
  const [newCategory, setNewCategory] = useState({
    fullId: 0,
    categoryName: "",
    categoryDescription: ""
    // price: ""
  });
  const [fullCategories, setFullCategories] = useState([]);
  const navigate = useNavigate();
  const [added, setAdded] = useState("");
  //const [error, setError] = useState("");
  const [validationMessages, setValidationMessages] = useState({});
  const [check, setCheck] = useState(false);

  const myToken = useSelector(state => state.token.value.tok);
  const dispatch = useDispatch();
  //time
  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1400);
  }

  useEffect(() => {
    getFullCategories();
  }, []);

  const getFullCategories = async () => {
    try {
      const res = await axios.get(http + "api/FullCategories", {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      setFullCategories(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const validate = () => {
    let errors = {};
    if (newCategory.fullId === 0) {
      errors.fullId = "Please select a full category";
    }
    if (newCategory.categoryName === "") {
      errors.categoryName = "Please enter a category name";
    }
    if (newCategory.categoryDescription === "") {
      errors.categoryDescription = "Please enter a category description";
    }
    setValidationMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const onChange = e => {
    const { name, value } = e.target;
    setNewCategory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onChangeFullCategory = e => {
    const { value } = e.target;
    setNewCategory(prev => ({
      ...prev,
      fullId: value
    }));
    // dispatch(setFullCategoryId(value));
  };

  const onSubmit = async e => {
    e.preventDefault();

    // Validation
    // if (newCategory.fullId === 0) {
    //   setError("Please select a full category");
    //   return;
    // }
    // if (newCategory.categoryName === "") {
    //   setError("Please enter a category name");
    //   return;
    // }
    // if (newCategory.categoryDescription === "") {
    //   setError("Please enter a category description");
    //   return;
    // }
    if (!validate()) return;

    console.log(newCategory);
    try {
      const response = await axios.post(
        http + "api/ExamCategories",
        newCategory,
        {
          headers: {
            Authorization: "Bearer " + myToken
          }
        }
      );
      console.log(response.status);
      if (response.status === 201 || response.status === 200) {
        setNewCategory({
          fullId: 0,
          categoryName: "",
          categoryDescription: ""
          // price: ""
        });
        setAdded("Category added successfully");
        handleMessage();
        //setError("");
        setValidationMessages({});
      }
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
      setNewCategory({
        fullId: 0,
        categoryName: "",
        categoryDescription: ""
        // price: ""
      });
      setAdded("Wrong credentials try again");
      handleMessage();
    }
  };

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1400);
  }

  return (
    <form action="" onSubmit={onSubmit}>
      <div className="add-exam-category-main">
        <div className="add-exam-category-box">
          <div className="add-exam-category">
            <div className="add-exam-box">
              <h1>Create Question Category</h1>
              <div>
                <div className="add-exam-inner-box">
                  <label className="add-exam-label">
                    Select Category:
                    <select
                      name="fullId"
                      value={newCategory.fullId}
                      onChange={onChangeFullCategory}
                    >
                      <option value={0}>Question category</option>
                      {fullCategories.map(a => (
                        <option key={a.fullId} value={a.fullId}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                {validationMessages.fullId && (
                  <p className="AddExamCategory-error-message">
                    {validationMessages.fullId}
                  </p>
                )}
                <div className="add-exam-inner-box">
                  <label className="add-exam-label">
                    Category Name:
                    <input
                      type="text"
                      className="fadeIn second"
                      name="categoryName"
                      placeholder="Question category name"
                      value={newCategory.categoryName}
                      onChange={onChange}
                    />
                  </label>
                </div>
                {validationMessages.categoryName && (
                  <p className="AddExamCategory-error-message">
                    {validationMessages.categoryName}
                  </p>
                )}
                <div className="add-exam-inner-box">
                  <label className="add-exam-label">
                    Category Description:
                    <textarea
                      className="fadeIn second"
                      name="categoryDescription"
                      placeholder="Question category description"
                      value={newCategory.categoryDescription}
                      onChange={onChange}
                    />
                  </label>
                </div>
                {validationMessages.categoryDescription && (
                  <p className="AddExamCategory-error-message">
                    {validationMessages.categoryDescription}
                  </p>
                )}
              </div>
              <div className="add-exam-inner-box">
                <button type="submit" className="fadeIn fourth" value="log in">
                  Create
                </button>
              </div>
              <div className="add-exam-inner-box">
                <button
                  type="cancel"
                  className="fadeIn fourth"
                  onClick={() => navigate("/adminpanel")}
                >
                  Cancel
                </button>
              </div>
              {/* {error && (
                <div className="add-exam-label">
                  <p style={{ color: "red" }}>{error}</p>
                </div>
              )} */}

              <div className="add-exam-label">{check && <p>{added}</p>}</div>
            </div>
          </div>

          <Footer color={"var(--color4)"} />
        </div>
      </div>
    </form>
  );
}

export default AddExamCategory;
