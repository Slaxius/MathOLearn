import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import { useState } from "react";
import BackButton from "../../components/backButton.jsx";
import Toggle from "../../components/toggle.jsx";
import "../../css/settingsSubpage/SettingsAccount.css";
import privacySettings from "../../json/settings_privacy.json";

function Privacy() {
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
        <div className="account-settings">
          <h2 className="settings-title header3">Privacy Settings</h2>
          <div className="settings-list">
            {privacySettings.map((setting) => (
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

export default Privacy;
