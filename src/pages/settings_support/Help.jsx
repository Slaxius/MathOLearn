import React from "react";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import BackButton from "../../components/backButton.jsx";

function Help() {
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

export default Help;
