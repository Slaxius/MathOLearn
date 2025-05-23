import React from "react";
import "../css/comp/backButton.css";
import backButtonImg from "../assets/icon/back_button.svg";

function backButton() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="backButton-container">
      <button onClick={handleBack} className="backButton">
        <img src={backButtonImg} alt="back_button" />
      </button>
    </div>
  );
}

export default backButton;
