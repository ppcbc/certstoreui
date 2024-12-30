import { useEffect, useState, useCallback } from "react";
import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFullCategoryId } from "../features/loginSlice";
//import "../css/AddExamCategory.css";
import "../css/UpdateExamCategory.css";
import http from "../data/http";

function UpdateExamCategory() {
  const [categoryToUpdate, setCategoryToUpdate] = useState({
    fullId: 0,
    categoryId: 0,
    categoryName: "",
    categoryDescription: ""
    //price: ""
  });
  const [fullCategories, setFullCategories] = useState([]);
  const [examCategories, setExamCategories] = useState([]);
  const [message, setMessage] = useState("");
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
  // Use -> !!useCallback!!
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
      categoryId: 0, // Reset categoryId when changing full category
      categoryName: "",
      categoryDescription: ""
      //price: ""
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

  const onSubmit = async e => {
    e.preventDefault();

    // Validation
    if (categoryToUpdate.fullId === 0) {
      setError("Please select a full category");
      return;
    }
    if (categoryToUpdate.categoryId === 0) {
      setError("Please select an exam category");
      return;
    }
    if (categoryToUpdate.categoryName === "") {
      setError("Please enter a category name");
      return;
    }
    // if (categoryToUpdate.price === "") {
    //     setError("Please enter a price");
    //     return;
    // }

    console.log("Submitted category:", categoryToUpdate);
    try {
      const response = await axios.put(
        `${http}api/ExamCategories/${categoryToUpdate.categoryId}`, // Use categoryId for the PUT request
        categoryToUpdate,
        {
          headers: {
            Authorization: "Bearer " + myToken
          }
        }
      );
      console.log("Update response status:", response.status); // !!Responce status 200 or 204!!
      if (response.status === 200 || response.status === 204) {
        setMessage("Category updated successfully");
        handleMessage();
        setError("");
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
                </div>
                {/* <div className="update-inner-field">
                                    <label className="update-label">
                                        Price:
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            className="fadeIn third number"
                                            name="price"
                                            placeholder="Price"
                                            value={categoryToUpdate.price}
                                            onChange={onChange}
                                        />
                                    </label>
                                </div> */}
              </>
            )}
          </div>
          <button type="submit" className="fadeIn fourth">
            Update Exam Category
          </button>
          {error && (
            <div className="update-label">
              <p style={{ color: "red" }}>{error}</p>
            </div>
          )}
          <div className="update-label">{check && <p>{message}</p>}</div>
        </div>
      </div>
    </form>
  );
}

export default UpdateExamCategory;
