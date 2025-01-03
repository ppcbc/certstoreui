import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/UpdateUser.css";
import Footer from "./Footer";
import http from "../data/http";

const UpdateUser = () => {
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

  useEffect(() => {
    // Load all users -- check again the https://..
    const fetchUsers = async () => {
      try {
        const response = await axios.get(http + "api/UserDetails");
        setUsers(response.data);
      } catch (error) {
        console.error("There was an error fetching the users!", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      // Load users details -- check again the https://..
      const fetchUserDetail = async () => {
        try {
          const response = await axios.get(
            http + `api/UserDetails/${selectedUserId}`
          );
          setUserDetail(response.data);
        } catch (error) {
          console.error("There was an error fetching the user details!", error);
        }
      };
      fetchUserDetail();
    }
  }, [selectedUserId]);

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
          <div className="update-box">
            <h1>Update User</h1>
            <div className="update-my-inner-box">
              <label className="update-my-label">
                Select User:
                <select
                  name="selectedUserId"
                  value={selectedUserId}
                  onChange={handleUserChange}
                >
                  <option value="">Select User</option>
                  {users.map(user => (
                    <option key={user.detailId} value={user.detailId}>
                      {user.name} {user.lastName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="update-inner-box">
              <div className="update-inner-field">
                <label className="update-label">
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={userDetail.name}
                    onChange={handleChange}
                  />
                </label>
                {errors.name && (
                  <div className="update-user-error-message">{errors.name}</div>
                )}
              </div>
              <div className="update-inner-field">
                <label className="update-label">
                  Middle Name:
                  <input
                    type="text"
                    name="middleName"
                    value={userDetail.middleName}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="update-inner-field">
                <label className="update-label">
                  Last Name:
                  <input
                    type="text"
                    name="lastName"
                    value={userDetail.lastName}
                    onChange={handleChange}
                  />
                </label>
                {errors.lastName && (
                  <div className="update-user-error-message">
                    {errors.lastName}
                  </div>
                )}
              </div>
              <div className="update-inner-field">
                <label className="update-label">
                  Gender:
                  <input
                    type="text"
                    name="gender"
                    value={userDetail.gender}
                    onChange={handleChange}
                  />
                </label>
                {errors.gender && (
                  <div className="update-user-error-message">
                    {errors.gender}
                  </div>
                )}
              </div>
              <div className="update-inner-field">
                <label className="update-label">
                  Native Language:
                  <input
                    type="text"
                    name="nativeLanguage"
                    value={userDetail.nativeLanguage}
                    onChange={handleChange}
                  />
                </label>
                {errors.nativeLanguage && (
                  <div className="update-user-error-message">
                    {errors.nativeLanguage}
                  </div>
                )}
              </div>
              <div className="update-inner-field">
                <label className="update-label">
                  Date of Birth:
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={userDetail.dateOfBirth}
                    onChange={handleChange}
                  />
                </label>
                {errors.dateOfBirth && (
                  <div className="update-user-error-message">
                    {errors.dateOfBirth}
                  </div>
                )}
              </div>
              <div className="update-inner-field">
                <label className="update-label">
                  Photo ID Type:
                  <input
                    type="text"
                    name="photoIdType"
                    value={userDetail.photoIdType}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="update-inner-field">
                <label className="update-label">
                  Photo ID Number:
                  <input
                    type="text"
                    name="photoIdNumber"
                    value={userDetail.photoIdNumber}
                    onChange={handleChange}
                  />
                </label>
                {errors.photoIdNumber && (
                  <div className="update-user-error-message">
                    {errors.photoIdNumber}
                  </div>
                )}
              </div>
              <div className="update-inner-field">
                <label className="update-label">
                  Photo ID Issue Date:
                  <input
                    type="date"
                    name="photoIdIssueDate"
                    value={userDetail.photoIdIssueDate}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="update-inner-field">
                <label className="update-label">
                  Address:
                  <input
                    type="text"
                    name="address"
                    value={userDetail.address}
                    onChange={handleChange}
                  />
                </label>
                {errors.address && (
                  <div className="update-user-error-message">
                    {errors.address}
                  </div>
                )}
              </div>
              <div className="update-inner-field">
                <label className="update-label">
                  Address Line 2:
                  <input
                    type="text"
                    name="addressLine2"
                    value={userDetail.addressLine2}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="update-inner-field">
                <label className="update-label">
                  Country of Residence:
                  <input
                    type="text"
                    name="countryOfResidence"
                    value={userDetail.countryOfResidence}
                    onChange={handleChange}
                  />
                </label>
                {errors.countryOfResidence && (
                  <div className="update-user-error-message">
                    {errors.countryOfResidence}
                  </div>
                )}
              </div>
              <div className="update-inner-field">
                <label className="update-label">
                  State/Province:
                  <input
                    type="text"
                    name="stateProvince"
                    value={userDetail.stateProvince}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="update-inner-field">
                <label className="update-label">
                  City:
                  <input
                    type="text"
                    name="city"
                    value={userDetail.city}
                    onChange={handleChange}
                  />
                </label>
                {errors.city && (
                  <div className="update-user-error-message">{errors.city}</div>
                )}
              </div>
              <div className="update-inner-field">
                <label className="update-label">
                  Postal Code:
                  <input
                    type="text"
                    name="postalCode"
                    value={userDetail.postalCode}
                    onChange={handleChange}
                  />
                </label>
                {errors.postalCode && (
                  <div className="update-user-error-message">
                    {errors.postalCode}
                  </div>
                )}
              </div>
              <div className="update-inner-field">
                <label className="update-label">
                  Landline Phone:
                  <input
                    type="text"
                    name="landlinePhone"
                    value={userDetail.landlinePhone}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="update-inner-field">
                <label className="update-label">
                  Mobile Number:
                  <input
                    type="text"
                    name="mobileNumber"
                    value={userDetail.mobileNumber}
                    onChange={handleChange}
                  />
                </label>
                {errors.mobileNumber && (
                  <div className="update-user-error-message">
                    {errors.mobileNumber}
                  </div>
                )}
              </div>
            </div>
            <div className="update-my-inner-box">
              <button type="submit" className="fadeIn fourth" value="submit">
                Update User
              </button>
            </div>
            <div className="update-label">
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

export default UpdateUser;
