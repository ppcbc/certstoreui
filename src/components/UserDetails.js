import React, { useEffect, useState } from "react";
import "../App.css";
import "../css/UserDetails.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLogReg } from "../features/loginSlice";
import http from "../data/http";
import { Link, useNavigate } from "react-router-dom";

export default function UserDetails() {
  let navigate = useNavigate();
  const [details, setDetails] = useState({
    Name: "",
    MiddleName: "",
    LastName: "",
    Gender: "",
    NativeLanguage: "",
    DateOfBirth: "",
    PhotoIdType: "",
    PhotoIdNumber: "",
    PhotoIdIssueDate: "",
    Address: "",
    AddressLine2: "",
    StateProvince: "",
    City: "",
    PostalCode: "",
    CountryOfResidence: "",
    MobileNumber: "",
    LandlinePhone: ""
  });

  function getDetails(e) {
    let { name, value } = e.target;
    setDetails(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  return (
    // <form action="" onSubmit={onSubmit}>
    <form>
      <div className="user-details">
        <div className="user-details-box">
          <h1>Personal Details</h1>
          <div className>
            <div className="my-inner-box">
              <label className="my-label">
                First Name:
                <input
                  type="text"
                  id="FirstName"
                  className="fadeIn second"
                  name="Name"
                  placeholder="First Name"
                  value={details.Name}
                  onChange={getDetails}
                />
              </label>
            </div>
            <div className="my-inner-box">
              <label className="my-label">
                Middle Name:
                <input
                  type="text"
                  id="MiddleName"
                  className="fadeIn third"
                  name="MiddleName"
                  placeholder="Middle Name"
                  value={details.MiddleName}
                  onChange={getDetails}
                />
              </label>
            </div>
            <div className="my-inner-box">
              <label className="my-label">
                Last Name:
                <input
                  type="text"
                  id="LastName"
                  className="fadeIn third"
                  name="LastName"
                  placeholder="Last Name"
                  value={details.LastName}
                  onChange={getDetails}
                />
              </label>
            </div>
            <div className="my-inner-genderbox">
              <p className="my-genderlabel-title">Gender:</p>
              <label className="my-genderlabel">
                <input type="radio" id="male" name="Gender" value="male" />
                Male
              </label>
              <label className="my-genderlabel">
                <input type="radio" id="female" name="Gender" value="female" />
                Female
              </label>
            </div>
            <div className="my-inner-box">
              <label className="my-label">
                Native Language:
                <select
                  id="NativeLanguage"
                  className="fadeIn third"
                  name="NativeLanguage"
                  placeholder="Native Language"
                  value={details.NativeLanguage}
                  onChange={getDetails}
                >
                  <option value="greek">Greek</option>
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="italian">Italian</option>
                  <option value="indian">Indian</option>
                  <option value="chinese">Chinese</option>
                </select>
              </label>
            </div>
            <div className="my-inner-box">
              <label className="my-label">
                Date Of Birth:
                <input
                  type="date"
                  id="DateOfBirth"
                  className="fadeIn third"
                  name="DateOfBirth"
                  placeholder="dd/mm/yyyy"
                  value={details.DateOfBirth}
                  onChange={getDetails}
                />
              </label>
            </div>
            <div className="my-inner-box">
              <label className="my-label">
                Photo Id Type:
                <select
                  id="PhotoIdType"
                  className="fadeIn third"
                  name="PhotoIdType"
                  placeholder="Photo Id Type:"
                  value={details.PhotoIdType}
                  onChange={getDetails}
                >
                  <option value="nationalcard">National Card</option>
                  <option value="passport">Passport</option>
                </select>
              </label>
            </div>
            <div className="my-inner-box">
              <label className="my-label">
                Photo Id Number:
                <input
                  type="text"
                  id="PhotoIdNumber"
                  className="fadeIn second"
                  name="PhotoIdNumber"
                  placeholder="Photo Id Number"
                  value={details.PhotoIdNumber}
                  onChange={getDetails}
                />
              </label>
            </div>
          </div>
          <div className="my-inner-box">
            <label className="my-label">
              Photo Id Issue Date:
              <input
                type="date"
                id="PhotoIdIssueDate"
                className="fadeIn third"
                name="PhotoIdIssueDate"
                placeholder="dd/mm/yyyy"
                value={details.PhotoIdIssueDate}
                onChange={getDetails}
              />
            </label>
          </div>
          <div className="my-inner-box">
            <label className="my-label">
              Address:
              <input
                type="text"
                id="Address"
                className="fadeIn second"
                name="Address"
                placeholder="Address"
                value={details.Address}
                onChange={getDetails}
              />
            </label>
          </div>
          <div className="my-inner-box">
            <label className="my-label">
              Address Line 2:
              <input
                type="text"
                id="AddressLine2"
                className="fadeIn second"
                name="AddressLine2"
                placeholder="Address Line 2"
                value={details.AddressLine2}
                onChange={getDetails}
              />
            </label>
          </div>
          <div className="my-inner-box">
            <label className="my-label">
              State/Province:
              <input
                type="text"
                id="StateProvince"
                className="fadeIn second"
                name="StateProvince"
                placeholder="State/Province"
                value={details.StateProvince}
                onChange={getDetails}
              />
            </label>
          </div>
          <div className="my-inner-box">
            <label className="my-label">
              City:
              <input
                type="text"
                id="City"
                className="fadeIn second"
                name="City"
                placeholder="City"
                value={details.City}
                onChange={getDetails}
              />
            </label>
          </div>
          <div className="my-inner-box">
            <label className="my-label">
              Postal Code:
              <input
                type="text"
                id="PostalCode"
                className="fadeIn second"
                name="PostalCode"
                placeholder="Postal Code"
                value={details.PostalCode}
                onChange={getDetails}
              />
            </label>
          </div>
          <div className="my-inner-box">
            <label className="my-label">
              Country Of Residence:
              <input
                type="text"
                id="CountryOfResidence"
                className="fadeIn second"
                name="CountryOfResidence"
                placeholder="Country Of Residence"
                value={details.CountryOfResidence}
                onChange={getDetails}
              />
            </label>
          </div>
          <div className="my-inner-box">
            <label className="my-label">
              Mobile Number:
              <input
                type="text"
                id="MobileNumber"
                className="fadeIn second"
                name="MobileNumber"
                placeholder="Mobile Number"
                value={details.MobileNumber}
                onChange={getDetails}
              />
            </label>
          </div>
          <div className="my-inner-box">
            <label className="my-label">
              Landline:
              <input
                type="text"
                id="LandlinePhone"
                className="fadeIn second"
                name="LandlinePhone"
                placeholder="Landline"
                value={details.LandlinePhone}
                onChange={getDetails}
              />
            </label>
          </div>

          <button type="submit" class="fadeIn fourth" value="Submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
