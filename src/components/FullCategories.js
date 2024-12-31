import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/FullCategories.css";
import http from "../data/http";

function FullCategories() {
    const [newCategory, setNewCategory] = useState({
        name: "",
        description: ""
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
            const response = await fetch(http + "api/FullCategories", {
                headers: {
                    Authorization: "Bearer " + myToken
                }
            });
            const data = await response.json();
            setFullCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

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
            setError("Please enter a category name");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }
        if (newCategory.description === "") {
            setError("Please enter a category description");
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        }

        if (!window.confirm("Are you sure you want to add this category?")) {
            return;
        }

        try {
            const response = await fetch(http + "api/FullCategories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + myToken
                },
                body: JSON.stringify(newCategory)
            });
            if (response.status === 201 || response.status === 200) {
                setNewCategory({
                    name: "",
                    description: ""
                });
                setAdded("Category added successfully");
                handleMessage();
                setError("");
                getFullCategories();
            }
        } catch (error) {
            console.error('Error adding category:', error);
            setAdded("Error adding category. Please try again.");
            handleMessage();
        }
    };

    const onDelete = async categoryId => {
        if (!window.confirm("Are you sure you want to delete this category?")) {
            return;
        }

        try {
            const response = await fetch(http + `api/FullCategories/${categoryId}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + myToken
                }
            });
            if (response.status === 204) {
                setAdded("Category deleted successfully");
                handleMessage();
                getFullCategories();
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            setAdded("Error deleting category. Please try again.");
            handleMessage();
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="fullcategories">
                <div className="fullcategories-box">
                    <div className="fullcategories-inner-box">
                        <div className="fullcategories-field">
                            <label className="fullcategories-label">
                                Category Name:
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Category Name"
                                    value={newCategory.name}
                                    onChange={onChange}
                                />
                            </label>
                        </div>
                        <div className="fullcategories-field">
                            <label className="fullcategories-label">
                                Category Description:
                                <input
                                    type="text"
                                    name="description"
                                    placeholder="Category Description"
                                    value={newCategory.description}
                                    onChange={onChange}
                                />
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="submit-btn">
                        Add Category
                    </button>
                    {error && (
                        <div className="fullcategories-label">
                            <p style={{ color: "red" }}>{error}</p>
                        </div>
                    )}
                    <div className="fullcategories-label">{check && <p>{added}</p>}</div>
                </div>
                <ul>
                    {fullCategories.map((category) => (
                        <li key={category.fullId}>
                            <h2>{category.name}</h2>
                            <p>{category.description}</p>
                            <button onClick={() => onDelete(category.fullId)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </form>
    );
}

export default FullCategories;

