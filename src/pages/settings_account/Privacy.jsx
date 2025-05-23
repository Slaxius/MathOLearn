import React from "react";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import { useState } from "react";
import BackButton from "../../components/backButton.jsx";

function Privacy() {
  const privacySettings = [
    {
      name: "Make my profile public",
      key: "isProfilePublic",
      defaultValue: true,
    },
  ];

  const [settings, setSettings] = useState(
    privacySettings.reduce((acc, option) => {
      acc[option.key] = option.defaultValue;
      return acc;
    }, {})
  );

  const handleToggle = (key) => {
    setSettings((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section">
        <BackButton />
        {privacySettings.map((option) => (
          <div className="privacy-option" key={option.key}>
            <label>
              <span>{option.name}</span>
              <input
                type="checkbox"
                checked={settings[option.key]}
                onChange={() => handleToggle(option.key)}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Privacy;
