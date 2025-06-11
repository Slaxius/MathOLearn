import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import { useState, useEffect } from "react";
import BackButton from "../../components/backButton.jsx";
import Toggle from "../../components/toggle.jsx";
import "../../css/settingsSubpage/SettingsAccount.css";
import preferencesSettings from "../../json/settings_preference.json";

import { useMusic } from "../../utils/MusicProvider.jsx";

function Preferences() {
  const { backgroundMusic, toggleMusic } = useMusic();

  const [settings, setSettings] = useState(() => {
    const storedSettings = localStorage.getItem("preferences");
    return storedSettings
      ? JSON.parse(storedSettings)
      : preferencesSettings.reduce((acc, option) => {
          acc[option.key] = option.defaultValue;
          return acc;
        }, {});
  });

  const handleToggle = (key) => {
    setSettings((prevState) => {
      const newSettings = { ...prevState, [key]: !prevState[key] };

      localStorage.setItem("preferences", JSON.stringify(newSettings));

      if (key === "lightMode") {
        if (newSettings[key]) {
          document.documentElement.classList.add("light-mode");
        } else {
          document.documentElement.classList.remove("light-mode");
        }
      }

      return newSettings;
    });

    if (key === "backgroundMusic") {
      toggleMusic(); // Memanggil toggle untuk backgroundMusic
    }
  };

  useEffect(() => {
    if (settings.lightMode) {
      document.documentElement.classList.add("light-mode");
    } else {
      document.documentElement.classList.remove("light-mode");
    }
  }, [settings.lightMode]);

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
                onToggle={() => handleToggle(setting.key)} // Handle toggle
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preferences;
