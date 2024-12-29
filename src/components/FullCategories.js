import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/FullCategories.css";

const FullCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/fullcategories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("/api/fullcategories", newCategory);
      fetchCategories();
      setNewCategory({ name: "", description: "" });
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="fullcategories">
      <h1>Full Categories</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newCategory.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="description"
          value={newCategory.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <button type="submit">Add Category</button>
      </form>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FullCategories;
