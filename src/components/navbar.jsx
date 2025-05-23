import MOLogo from "../assets/icon/linen_logo.svg";
import forumIcon from "../assets/icon/forum_icon.svg";
import leaderboardIcon from "../assets/icon/leaderboard_icon.svg";
import learnIcon from "../assets/icon/learn_icon.svg";
import notifIcon from "../assets/icon/notification_icon.svg";
import profileIcon from "../assets/icon/profile_icon.svg";
import settingIcon from "../assets/icon/setting_icon.svg";
import "../css/navbar.css";
import { Link, useLocation } from "react-router-dom";

function navbar() {
  const location = useLocation();

  const nav_item = [
    { id: 1, icon: learnIcon, name: "Learn", link: "/learn" },
    { id: 2, icon: leaderboardIcon, name: "Leaderboard", link: "/leaderboard" },
    { id: 3, icon: forumIcon, name: "Forum", link: "/forum" },
    { id: 4, icon: notifIcon, name: "Notification", link: "/notification" },
    { id: 5, icon: profileIcon, name: "Profile", link: "/profile" },
    { id: 6, icon: settingIcon, name: "Setting", link: "/settings" },
  ];

  return (
    <div className="nav">
      <div className="top">
        <div className="logo-title">
          <img src={MOLogo} alt="MathOLearn Logo" />
          <h1 className="navbarTitle">MathOLearn</h1>
        </div>
        <div className="nav-list">
          {nav_item.slice(0, 3).map((item) => (
            <Link
              to={item.link}
              key={item.id}
              className={`nav-item ${
                location.pathname.startsWith(item.link) ? "active" : ""
              }`}
            >
              <img src={item.icon} alt={item.name} className="nav-icon" />
              <span className="nav-name navbarText">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="nav-list">
        {nav_item.slice(3, 6).map((item) => (
          <Link
            to={item.link}
            key={item.id}
            className={`nav-item ${
              location.pathname.startsWith(item.link) ? "active" : ""
            }`}
          >
            <img src={item.icon} alt={item.name} className="nav-icon" />
            <span className="nav-name navbarText">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default navbar;
