import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../css/FullCategories.css";
import http from "../data/http";
import Footer from "./Footer";

function FullCategory() {
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: ""
  });
  const navigate = useNavigate();
  const [added, setAdded] = useState("");
  const [error, setError] = useState({
    name: "",
    description: ""
  });
  const [check, setCheck] = useState(false);

  const myToken = useSelector(state => state.token.value.tok);

  function handleMessage() {
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 1400);
  }

  const onChange = e => {
    const { name, value } = e.target;
    setNewCategory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = async e => {
    e.preventDefault();

    // Validation

    if (newCategory.name === "") {
      setError(() => {
        return {
          name: "Please enter a category name",
          description: ""
        };
      });
      return;
    }
    if (newCategory.description === "") {
      setError(() => {
        return {
          description: "Please enter a category description",
          name: ""
        };
      });
      return;
    }

    console.log(newCategory);
    try {
      const response = await axios.post(
        http + "api/FullCategories",
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
          name: "",
          description: ""
        });
        setAdded("Category added successfully");
        handleMessage();
        setError("");
      }
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
      setNewCategory({
        name: "",
        description: ""
      });
      setAdded("Wrong credentials try again");
      handleMessage();
    }
  };

  return (
    <div className="fullcategory-main">
      <form action="" onSubmit={onSubmit}>
        <div className="fullcategory-category">
          <div className="fullcategory-box">
            <h1>Create Module</h1>

            <div className="fullcategory-inner-box">
              <label className="fullcategory-label">
                Module name:
                <input
                  type="text"
                  className="fadeIn second"
                  name="name"
                  placeholder="Module name"
                  value={newCategory.name}
                  onChange={onChange}
                />
              </label>
            </div>
            {error.name && (
              <div className="fullcategory-label-error">
                <p style={{ color: "red" }}>{error.name}</p>
              </div>
            )}
            <div className="fullcategory-inner-box">
              <label className="fullcategory-label">
                Module description:
                <textarea
                  className="fadeIn second"
                  name="description"
                  placeholder="Module description"
                  value={newCategory.description}
                  onChange={onChange}
                />
              </label>
            </div>
            {error.description && (
              <div className="fullcategory-label-error">
                <p style={{ color: "red" }}>{error.description}</p>
              </div>
            )}

            <div className="fullcategory-inner-box">
              <button type="submit" className="fadeIn fourth">
                Create
              </button>
            </div>
            <div className="fullcategory-inner-box">
              <button
                type="cancel"
                className="fadeIn fourth"
                onClick={() => navigate("/adminpanel")}
              >
                Cancel
              </button>
            </div>

            <div className="fullcategory-label">{check && <p>{added}</p>}</div>
          </div>
        </div>
      </form>
      <Footer color={"var(--color4)"} />
    </div>
  );
}

export default FullCategory;
