import { useEffect, useState } from "react";
import React from "react";
// import "../App.css";
import axios from "axios";
import http from "../data/http";
import "../css/ScheduleExam.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setId, setLogReg, setRole, setToken } from "../features/loginSlice";

function AddExam() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const myToken = useSelector(state => state.token.value.tok);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLogReg("LOGIN"));
  }, [dispatch]);

  function getUser(e) {
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      var response = await axios.post(http + "login", user);
      dispatch(setToken(response.data.accessToken));
      var res = await axios.get(http + "api/AddRole/get-id", {
        headers: {
          // "Content-Type": "application/json",
          Authorization: "Bearer " + response.data.accessToken
        }
      });
      var resForRole = await axios.get(http + "api/AddRole/get-role", {
        headers: {
          // "Content-Type": "application/json",
          Authorization: "Bearer " + response.data.accessToken
        }
      });
      dispatch(setId(res.data.userId));
      dispatch(setRole(resForRole.data.userRole));
      console.log(resForRole.data.userRole);
      console.log(res.data.userId);
      console.log(myToken);
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <form action="" onSubmit={onSubmit}>
      <div className="schedule-exam">
        <div className="schedule-box">
          <div className="my-box">
            <div className="my-inner-box">
              <label className="my-label">
                Question Text:
                <input
                  type="text"
                  className="fadeIn second"
                  name="questionText"
                  placeholder="question text"
                  value={user.questionText}
                  onChange={getUser}
                />
              </label>
            </div>
            <div className="my-inner-box">
              <label className="my-label">
                Question photo link:
                <input
                  type="text"
                  class="fadeIn third"
                  name="questionPhotoLink"
                  placeholder="question photo link"
                  value={user.questionPhotoLink}
                  onChange={getUser}
                />
              </label>
            </div>
            <div className="my-inner-box">
              <label className="my-label">
                First question:
                <input
                  type="text"
                  class="fadeIn third"
                  name="option1"
                  placeholder="first question"
                  value={user.option1}
                  onChange={getUser}
                />
              </label>
            </div>
            <div className="my-inner-box">
              <label className="my-label">
                Second question:
                <input
                  type="text"
                  class="fadeIn third"
                  name="option2"
                  placeholder="second question"
                  value={user.option2}
                  onChange={getUser}
                />
              </label>
            </div>
            <div className="my-inner-box">
              <label className="my-label">
                Third question:
                <input
                  type="text"
                  class="fadeIn third"
                  name="option3"
                  placeholder="third question"
                  value={user.option3}
                  onChange={getUser}
                />
              </label>
            </div>
            <div className="my-inner-box">
              <label className="my-label">
                Fourth question:
                <input
                  type="text"
                  class="fadeIn third"
                  name="option4"
                  placeholder="fourth question"
                  value={user.option4}
                  onChange={getUser}
                />
              </label>
            </div>
          </div>
          <button type="submit" class="fadeIn fourth" value="Log In">
            Add
          </button>
          <div className="my-label"></div>
        </div>
      </div>
    </form>
  );
}

export default AddExam;
