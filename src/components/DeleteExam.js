import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import http from "../data/http";
import "../css/DeleteExam.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";

function DeleteExam() {
    let navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const [selectedExam, setSelectedExam] = useState("");
    const [message, setMessage] = useState("");
    const [check, setCheck] = useState(false);
    const [errors, setErrors] = useState({});

    const myToken = useSelector(state => state.token.value.tok);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchExams();
    }, []);

    async function fetchExams() {
        try {
            const response = await axios.get(http + "api/Exams", {
                headers: {
                    Authorization: "Bearer " + myToken
                }
            });
            console.log("Fetched exams:", response.data);
            setExams(response.data);
        } catch (error) {
            console.log("Error fetching exams:", error.message);
        }
    }

    function handleMessage() {
        setCheck(true);
        setTimeout(() => {
            setCheck(false);
        }, 700);
    }

    function validate() {
        let tempErrors = {};
        if (!selectedExam) tempErrors.selectedExam = "Please select an exam";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    }

    async function onSubmit(e) {
        e.preventDefault();
        setErrors({});
        if (!validate()) return;

        try {
            var response = await axios.delete(http + `api/Exams/${selectedExam}`, {
                headers: {
                    Authorization: "Bearer " + myToken
                }
            });
            if (response.status === 204 || response.status === 200) {
                setMessage("Exam successfully deleted");
                handleMessage();
                setSelectedExam("");
            }
        } catch (error) {
            setMessage("Error deleting the exam, please try again");
            handleMessage();
            console.log(error.message);
            setErrors({});
        }
    }

    function onChange(e) {
        setSelectedExam(e.target.value);
    }

    return (
        <div className="delete-exam-main">
            <form action="" onSubmit={onSubmit}>
                <div className="delete-exam">
                    <div className="delete-box">
                        <h1>Delete Exam</h1>
                        <div className="delete-my-inner-box">
                            <label className="delete-my-label">
                                Select Exam:
                                <select
                                    className="fadeIn second"
                                    name="exam"
                                    value={selectedExam}
                                    onChange={onChange}
                                >
                                    <option value="">Select an exam</option>
                                    {exams.map(exam => (
                                        <option key={exam.id} value={exam.id}>
                                            question:{exam.questionText} - Id:{exam.examId}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        {errors.selectedExam && (
                            <p className="DeleteExam-error-message">
                                {errors.selectedExam}
                            </p>
                        )}
                        <div className="delete-my-inner-box">
                            <button type="submit" className="fadeIn fourth" value="submit">
                                Delete
                            </button>
                        </div>
                        <div className="delete-my-label">{check && <p>{message}</p>}</div>
                    </div>
                </div>
            </form>
            <Footer color={"var(--color4)"} />
        </div>
    );
}

export default DeleteExam;
