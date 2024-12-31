import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFullCategoryId } from "../features/loginSlice";
import "../css/AddExamCategory.css";
import http from "../data/http";

function AddExamCategory() {
  const [newCategory, setNewCategory] = useState({
    fullId: 0,
    categoryName: "",
    categoryDescription: ""
  });
  const [fullCategories, setFullCategories] = useState([]);
  const [added, setAdded] = useState("");
  const [validationMessages, setValidationMessages] = useState({});
  const [check, setCheck] = useState(false);

  const myToken = useSelector(state => state.token.value.tok);
  const dispatch = useDispatch();

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
    dispatch(setFullCategoryId(value));
  };

  const onSubmit = async e => {
    e.preventDefault();
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
        });
        setAdded("Category added successfully");
        handleMessage();
        setValidationMessages({});
      }
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
      setNewCategory({
        fullId: 0,
        categoryName: "",
        categoryDescription: ""
      });
      setAdded("Wrong credentials try again");
      handleMessage();
    }
  };

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 700);
  }

  return (
    <form action="" onSubmit={onSubmit}>
      <div className="add-exam-category">
        <div className="add-box">
          <h1>Add Exam Category</h1>
          <div className="add-my-box">
            <div className="add-my-inner-box">
              <label className="add-my-label">
                Select category:
                <select
                  name="fullId"
                  value={newCategory.fullId}
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
              <p className="AddExamCategory-error-message">{validationMessages.fullId}</p>
            )}
            <div className="add-my-inner-box">
              <label className="add-my-label">
                Exam category name:
                <input
                  type="text"
                  className="fadeIn second"
                  name="categoryName"
                  placeholder="Exam category name"
                  value={newCategory.categoryName}
                  onChange={onChange}
                />
              </label>

            </div>
            {validationMessages.categoryName && (
              <p className="AddExamCategory-error-message">{validationMessages.categoryName}</p>
            )}
            <div className="add-my-inner-box">
              <label className="add-my-label">
                Exam category description:
                <input
                  type="text"
                  className="fadeIn second"
                  name="categoryDescription"
                  placeholder="Exam category description"
                  value={newCategory.categoryDescription}
                  onChange={onChange}
                />
              </label>

            </div>
            {validationMessages.categoryDescription && (
              <p className="AddExamCategory-error-message">{validationMessages.categoryDescription}</p>
            )}
          </div>
          <div className="add-my-inner-box">
            <button type="submit" className="fadeIn fourth" value="Log In">
              Add
            </button>
          </div>
          <div className="add-my-label">
            {check && <p>{added}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddExamCategory;
