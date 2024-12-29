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
    NativeLanguage: "greek",
    DateOfBirth: "",
    PhotoIdType: "National Card",
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

  const [validationMessages, setValidationMessages] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  function getDetails(e) {
    let { name, value } = e.target;
    setDetails(prev => {
      return {
        ...prev,
        [name]: value
      };
    });
  }

  function validateForm() {
    const errors = {};

    if (!details.Name.trim()) errors.Name = "First Name is required";

    if (!details.LastName.trim()) errors.LastName = "Last Name is required";

    // if (!details.Gender) errors.Gender = "Gender is required.";

    if (!details.NativeLanguage) errors.NativeLanguage = "Native Language is required";

    if (!details.DateOfBirth) errors.DateOfBirth = "Date of Birth is required";

    if (!details.PhotoIdType) errors.PhotoIdType = "Photo ID Type is required";

    if (!details.PhotoIdNumber.trim()) errors.PhotoIdNumber = "Photo ID Number is required";

    if (!details.PhotoIdIssueDate.trim()) errors.PhotoIdIssueDate = "Photo Issue Date is required";
    
    if (!details.Address.trim()) errors.Address = "Address is required";

    if (!details.StateProvince.trim()) errors.StateProvince = "State/Province is required";

    if (!details.City.trim()) errors.City = "City is required";

    if (!details.PostalCode.trim()) errors.PostalCode = "Postal Code is required";

    if (!details.CountryOfResidence.trim()) errors.CountryOfResidence = "Country Of Residence is required";

    if (!details.MobileNumber.trim()) {
      errors.MobileNumber = "Mobile Number is required";
    } else {
      const mobileRegex = /^[0-9]+$/; 
      if (!details.MobileNumber.match(mobileRegex)) {
        errors.MobileNumber = "Mobile Number should contain only numbers";
      }
    }

    setValidationMessages(errors);

    return Object.keys(errors).length === 0;
  }


  function onSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted with details: ", details);
      setFormSubmitted(true);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="user-details">
        <div className="user-details-box">
          <h1>Personal Details</h1>
          <div className>
            <div className="userdetails-inner-box">
              <label className="userdetails-label">
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
            {validationMessages.Name && <p className="userdetails-error-message">{validationMessages.Name}</p>}
            <div className="userdetails-inner-box">
              <label className="userdetails-label">
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
            <div className="userdetails-inner-box">
              <label className="userdetails-label">
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
            {validationMessages.LastName && <p className="userdetails-error-message">{validationMessages.LastName}</p>}
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
              {/*{validationMessages.Gender && <p className="userdetails-error-message gender-error">{validationMessages.Gender}</p>}*/}
            </div>
            <div className="userdetails-inner-box">
              <label className="userdetails-label">
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
            {validationMessages.NativeLanguage && <p className="userdetails-error-message">{validationMessages.NativeLanguage}</p>}
            <div className="userdetails-inner-box">
              <label className="userdetails-label">
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
            {validationMessages.DateOfBirth && <p className="userdetails-error-message">{validationMessages.DateOfBirth}</p>}
            <div className="userdetails-inner-box">
              <label className="userdetails-label">
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
            {validationMessages.PhotoIdType && <p className="userdetails-error-message">{validationMessages.PhotoIdType}</p>}
            <div className="userdetails-inner-box">
              <label className="userdetails-label">
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
            {validationMessages.PhotoIdNumber && <p className="userdetails-error-message">{validationMessages.PhotoIdNumber}</p>}
          </div>
          <div className="userdetails-inner-box">
            <label className="userdetails-label">
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
          {validationMessages.PhotoIdIssueDate && <p className="userdetails-error-message">{validationMessages.PhotoIdIssueDate}</p>}
          <div className="userdetails-inner-box">
            <label className="userdetails-label">
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
          {validationMessages.Address && <p className="userdetails-error-message">{validationMessages.Address}</p>}
          <div className="userdetails-inner-box">
            <label className="userdetails-label">
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
          <div className="userdetails-inner-box">
            <label className="userdetails-label">
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
          {validationMessages.StateProvince && <p className="userdetails-error-message">{validationMessages.StateProvince}</p>}
          <div className="userdetails-inner-box">
            <label className="userdetails-label">
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
          {validationMessages.City && <p className="userdetails-error-message">{validationMessages.City}</p>}
          <div className="userdetails-inner-box">
            <label className="userdetails-label">
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
          {validationMessages.PostalCode && <p className="userdetails-error-message">{validationMessages.PostalCode}</p>}
          <div className="userdetails-inner-box">
            <label className="userdetails-label">
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
          {validationMessages.CountryOfResidence && <p className="userdetails-error-message">{validationMessages.CountryOfResidence}</p>}
          <div className="userdetails-inner-box">
            <label className="userdetails-label">
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
          {validationMessages.MobileNumber && <p className="userdetails-error-message">{validationMessages.MobileNumber}</p>}
          <div className="userdetails-inner-box">
            <label className="userdetails-label">
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
          {formSubmitted && (
              <p className="userdetails-success-message">Form submitted successfully!</p>
          )}
        </div>
      </div>
    </form>
  );
}
