import React, { useEffect, useState } from "react";
import "../css/MyCertificates.css";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import axios from "axios";
import http from "../data/http";
import formatDate from "../data/formatDate";
import { useNavigate } from "react-router-dom";

export default function MyCertificates() {
    const myToken = useSelector(state => state.token.value.tok);
    const navigate = useNavigate();

    const [myStaf, setMyStaf] = useState([]);
    const [acquiredCertificates, setAcquiredCertificates] = useState([]);

    const truncateDescription = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        }
        return text;
    };

    // Fetch future exams
    useEffect(() => {
        getStaf();
    }, []);

    // Fetch acquired certificates
    useEffect(() => {
        getAcquiredCertificates();
    }, []);

    async function getStaf() {
        try {
            const response = await axios.get(`${http}api/UserStafs`, {
                headers: {
                    Authorization: `Bearer ${myToken}`
                }
            });

            const stafs = response.data;
            const stafData = await Promise.all(
                stafs.map(async staf => {
                    const res = await axios.get(
                        `${http}api/CertExams/${staf.certExamId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${myToken}`
                            }
                        }
                    );

                    const myCertExams = res.data;
                    const formattedDate = formatDate(staf.dateOfSelectCertExam);

                    return {
                        key: staf.userStafId,
                        certExamTitle: myCertExams.testTitle,
                        testDescription: myCertExams.testDescription,
                        selectDate: formattedDate,
                        hasBought: staf.hasBought
                    };
                })
            );

            setMyStaf(stafData);
        } catch (error) {
            console.error("Failed to fetch staff:", error.message);
        }
    }

    async function getAcquiredCertificates() {
        try {
            const response = await axios.get(`${http}api/CertExams`, {
                headers: {
                    Authorization: `Bearer ${myToken}`,
                },
            });
            setAcquiredCertificates(response.data);
        } catch (error) {
            console.error("Failed to fetch certifications:", error.message);
        }
    }

    return (
        <div className="my-certificates-main">
            <div className="my-certificates-container">
                {/* Future Exams Section */}
                <div className="future-exams">
                    <h1>My Future Exams</h1>
                    <ul>
                        {myStaf.map(staf => (
                            <li key={staf.key}>
                                <h2>{staf.certExamTitle}</h2>
                                <p className="myfutureexams-description">{truncateDescription(staf.testDescription, 150)}</p>
                                <p className="myfutureexams-date">Date: {staf.selectDate}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Acquired Certificates Section */}
                <div className="acquired-certificates">
                    <h1>My Acquired Certificates</h1>
                    <ul>
                        {acquiredCertificates.length === 0 ? (
                            <p>No certificates acquired yet.</p>
                        ) : (
                            acquiredCertificates.map(certification => (
                                <li key={certification.certExamId} className="certification-box">
                                    <div>
                                        <h2>{certification.testTitle}</h2>
                                        <p className="myacquiredcertificates-description">{truncateDescription(certification.testDescription, 150)}</p>
                                        <p className="myacquiredcertificates-mark">Mark: 65</p>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
            <Footer className="mycertificates-footer" color={"var(--color4)"} />
        </div>
    );
}

