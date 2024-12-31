import React from "react";
import "../css/Finish.css";

function Finish({ score }) {
  return (
    <div className="finish-container">
      <h1>Finished !!!</h1>
      <h2>score: {score}</h2>
    </div>
  );
}

export default Finish;
