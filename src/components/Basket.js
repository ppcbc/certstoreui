import React, { useEffect, useState } from "react";
import "../App.css";
import "../css/Basket.css";
import { setLogReg } from "../features/loginSlice";
import http from "../data/http";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import formatDate from "../data/formatDate";
import { BasketItem } from "./BasketItem";

export default function Basket() {
  const myToken = useSelector(state => state.token.value.tok);
  const navigate = useNavigate();
  const [myStaf, setMyStaf] = useState([]);

  useEffect(() => {
    getStaf();
  }, []);

  async function getStaf() {
    try {
      var response = await axios.get(http + "api/UserStafs", {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });

      let stafs = response.data;

      for (var staf of stafs) {
        var res = await axios.get(http + `api/CertExams/${staf.certExamId}`, {
          headers: {
            Authorization: "Bearer " + myToken
          }
        });
        let myCertExams = res.data;
        let formattedDate = formatDate(staf.dateOfSelectCertExam);

        let currentStaf = {
          key: staf.userStafId,
          certExamTitle: myCertExams.testTitle,
          certExamPrice: myCertExams.price,
          selectDate: formattedDate,
          hasBought: staf.hasBought
        };
        setMyStaf(prev => {
          return [...prev, currentStaf];
        });
        // console.log(currentStaf);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  async function removeStaf(id) {
    try {
      var response = await axios.delete(http + `api/UserStafs/${id}`, {
        headers: {
          Authorization: "Bearer " + myToken
        }
      });
      console.log(response.data);
      let currentStaf = response.data;
      console.log(currentStaf);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="basket-panel-main">
      <div className="basket-panel">
        <h1>Certifications To Buy</h1>
        <ul>
          <div className="basket-items">
            {myStaf.map(ff => (
              <BasketItem
                key={ff.key}
                id={ff.key}
                certExamPrice={ff.certExamPrice}
                selectDate={ff.selectDate}
                removeStaf={removeStaf}
              />
            ))}
          </div>
        </ul>
      </div>
      <Footer color={"lightgrey"} />
    </div>
  );
}
