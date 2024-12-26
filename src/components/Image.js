import React, { useState } from "react";
import "../css/Image.css";

function Image({ link }) {
  const [imgStyle, setImgStyle] = useState({
    width: "640px",
    height: "360px"
  });
  const [checkClick, setCheckClick] = useState(false);

  function enlargeImg() {
    setImgStyle({
      scale: "1.4",
      // transform: "0.25s ease",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) scale(1.4)",
      zIndex: 1000000,
      border: "2px solid var(--color2)"
    });
    setCheckClick(false);
  }

  function resetImg() {
    setImgStyle({
      transition: "transform 0.25s ease",
      position: "static",
      top: "unset",
      left: "unset",
      transform: "none",
      width: "640px",
      height: "360px",
      zIndex: "unset"
    });
    setCheckClick(true);
  }
  return (
    <div className="myImage">
      <img
        className="image"
        src={link}
        alt="code"
        onClick={checkClick ? enlargeImg : resetImg}
        style={imgStyle}
      />
    </div>
  );
}

export default Image;
