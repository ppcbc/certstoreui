import React, { useEffect, useState } from "react";
import "../App.css";
import "../css/UserDetails.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import http from "../data/http";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";

const getTodayDateForAgeLimit = ageLimit => {
  const today = new Date();
  const year = today.getFullYear() - ageLimit;
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function UserDetails() {
  let navigate = useNavigate();
  const [details, setDetails] = useState({
    id: "",
    name: "",
    middleName: "",
    lastName: "",
    gender: "",
    nativeLanguage: "greek",
    dateOfBirth: "",
    photoIdType: "National Card",
    photoIdNumber: "",
    photoIdIssueDate: "",
    address: "",
    addressLine2: "",
    stateProvince: "",
    city: "",
    postalCode: "",
    countryOfResidence: "",
    mobileNumber: "",
    landlinePhone: ""
  });

  const [validationMessages, setValidationMessages] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [myStaf, setMyStaf] = useState([]);
  const { userStafId } = useParams();

  const myToken = useSelector(state => state.token.value.tok);
  const myId = useSelector(state => state.token.value.id);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userStafId);
    getStaf();
  }, []);

  async function getStaf() {
    try {
      const response = await axios.get(`${http}api/UserStafs/${userStafId}`, {
        headers: { Authorization: `Bearer ${myToken}` }
      });
      console.log(response.data);
      setMyStaf(response.data);
    } catch (error) {
      console.error("Failed to fetch staff:", error.message);
    }
  }

  function getDetails(e) {
    let { name, value } = e.target;
    if (parseInt(value) !== NaN) {
      parseInt(value);
    }
    setDetails(prev => {
      return {
        ...prev,
        [name]: value,
        ["id"]: myId
      };
    });
  }

  function validateForm() {
    const errors = {};

    if (!details.name.trim()) errors.name = "First Name is required";

    if (!details.lastName.trim()) errors.lastName = "Last Name is required";

    // if (!details.Gender) errors.Gender = "Gender is required.";

    if (!details.nativeLanguage)
      errors.nativeLanguage = "Native Language is required";

    if (!details.dateOfBirth) errors.dateOfBirth = "Date of Birth is required";

    if (!details.photoIdType) errors.photoIdType = "Photo ID Type is required";

    if (!details.photoIdNumber.trim())
      errors.photoIdNumber = "Photo ID Number is required";

    if (!details.photoIdIssueDate.trim())
      errors.photoIdIssueDate = "Photo Issue Date is required";

    if (!details.address.trim()) errors.address = "Address is required";

    if (!details.stateProvince.trim())
      errors.stateProvince = "State/Province is required";

    if (!details.city.trim()) errors.city = "City is required";

    if (!details.postalCode.trim())
      errors.postalCode = "Postal Code is required";

    if (!details.countryOfResidence.trim())
      errors.countryOfResidence = "Country Of Residence is required";

    if (!details.mobileNumber.trim()) {
      errors.mobileNumber = "Mobile Number is required";
    } else {
      const mobileRegex = /^[0-9]+$/;
      if (!details.mobileNumber.match(mobileRegex)) {
        errors.mobileNumber = "Mobile Number should contain only numbers";
      }
    }

    setValidationMessages(errors);

    return Object.keys(errors).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    console.log(details);
    if (validateForm()) {
      try {
        const response = await axios.post(http + "api/UserDetails", details, {
          headers: {
            Authorization: "Bearer " + myToken
          }
        });
        console.log(myStaf);
        let finalStaf = {
          ...myStaf,
          userDetailsId: response.data.detailId
        };

        const res = await axios.put(
          http + `api/UserStafs/${userStafId}`,
          finalStaf,
          {
            headers: {
              Authorization: "Bearer " + myToken
            }
          }
        );
        if (response.status === 201 || response.status === 200) {
          setSuccessMessage("Form submitted successfully!");
          setErrorMessage("");
          setFormSubmitted(true);
        }
        navigate(`/schedule-exam/${userStafId}`);
      } catch (error) {
        console.error(error.message);
        setErrorMessage("Failed to submit form. Please try again.");
        setSuccessMessage("");
      }
    }
  }

  // Metatrepei se dd/mm/yyyy apla gia skopous display.
  const formatDateToDisplay = date => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="user-details-main">
      <form onSubmit={onSubmit}>
        <div className="user-details">
          <div className="user-details-box">
            <h1>Personal Details</h1>
            <div className>
              <div className="userdetails-inner-box">
                <label className="userdetails-label">
                  First Name*:
                  <input
                    type="text"
                    id="FirstName"
                    className="fadeIn second"
                    name="name"
                    placeholder="First Name"
                    value={details.name}
                    onChange={getDetails}
                  />
                </label>
              </div>
              {validationMessages.name && (
                <p className="userdetails-error-message">
                  {validationMessages.name}
                </p>
              )}
              <div className="userdetails-inner-box">
                <label className="userdetails-label">
                  Middle Name:
                  <input
                    type="text"
                    id="MiddleName"
                    className="fadeIn third"
                    name="middleName"
                    placeholder="Middle Name"
                    value={details.middleName}
                    onChange={getDetails}
                  />
                </label>
              </div>
              <div className="userdetails-inner-box">
                <label className="userdetails-label">
                  Last Name*:
                  <input
                    type="text"
                    id="LastName"
                    className="fadeIn third"
                    name="lastName"
                    placeholder="Last Name"
                    value={details.lastName}
                    onChange={getDetails}
                  />
                </label>
              </div>
              {validationMessages.lastName && (
                <p className="userdetails-error-message">
                  {validationMessages.lastName}
                </p>
              )}
              <div className="my-inner-genderbox">
                <p className="my-genderlabel-title">Gender:</p>
                <label className="my-genderlabel">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    onChange={getDetails}
                  />
                  Male
                </label>
                <label className="my-genderlabel">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    onChange={getDetails}
                  />
                  Female
                </label>
                {/*{validationMessages.Gender && <p className="userdetails-error-message gender-error">{validationMessages.Gender}</p>}*/}
              </div>
              <div className="userdetails-inner-box">
                <label className="userdetails-label">
                  Native Language*:
                  <select
                    id="NativeLanguage"
                    className="fadeIn third"
                    name="nativeLanguage"
                    placeholder="Native Language"
                    value={details.nativeLanguage}
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
              {validationMessages.nativeLanguage && (
                <p className="userdetails-error-message">
                  {validationMessages.nativeLanguage}
                </p>
              )}
              <div className="userdetails-inner-box">
                <label className="userdetails-label">
                  Date Of Birth*:
                  <input
                    type="date"
                    id="DateOfBirth"
                    className="fadeIn third"
                    name="dateOfBirth"
                    placeholder="dd/mm/yyyy"
                    value={
                      details.dateOfBirth
                        ? details.dateOfBirth.split("/").reverse().join("-")
                        : ""
                    } // Afto metatrepei to input value apo dd/mm/yyyy se yyyy-mm-dd
                    onChange={getDetails}
                    max={getTodayDateForAgeLimit(12)} // Afto vazei san max date na einai today's date in yyyy-mm-dd format
                  />
                </label>
              </div>
              {validationMessages.dateOfBirth && (
                <p className="userdetails-error-message">
                  {validationMessages.dateOfBirth}
                </p>
              )}
              <div className="userdetails-inner-box">
                <label className="userdetails-label">
                  Photo Id Type*:
                  <select
                    id="PhotoIdType"
                    className="fadeIn third"
                    name="photoIdType"
                    placeholder="Photo Id Type:"
                    value={details.photoIdType}
                    onChange={getDetails}
                  >
                    <option value="nationalcard">National Card</option>
                    <option value="passport">Passport</option>
                  </select>
                </label>
              </div>
              {validationMessages.photoIdType && (
                <p className="userdetails-error-message">
                  {validationMessages.photoIdType}
                </p>
              )}
              <div className="userdetails-inner-box">
                <label className="userdetails-label">
                  Photo Id Number*:
                  <input
                    type="text"
                    id="PhotoIdNumber"
                    className="fadeIn second"
                    name="photoIdNumber"
                    placeholder="Photo Id Number"
                    value={details.photoIdNumber}
                    onChange={getDetails}
                  />
                </label>
              </div>
              {validationMessages.photoIdNumber && (
                <p className="userdetails-error-message">
                  {validationMessages.photoIdNumber}
                </p>
              )}
            </div>
            <div className="userdetails-inner-box">
              <label className="userdetails-label">
                Photo Id Issue Date*:
                <input
                  type="date"
                  id="PhotoIdIssueDate"
                  className="fadeIn third"
                  name="photoIdIssueDate"
                  placeholder="dd/mm/yyyy"
                  value={details.photoIdIssueDate}
                  onChange={getDetails}
                  max={getTodayDate()}
                />
              </label>
            </div>
            {validationMessages.photoIdIssueDate && (
              <p className="userdetails-error-message">
                {validationMessages.photoIdIssueDate}
              </p>
            )}
            <div className="userdetails-inner-box">
              <label className="userdetails-label">
                Address*:
                <input
                  type="text"
                  id="Address"
                  className="fadeIn second"
                  name="address"
                  placeholder="Address"
                  value={details.address}
                  onChange={getDetails}
                />
              </label>
            </div>
            {validationMessages.address && (
              <p className="userdetails-error-message">
                {validationMessages.address}
              </p>
            )}
            <div className="userdetails-inner-box">
              <label className="userdetails-label">
                Address Line 2:
                <input
                  type="text"
                  id="AddressLine2"
                  className="fadeIn second"
                  name="addressLine2"
                  placeholder="Address Line 2"
                  value={details.addressLine2}
                  onChange={getDetails}
                />
              </label>
            </div>
            <div className="userdetails-inner-box">
              <label className="userdetails-label">
                State/Province*:
                <input
                  type="text"
                  id="StateProvince"
                  className="fadeIn second"
                  name="stateProvince"
                  placeholder="State/Province"
                  value={details.stateProvince}
                  onChange={getDetails}
                />
              </label>
            </div>
            {validationMessages.stateProvince && (
              <p className="userdetails-error-message">
                {validationMessages.stateProvince}
              </p>
            )}
            <div className="userdetails-inner-box">
              <label className="userdetails-label">
                City*:
                <input
                  type="text"
                  id="City"
                  className="fadeIn second"
                  name="city"
                  placeholder="City"
                  value={details.city}
                  onChange={getDetails}
                />
              </label>
            </div>
            {validationMessages.city && (
              <p className="userdetails-error-message">
                {validationMessages.city}
              </p>
            )}
            <div className="userdetails-inner-box">
              <label className="userdetails-label">
                Postal Code*:
                <input
                  type="text"
                  id="PostalCode"
                  className="fadeIn second"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={details.postalCode}
                  onChange={getDetails}
                />
              </label>
            </div>
            {validationMessages.postalCode && (
              <p className="userdetails-error-message">
                {validationMessages.postalCode}
              </p>
            )}
            <div className="userdetails-inner-box">
              <label className="userdetails-label">
                Country Of Residence*:
                <input
                  type="text"
                  id="CountryOfResidence"
                  className="fadeIn second"
                  name="countryOfResidence"
                  placeholder="Country Of Residence"
                  value={details.countryOfResidence}
                  onChange={getDetails}
                />
              </label>
            </div>
            {validationMessages.countryOfResidence && (
              <p className="userdetails-error-message">
                {validationMessages.countryOfResidence}
              </p>
            )}
            <div className="userdetails-inner-box">
              <label className="userdetails-label">
                Mobile Number*:
                <input
                  type="text"
                  id="MobileNumber"
                  className="fadeIn second"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  value={details.mobileNumber}
                  onChange={getDetails}
                />
              </label>
            </div>
            {validationMessages.mobileNumber && (
              <p className="userdetails-error-message">
                {validationMessages.mobileNumber}
              </p>
            )}
            <div className="userdetails-inner-box">
              <label className="userdetails-label">
                Landline:
                <input
                  type="text"
                  id="LandlinePhone"
                  className="fadeIn second"
                  name="landlinePhone"
                  placeholder="Landline"
                  value={details.landlinePhone}
                  onChange={getDetails}
                />
              </label>
            </div>

            <button type="submit" class="fadeIn fourth" value="Submit">
              Submit
            </button>
            <button
              type="cancel"
              className="fadeIn fourth"
              onClick={() => navigate("/my-certificates")}
            >
              Cancel
            </button>
            {formSubmitted && (
              <p className="userdetails-success-message">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="submituserdetails-error-message">{errorMessage}</p>
            )}
          </div>
        </div>
      </form>
      <Footer color={"var(--color4"} />
    </div>
  );
}
