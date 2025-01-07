import { useEffect, useState, useCallback } from "react";
import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/UpdateFullExamCategory.css";
import http from "../data/http";
import Footer from "./Footer";

function UpdateFullExamCategory() {
  const [categoryToUpdate, setCategoryToUpdate] = useState({
    fullId: 0,
    categoryId: 0,
    categoryName: "",
    categoryDescription: ""
  });
  const [fullCategories, setFullCategories] = useState([]);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [check, setCheck] = useState(false);

  const myToken = useSelector(state => state.token.value.tok);
  const dispatch = useDispatch();

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1400);
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

  useEffect(() => {
    getFullCategories();
  }, [getFullCategories]);

  const fetchCategoryData = async id => {
    try {
      const response = await axios.get(`${http}api/FullCategories/${id}`, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      setCategoryToUpdate({
        fullId: response.data.fullId || 0,
        categoryId: response.data.categoryId || 0,
        categoryName: response.data.name || "",
        categoryDescription: response.data.description || ""
      });
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

  const onChangeFullCategory = async e => {
    const { value } = e.target;
    await fetchCategoryData(value); // Φέρνουμε τα δεδομένα της κατηγορίας και περιμένουμε να ολοκληρωθεί
    setCategoryToUpdate(prev => ({
      ...prev,
      fullId: parseInt(value),
      categoryId: 0 // Reset categoryId when changing full category
    }));
    // dispatch(setFullCategoryId(value));
    console.log("Selected full category:", value);
  };

  const onSubmit = async e => {
    e.preventDefault();

    // Validation
    if (categoryToUpdate.fullId === 0) {
      setError("Please select a full category");
      return;
    }
    if (categoryToUpdate.categoryName === "") {
      setError("Please enter a category name");
      return;
    }

    const dataToSend = {
      fullId: categoryToUpdate.fullId,
      name: categoryToUpdate.categoryName,
      description: categoryToUpdate.categoryDescription
    };

    console.log("Submitted category:", JSON.stringify(dataToSend, null, 2));
    try {
      const response = await axios.put(
        `${http}api/FullCategories/${categoryToUpdate.fullId}`,
        dataToSend,
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
        setError("");
      } else {
        setMessage("Failed to update category");
      }
      console.log("Update response data:", response.data);
    } catch (error) {
      console.error("Error updating category:", error.message);
      console.error("Request data:", dataToSend);
      setMessage("Failed to update category");
    }
  };

  return (
    <div className="update-full-exam-main">
      <form onSubmit={onSubmit}>
        <div className="update-full-exam-category">
          <div className="update-full-exam-box">
            <h1>Update Module</h1>
            <div className="update-full-exam-inner-box">
              <div className="update-full-exam-inner-field">
                <label className="update-full-exam-label">
                  Select Module:
                  <select
                    name="fullId"
                    value={categoryToUpdate.fullId}
                    onChange={onChangeFullCategory}
                  >
                    <option value={0}>Modules</option>
                    {fullCategories.map(a => (
                      <option key={a.fullId} value={a.fullId}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {error && !categoryToUpdate.fullId && (
                <p className="update-full-exam-error-message">{error}</p>
              )}
              {categoryToUpdate.fullId !== 0 && (
                <>
                  <div className="update-full-exam-inner-field">
                    <label className="update-full-exam-label">
                      Module Name:
                      <input
                        type="text"
                        className="fadeIn second"
                        name="categoryName"
                        placeholder="Full category name"
                        value={categoryToUpdate.categoryName || ""}
                        onChange={onChange}
                      />
                    </label>
                  </div>
                  {error && !categoryToUpdate.categoryName && (
                    <p className="update-full-exam-error-message">{error}</p>
                  )}
                  <div className="update-full-exam-inner-field">
                    <label className="update-full-exam-label">
                      Module Description:
                      <textarea
                        className="fadeIn second"
                        name="categoryDescription"
                        placeholder="Full category description"
                        value={categoryToUpdate.categoryDescription || ""}
                        onChange={onChange}
                        rows="5"
                      />
                    </label>
                  </div>
                  {error && !categoryToUpdate.categoryDescription && (
                    <p className="update-full-exam-error-message">{error}</p>
                  )}
                </>
              )}
            </div>

            <button type="submit" className="fadeIn fourth">
              Update
            </button>

            <button
              type="cancel"
              className="fadeIn fourth"
              onClick={() => navigate("/adminpanel")}
            >
              Cancel
            </button>

            <div className="update-full-exam-laybel">
              {check && <p>{message}</p>}
            </div>
          </div>
        </div>
      </form>
      <Footer color={"var(--color4)"} />
    </div>
  );
}

export default UpdateFullExamCategory;
