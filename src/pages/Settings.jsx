import Navbar from "../components/navbar.jsx";
import Header from "../components/header.jsx";
import { Link } from "react-router-dom";
import Button from "../components/button.jsx";
import "../css/Settings.css";
import settingsData from "../json/settings.json"

function Settings() {
  const handleSignOut = () => {
    sessionStorage.clear();
    window.location.href = "/signin";
  };

  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section">
        <div className="setting-section">
          {settingsData.map((section, index) => (
            <div className="settings-section" key={index}>
              <div className="options">
                <h1 className="header5">{section.title}</h1>
                {section.options.map((option, idx) => (
                  <Link
                    to={option.link}
                    key={idx}
                    className="options-button body1"
                  >
                    {option.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="sign-out">
          <Button link="/signin" text="Sign Out" onClick={handleSignOut} />
        </div>
      </div>
    </div>
  );
}

export default Settings;
