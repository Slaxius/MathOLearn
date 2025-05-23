import React from "react";
import MOLogo from "../assets/icon/linen_logo.svg";
import "../css/comp/welcome.css";

function welcome() {
  return (
    <div className="left-side">
      <img src={MOLogo} alt="MathOLearn Logo" />
      <div className="welcome-text">
        <h1 className="header1">Welcome!</h1>
        <span className="line"></span>
        <p className="body2">
          Explore the beauty and logic of mathematics, where<br></br> every
          problem has a solution waiting to be discovered!
        </p>
      </div>
    </div>
  );
}

export default welcome;
