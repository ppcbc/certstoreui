import React, { useEffect, useState } from "react";
import "../App.css";
import "../css/Basket.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import formatDate from "../data/formatDate";
import { BasketItem } from "./BasketItem";
import http from "../data/http";

export default function Basket() {
  const myToken = useSelector(state => state.token.value.tok);
  const navigate = useNavigate();
  const [myStaf, setMyStaf] = useState([]);

  useEffect(() => {
    getStaf();
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
            certExamPrice: myCertExams.price,
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

  async function removeStaf(id) {

  const userConfirmed = window.confirm("Are you sure you want to delete this certification?");

  if (userConfirmed === true) 
    {
    try {
      await axios.delete(`${http}api/UserStafs/${id}`, {
        headers: {
          Authorization: `Bearer ${myToken}`
        }
      });

      setMyStaf(prev => prev.filter(staf => staf.key !== id));
    } catch (error) {
      console.error("Failed to remove staff:", error.message);
    }
  }
  }

  return (
    <div className="basket-panel-main">
      <div className="basket-panel">
        <h1>Certifications To Buy</h1>
        <ul className="basket-items">
          {myStaf.map(staf => (
            <BasketItem
              key={staf.key}
              id={staf.key}
              certExamTitle={staf.certExamTitle}
              certExamPrice={staf.certExamPrice}
              selectDate={staf.selectDate}
              removeStaf={removeStaf}
              navigate={navigate}
            />
          ))}
        </ul>
      </div>
      <Footer color={"lightgrey"} />
    </div>
  );
}
