import React from "react";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import { useState } from "react";
import BackButton from "../../components/backButton.jsx";
import Toggle from "../../components/toggle.jsx";
import "../../css/SettingsAccount.css";

function Preferences() {
  const preferencesSettings = [
    {
      name: "Background Music",
      key: "backgroundMusic",
      defaultValue: true,
    },
  ];

  const [settings, setSettings] = useState(
    preferencesSettings.reduce((acc, option) => {
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
        <div className="account-settings">
          <h2 className="settings-title header3">Preferences</h2>
          <div className="settings-list">
            {preferencesSettings.map((setting) => (
              <Toggle
                key={setting.key}
                label={setting.name}
                isOn={settings[setting.key]}
                onToggle={() => handleToggle(setting.key)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preferences;
