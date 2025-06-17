import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button.jsx";
import "../../css/settings/Settings.css";
import settingsData from "../../json/settings.json";
import { useContext } from "react";
import { UserContext } from "../../utils/UserContext.jsx";

function Settings() {
  const navigate = useNavigate();
  const { setCurrentUserId } = useContext(UserContext);

  const handleSignOut = () => {
    const loggedOutUserId = localStorage.getItem("currentUserId");

    sessionStorage.clear();

    localStorage.removeItem("username");
    localStorage.removeItem("userBio");
    localStorage.removeItem("userPassword");
    localStorage.removeItem("profile_picture");
    localStorage.removeItem("firstLogin");
    localStorage.removeItem("currentUserId");

    if (loggedOutUserId) {
      localStorage.removeItem(`allActiveDays_${loggedOutUserId}`);
      localStorage.removeItem(`lastLogin_${loggedOutUserId}`);
      localStorage.removeItem(`lastActiveDate_${loggedOutUserId}`);
      localStorage.removeItem(`streakLength_${loggedOutUserId}`);
    }

    if (setCurrentUserId) {
      setCurrentUserId(null);
    }

    navigate("/signin");
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
          <Button text="Sign Out" onClick={handleSignOut} />
        </div>
      </div>
    </div>
  );
}

export default Settings;
