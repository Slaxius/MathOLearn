import React from "react";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import BackButton from "../../components/backButton.jsx";

function Feedback() {
  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section">
        <BackButton />
      </div>
    </div>
  );
}

export default Feedback;
