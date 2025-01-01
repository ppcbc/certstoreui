import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFullCategoryId } from "../features/loginSlice";
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
  const [added, setAdded] = useState("");
  const [error, setError] = useState("");
  const [check, setCheck] = useState(false);

  const myToken = useSelector(state => state.token.value.tok);
  const dispatch = useDispatch();

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 700);
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

    // Validation
    if (newCategory.fullId === 0) {
      setError("Please select a full category");
      return;
    }
    if (newCategory.categoryName === "") {
      setError("Please enter a category name");
      return;
    }
    if (newCategory.categoryDescription === "") {
      setError("Please enter a category description");
      return;
    }

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
        setError("");
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

  return (
    <div className="add-exam-category-main">
      <form action="" onSubmit={onSubmit}>
        <div className="add-exam-category">
          <div className="add-exam-box">
            <h1>Add Exam Category</h1>
            <div>
              <div className="add-my-inner-box">
                <label className="add-exam-label">
                  Select category:
                  <select
                    name="fullId"
                    className="fadeIn third"
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

              <div className="add-my-inner-box">
                <label className="add-exam-label">
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
              <div className="add-my-inner-box">
                <label className="add-exam-label">
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
            </div>
            <div className="add-my-inner-box">
              <button type="submit" className="fadeIn fourth">
                Add
              </button>
            </div>
            {error && (
              <div className="add-exam-label">
                <p style={{ color: "red" }}>{error}</p>
              </div>
            )}
            <div className="add-exam-label">{check && <p>{added}</p>}</div>
          </div>
        </div>
      </form>
      <Footer color={"var(--color7)"} />
    </div>
  );
}

export default AddExamCategory;
