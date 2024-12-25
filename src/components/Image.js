import React, { useState } from "react";
import "../css/MyCertificates.css";

function Image({ link }) {
  const [imgStyle, setImgStyle] = useState({
    width: "640px",
    height: "360px"
  });
  const [checkClick, setCheckClick] = useState(false);

  function enlargeImg() {
    setImgStyle({
      scale: "1.8",
      transform: "0.25s ease"
    });
    setCheckClick(false);
  }

  function resetImg() {
    setImgStyle({
      scale: "1",
      transform: "0.25s ease",
      width: "640px",
      height: "360px"
    });
    setCheckClick(true);
  }
  return (
    <div className="mytests">
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
