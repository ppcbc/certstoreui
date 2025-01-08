import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/UpdateUser.css";
import Footer from "./Footer";
import http from "../data/http";
import { useSelector } from "react-redux";

const UpdateUserNavbar = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [userDetail, setUserDetail] = useState({
    name: "",
    middleName: "",
    lastName: "",
    gender: "",
    nativeLanguage: "",
    dateOfBirth: "",
    photoIdType: "",
    photoIdNumber: "",
    photoIdIssueDate: "",
    address: "",
    addressLine2: "",
    countryOfResidence: "",
    stateProvince: "",
    city: "",
    postalCode: "",
    landlinePhone: "",
    mobileNumber: ""
  });
  const myId = useSelector(state => state.token.value.id);

  useEffect(() => {
    // Load all users -- check again the https://..
    // const fetchUsers = async () => {
    //   try {
    //     const response = await axios.get(http + "api/UserDetails");
    //     setUsers(response.data);
    //   } catch (error) {
    //     console.error("There was an error fetching the users!", error);
    //   }
    // };
    // fetchUsers();
    fetchUserDetail();
  }, []);

  const fetchUserDetail = async () => {
    try {
      const res = await axios.get(http + "api/UserDetails");
      console.log(res.data);
      //   setUsers(response.data);
      let currentUser = res.data.filter(a => a.id == myId);
      console.log(currentUser);
      let myUserId = currentUser[0].detailId;
      console.log(myUserId);
      const response = await axios.get(http + `api/UserDetails/${myUserId}`);
      console.log("USER DETAILS");
      console.log(response.data);
      setUserDetail(response.data);
      setSelectedUserId(response.data);
    } catch (error) {
      console.error("There was an error fetching the user details!", error);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setUserDetail(prevDetail => ({
      ...prevDetail,
      [name]: value
    }));
  };

  const handleUserChange = e => {
    setSelectedUserId(e.target.value);
  };
  //Validations -- Done
  const validate = () => {
    let tempErrors = {};
    if (!userDetail.name) tempErrors.name = "Name is required.";
    if (!userDetail.lastName) tempErrors.lastName = "Last Name is required.";
    if (!userDetail.gender) tempErrors.gender = "Gender is required.";
    if (!userDetail.nativeLanguage)
      tempErrors.nativeLanguage = "Native Language is required.";
    if (!userDetail.dateOfBirth)
      tempErrors.dateOfBirth = "Date of Birth is required.";
    if (!userDetail.photoIdType)
      tempErrors.photoIdType = "Photo ID Type is required";
    if (!userDetail.photoIdNumber)
      tempErrors.photoIdNumber = "Photo ID Number is required.";
    if (!userDetail.address) tempErrors.address = "Address is required.";
    if (!userDetail.countryOfResidence)
      tempErrors.countryOfResidence = "Country of Residence is required.";
    if (!userDetail.city) tempErrors.city = "City is required.";
    if (!userDetail.postalCode)
      tempErrors.postalCode = "Postal Code is required.";
    if (!userDetail.mobileNumber)
      tempErrors.mobileNumber = "Mobile Number is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  // update user details --
  const handleSubmit = async e => {
    e.preventDefault();
    if (validate()) {
      try {
        const updatedUserDetail = { ...userDetail };
        await axios.put(
          http + `api/UserDetails/${selectedUserId}`,
          updatedUserDetail
        );
        setSuccessMessage("User details updated successfully!");
      } catch (error) {
        console.error("There was an error updating the user details!", error);
      }
    }
  };

  return (
    <div className="update-user-main">
      <form onSubmit={handleSubmit}>
        <div className="update-user">
          <div className="update-user-box">
            <h1>Profile</h1>
            {/* <div className="update-user-inner-field">
              <label className="update-user-label">
                Select User:
                <select
                  name="selectedUserId"
                  value={selectedUserId}
                  onChange={handleUserChange}
                >
                  <option value="">Select user</option>
                  {users.map(user => (
                    <option key={user.detailId} value={user.detailId}>
                      {user.name} {user.lastName}
                    </option>
                  ))}
                </select>
              </label>
            </div> */}
            {/* <div className="update-user-inner-box"> */}
            <div className="update-user-inner-field">
              <label className="update-user-label">
                First Name:
                <input
                  type="text"
                  name="name"
                  value={userDetail.name}
                  placeholder="First name"
                  onChange={handleChange}
                />
              </label>
            </div>
            {errors.name && (
              <div className="update-user-error-message">{errors.name}</div>
            )}

            <div className="update-user-inner-field">
              <label className="update-user-label">
                Middle Name:
                <input
                  type="text"
                  name="middleName"
                  placeholder="Middle name"
                  value={userDetail.middleName}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="update-user-inner-field">
              <label className="update-user-label">
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={userDetail.lastName}
                  onChange={handleChange}
                />
              </label>
            </div>
            {errors.lastName && (
              <div className="update-user-error-message">{errors.lastName}</div>
            )}

            {/* <div className="update-user-inner-field">
                <label className="update-user-label">
                  Gender:
                  <input
                    type="text"
                    name="gender"
                    value={userDetail.gender}
                    onChange={handleChange}
                  />
                </label>
                </div>
                {errors.gender && (
                  <div className="update-user-error-message">
                    {errors.gender}
                  </div>
                )} */}

            <div className="my-inner-updateuser-genderbox">
              <p className="my-genderlabel-updateuser-title">Gender:</p>
              <label className="my-genderlabel">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                />
                Male
              </label>
              <label className="my-update-user-genderlabel">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
            {errors.gender && (
              <div className="update-user-error-message">{errors.gender}</div>
            )}

            <div className="update-user-inner-field">
              <label className="update-user-label">
                Native Language:
                <input
                  type="text"
                  placeholder="Greek"
                  name="nativeLanguage"
                  value={userDetail.nativeLanguage}
                  onChange={handleChange}
                />
              </label>
            </div>
            {errors.nativeLanguage && (
              <div className="update-user-error-message">
                {errors.nativeLanguage}
              </div>
            )}

            <div className="update-user-inner-field">
              <label className="update-user-label">
                Date of Birth:
                <input
                  type="date"
                  name="dateOfBirth"
                  value={userDetail.dateOfBirth}
                  onChange={handleChange}
                />
              </label>
            </div>
            {errors.dateOfBirth && (
              <div className="update-user-error-message">
                {errors.dateOfBirth}
              </div>
            )}

            <div className="update-user-inner-field">
              <label className="update-user-label">
                Photo Id Type:
                <select
                  id="PhotoIdType"
                  className="fadeIn third"
                  name="photoIdType"
                  placeholder="Photo Id Type:"
                  value={userDetail.photoIdType}
                  onChange={handleChange}
                >
                  <option value="nationalcard">National Card</option>
                  <option value="passport">Passport</option>
                </select>
              </label>
            </div>
            {errors.photoIdType && (
              <p className="update-user-error-message">{errors.photoIdType}</p>
            )}

            <div className="update-user-inner-field">
              <label className="update-user-label">
                Photo ID Number:
                <input
                  type="text"
                  name="photoIdNumber"
                  value={userDetail.photoIdNumber}
                  placeholder="Photo ID number"
                  onChange={handleChange}
                />
              </label>
            </div>
            {errors.photoIdNumber && (
              <div className="update-user-error-message">
                {errors.photoIdNumber}
              </div>
            )}

            <div className="update-user-inner-field">
              <label className="update-user-label">
                Photo ID Issue Date:
                <input
                  type="date"
                  name="photoIdIssueDate"
                  value={userDetail.photoIdIssueDate}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="update-user-inner-field">
              <label className="update-user-label">
                Address:
                <input
                  type="text"
                  name="address"
                  placeholder="Adress"
                  value={userDetail.address}
                  onChange={handleChange}
                />
              </label>
            </div>
            {errors.address && (
              <div className="update-user-error-message">{errors.address}</div>
            )}

            <div className="update-user-inner-field">
              <label className="update-user-label">
                Address Line 2:
                <input
                  type="text"
                  name="addressLine2"
                  placeholder="Adress line 2"
                  value={userDetail.addressLine2}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="update-user-inner-field">
              <label className="update-user-label">
                Country of Residence:
                <input
                  type="text"
                  name="countryOfResidence"
                  placeholder="Country of residence"
                  value={userDetail.countryOfResidence}
                  onChange={handleChange}
                />
              </label>
            </div>
            {errors.countryOfResidence && (
              <div className="update-user-error-message">
                {errors.countryOfResidence}
              </div>
            )}

            <div className="update-user-inner-field">
              <label className="update-user-label">
                State/Province:
                <input
                  type="text"
                  placeholder="State/province"
                  name="stateProvince"
                  value={userDetail.stateProvince}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="update-user-inner-field">
              <label className="update-user-label">
                City:
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={userDetail.city}
                  onChange={handleChange}
                />
              </label>
            </div>
            {errors.city && (
              <div className="update-user-error-message">{errors.city}</div>
            )}

            <div className="update-user-inner-field">
              <label className="update-user-label">
                Postal Code:
                <input
                  type="text"
                  placeholder="Postal code"
                  name="postalCode"
                  value={userDetail.postalCode}
                  onChange={handleChange}
                />
              </label>
            </div>
            {errors.postalCode && (
              <div className="update-user-error-message">
                {errors.postalCode}
              </div>
            )}

            <div className="update-user-inner-field">
              <label className="update-user-label">
                Landline Phone:
                <input
                  type="text"
                  name="landlinePhone"
                  placeholder="Landline phone"
                  value={userDetail.landlinePhone}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="update-user-inner-field">
              <label className="update-user-label">
                Mobile Number:
                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Mobile number"
                  value={userDetail.mobileNumber}
                  onChange={handleChange}
                />
              </label>
            </div>
            {errors.mobileNumber && (
              <div className="update-user-error-message">
                {errors.mobileNumber}
              </div>
            )}
            {/* </div> */}
            <div className="update-user-my-inner-box">
              <button type="submit" className="fadeIn fourth" value="submit">
                Update Profile
              </button>
            </div>
            <div className="update-user-label">
              {successMessage && (
                <div className="update-user-success-message">
                  {successMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
      <Footer color={"var(--color4"} />
    </div>
  );
};

export default UpdateUserNavbar;
