import React, { useEffect, useState } from "react";
import "../App.css";
import "../css/Basket.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import formatDate from "../data/formatDate";
import { BasketItem } from "./BasketItem";
import http from "../data/http";
import { setBasketCount } from "../features/loginSlice";

export default function Basket() {
  const myToken = useSelector(state => state.token.value.tok);
  const myId = useSelector(state => state.token.value.id);
  const navigate = useNavigate();
  const [myStaf, setMyStaf] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getStaf();
  }, []);

  async function getStaf() {
    try {
      setLoading(true);

      // ✅ Step 1: Fetch userStafs and filter by myId
      const userStafsResponse = await axios.get(`${http}api/UserStafs`, {
        headers: { Authorization: `Bearer ${myToken}` }
      });

      const userStafs = userStafsResponse.data.filter(
        staf => staf.userId === myId && staf.hasBought !== true
      );
      const response = await axios.get(`${http}api/UserDetails/`, {
        headers: {
          Authorization: `Bearer ${myToken}`
        }
      });

      // ✅ Step 2: Fetch certExam details for filtered userStafs
      const finalStafs = await Promise.all(
        userStafs.map(async staf => {
          const certExamResponse = await axios.get(
            `${http}api/CertExams/${staf.certExamId}`,
            {
              headers: { Authorization: `Bearer ${myToken}` }
            }
          );

          const certExam = certExamResponse.data;
          return {
            userStafId: staf.userStafId,
            certExamTitle: certExam.testTitle,
            certExamPrice: certExam.price,
            selectDate: formatDate(staf.dateOfSelectCertExam),
            hasBought: staf.hasBought
          };
        })
      );

      setMyStaf(finalStafs);
      dispatch(setBasketCount(finalStafs.length));
    } catch (error) {
      console.error("Failed to fetch staff:", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function removeStaf(id) {
    try {
      await axios.delete(`${http}api/UserStafs/${id}`, {
        headers: { Authorization: `Bearer ${myToken}` }
      });
      dispatch(setBasketCount(myStaf.length - 1));

      setMyStaf(prev => prev.filter(staf => staf.userStafId !== id));
    } catch (error) {
      console.error("Failed to remove staff:", error.message);
    }
  }

  return (
    <div className="basket-panel-main">
      <div className="basket-panel">
        <h1>Certifications To Buy</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="basket-items">
            {myStaf.length > 0 ? (
              myStaf.map(staf => (
                <BasketItem
                  key={staf.userStafId}
                  id={staf.userStafId}
                  certExamTitle={staf.certExamTitle}
                  certExamPrice={staf.certExamPrice}
                  selectDate={staf.selectDate}
                  removeStaf={removeStaf}
                  navigate={navigate}
                />
              ))
            ) : (
              <p>No certifications found.</p>
            )}
          </ul>
        )}
      </div>
      <Footer color={"lightgrey"} />
    </div>
  );
}
