import { useEffect, useState, useCallback } from "react";
import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFullCategoryId } from "../features/loginSlice";
import "../css/UpdateExamCategory.css";
import http from "../data/http";

function UpdateExamCategory() {
  const [categoryToUpdate, setCategoryToUpdate] = useState({
    fullId: 0,
    categoryId: 0,
    categoryName: "",
    categoryDescription: ""
  });
  const [fullCategories, setFullCategories] = useState([]);
  const [examCategories, setExamCategories] = useState([]);
  const [message, setMessage] = useState("");
  // const [error, setError] = useState("");
  const [validationMessages, setValidationMessages] = useState({});
  const [check, setCheck] = useState(false);

  const myToken = useSelector(state => state.token.value.tok);
  const dispatch = useDispatch();

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 700);
  }

  const getFullCategories = useCallback(async () => {
    try {
      const res = await axios.get(http + "api/FullCategories", {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      setFullCategories(res.data);
      console.log("Full categories:", res.data);
    } catch (error) {
      console.error("Error fetching full categories:", error.message);
    }
  }, [myToken]);

  const getExamCategories = useCallback(async () => {
    try {
      const res = await axios.get(http + "api/ExamCategories", {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      setExamCategories(res.data);
      console.log("Exam categories:", res.data);
    } catch (error) {
      console.error("Error fetching exam categories:", error.message);
    }
  }, [myToken]);

  useEffect(() => {
    getFullCategories();
    getExamCategories();
  }, [getFullCategories, getExamCategories]);

  const fetchCategoryData = async id => {
    try {
      const response = await axios.get(`${http}api/ExamCategories/${id}`, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      setCategoryToUpdate(response.data);
      console.log("Category to update:", response.data);
    } catch (error) {
      console.error("Error fetching category data:", error.message);
    }
  };

  const onChange = e => {
    const { name, value } = e.target;
    setCategoryToUpdate(prev => ({
      ...prev,
      [name]: value
    }));
    console.log("Updated categoryToUpdate:", { [name]: value });
  };

  const onChangeFullCategory = e => {
    const { value } = e.target;
    setCategoryToUpdate(prev => ({
      ...prev,
      fullId: parseInt(value),
      categoryId: 0,
      categoryName: "",
      categoryDescription: ""
    }));
    dispatch(setFullCategoryId(value));
    console.log("Selected full category:", value);
  };

  const onChangeExamCategory = e => {
    const { value } = e.target;
    setCategoryToUpdate(prev => ({
      ...prev,
      categoryId: parseInt(value)
    }));
    console.log("Selected exam category:", value);
    fetchCategoryData(value);
  };

  const validate = () => {
    let errors = {};
    if (categoryToUpdate.fullId === 0) {
      errors.fullId = "Please select a full category";
    }
    if (categoryToUpdate.categoryId === 0) {
      errors.categoryId = "Please select an exam category";
    }
    if (categoryToUpdate.categoryName === "") {
      errors.categoryName = "Please enter a category name";
    }
    if (categoryToUpdate.categoryDescription === "") {
      errors.categoryDescription = "Please enter a category description";
    }
    setValidationMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Submitted category:", categoryToUpdate);
    try {
      const response = await axios.put(
        `${http}api/ExamCategories/${categoryToUpdate.categoryId}`,
        categoryToUpdate,
        {
          headers: {
            Authorization: "Bearer " + myToken
          }
        }
      );
      console.log("Update response status:", response.status);
      if (response.status === 200 || response.status === 204) {
        setMessage("Category updated successfully");
        handleMessage();
        setValidationMessages({});
      } else {
        setMessage("Failed to update category");
      }
      console.log("Update response data:", response.data);
    } catch (error) {
      console.error("Error updating category:", error.message);
      setMessage("Failed to update category");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="update-exam">
        <div className="update-box">
          <h1>Update Exam Category</h1>
          <div className="update-inner-box">
            <div className="update-inner-field">
              <label className="update-label">
                Select Full Category:
                <select
                  name="fullId"
                  value={categoryToUpdate.fullId}
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
              {validationMessages.fullId && (
                <p className="UpdateExamCategory-error-message">{validationMessages.fullId}</p>
              )}
            </div>
            {examCategories.length > 0 && categoryToUpdate.fullId !== 0 && (
              <div className="update-inner-field">
                <label className="update-label">
                  Select Exam Category:
                  <select
                    name="categoryId"
                    value={categoryToUpdate.categoryId}
                    onChange={onChangeExamCategory}
                  >
                    <option value={0}>Select an exam category</option>
                    {examCategories
                      .filter(ec => ec.fullId === categoryToUpdate.fullId)
                      .map(a => (
                        <option key={a.categoryId} value={a.categoryId}>
                          {a.categoryName}
                        </option>
                      ))}
                  </select>
                </label>
                {validationMessages.categoryId && (
                  <p className="UpdateExamCategory-error-message">{validationMessages.categoryId}</p>
                )}
              </div>
            )}
            {categoryToUpdate.categoryId !== 0 && (
              <>
                <div className="update-inner-field">
                  <label className="update-label">
                    Exam Category Name:
                    <input
                      type="text"
                      className="fadeIn second"
                      name="categoryName"
                      placeholder="Exam Category Name"
                      value={categoryToUpdate.categoryName}
                      onChange={onChange}
                    />
                  </label>
                  {validationMessages.categoryName && (
                    <p className="UpdateExamCategory-error-message">{validationMessages.categoryName}</p>
                  )}
                </div>
                <div className="update-inner-field">
                  <label className="update-label">
                    Exam Category Description:
                    <input
                      type="text"
                      className="fadeIn second"
                      name="categoryDescription"
                      placeholder="Exam Category Description"
                      value={categoryToUpdate.categoryDescription}
                      onChange={onChange}
                    />
                  </label>
                  {validationMessages.categoryDescription && (
                    <p className="UpdateExamCategory-error-message">{validationMessages.categoryDescription}</p>
                  )}
                </div>
              </>
            )}
          </div>
          <button type="submit" className="fadeIn fourth">
            Update Exam Category
          </button>
          <div className="update-label">
            {check && <p>{message}</p>}
          </div>
        </div>
      </div>
    </form>
  );


}

export default UpdateExamCategory;
