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
    <form onSubmit={onSubmit}>
      <div className="add-exam-category">
        <div className="add-exam-box">
          <div className="add-exam-inner-box">
            <div className="add-exam-field">
              <label className="add-exam-label">
                Select Full Category:
                <select
                  name="fullId"
                  value={newCategory.fullId}
                  onChange={onChangeFullCategory}
                >
                  <option value={0}>Categories</option>
                  {fullCategories.map(a => (
                    <option key={a.fullId} value={a.fullId}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="add-exam-field">
              <label className="add-exam-label">
                Exam Category Name:
                <input
                  type="text"
                  name="categoryName"
                  placeholder="Exam Category Name"
                  value={newCategory.categoryName}
                  onChange={onChange}
                />
              </label>
            </div>
            <div className="add-exam-field">
              <label className="add-exam-label">
                Exam Category Description:
                <input
                  type="text"
                  name="categoryDescription"
                  placeholder="Exam Category Description"
                  value={newCategory.categoryDescription}
                  onChange={onChange}
                />
              </label>
            </div>
            {/*}
            <div className="add-exam-field">
              <label className="add-exam-label">
                Price:
                <input
                  type="number"
                  inputMode="numeric"
                  name="price"
                  placeholder="Price"
                  value={newCategory.price}
                  onChange={onChange}
                />
              </label>
            </div>
            */}
          </div>
          <button type="submit" className="submit-btn">
            Add Exam Category
          </button>
          {error && (
            <div className="add-exam-label">
              <p style={{ color: "red" }}>{error}</p>
            </div>
          )}
          <div className="add-exam-label">{check && <p>{added}</p>}</div>
        </div>
      </div>
    </form>
  );
}

export default AddExamCategory;
