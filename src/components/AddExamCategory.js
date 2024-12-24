import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "../css/ScheduleExam.css";
import { useDispatch, useSelector } from "react-redux";
import { setFullCategoryId } from "../features/loginSlice";
import http from "../data/http";

function AddExamCategory() {
    const [newCategory, setNewCategory] = useState({
        fullId: 0,
        categoryName: ""
    });
    const [fullCategories, setFullCategories] = useState([]);

    const myToken = useSelector(state => state.token.value.tok);
    const dispatch = useDispatch();

    useEffect(() => {
        getFullCategories();
    }, [myToken]);

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
        dispatch(setFullCategoryId(e.target.value));
    };

    const onSubmit = async e => {
        e.preventDefault();
        console.log(newCategory);
        try {
            const response = await axios.post(http + "api/ExamCategories", newCategory, {
                headers: {
                    Authorization: "Bearer " + myToken
                }
            });
            console.log(response.status);
            if (response.status === 201 || response.status === 200) {
                setNewCategory({
                    fullId: 0,
                    categoryName: ""
                });
            }
            console.log(response.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="schedule-exam">
                <div className="schedule-box">
                    <div className="my-box">
                        <div className="my-inner-box">
                            <label className="my-label">
                                Select Full Category:
                                <select
                                    name="fullId"
                                    value={newCategory.fullId}
                                    onChange={onChangeFullCategory}
                                >
                                    {fullCategories.map(a => (
                                        <option key={a.fullId} value={a.fullId}>
                                            {a.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="my-inner-box">
                            <label className="my-label">
                                Exam Category Name:
                                <input
                                    type="text"
                                    className="fadeIn second"
                                    name="categoryName"
                                    placeholder="Exam Category Name"
                                    value={newCategory.categoryName}
                                    onChange={onChange}
                                />
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="fadeIn fourth">
                        Add Exam Category
                    </button>
                    <div className="my-label"></div>
                </div>
            </div>
        </form>
    );
}

export default AddExamCategory;
