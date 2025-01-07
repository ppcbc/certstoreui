import React from "react";

const ProfileCard = props => {
  return (
    <div className="profile-card">
      <img className="profile-image" src={props.avatar} alt="profile" />
      <h2 className="h2-card">{props.name} </h2>
      <p>Occupation: {props.occupation}</p>
      <p>Interests: {props.interest}</p>
    </div>
  );
};

export default ProfileCard;
