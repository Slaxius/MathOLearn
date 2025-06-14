import "../css/components/navbar.css";
import { Link, useLocation } from "react-router-dom";

function navbar() {
  const location = useLocation();
  const lightMode =
    JSON.parse(localStorage.getItem("preferences"))?.lightMode || false;

  const nav_item = [
    {
      id: 1,
      icon: lightMode
        ? "/assets/icon/black_learn_icon.svg"
        : "/assets/icon/white_learn_icon.svg",
      name: "Learn",
      link: "/learn",
    },
    {
      id: 2,
      icon: lightMode
        ? "/assets/icon/black_leaderboard_icon.svg"
        : "/assets/icon/white_leaderboard_icon.svg",
      name: "Leaderboard",
      link: "/leaderboard",
    },
    {
      id: 3,
      icon: lightMode
        ? "/assets/icon/black_forum_icon.svg"
        : "/assets/icon/white_forum_icon.svg",
      name: "Forum",
      link: "/forum",
    },
    {
      id: 4,
      icon: lightMode
        ? "/assets/icon/black_notification_icon.svg"
        : "/assets/icon/white_notification_icon.svg",
      name: "Notification",
      link: "/notification",
    },
    {
      id: 5,
      icon: lightMode
        ? "/assets/icon/black_profile_icon.svg"
        : "/assets/icon/white_profile_icon.svg",
      name: "Profile",
      link: "/profile",
    },
    {
      id: 6,
      icon: lightMode
        ? "/assets/icon/black_setting_icon.svg"
        : "/assets/icon/white_setting_icon.svg",
      name: "Setting",
      link: "/settings",
    },
  ];

  return (
    <div className="nav">
      <div className="top">
        <div className="logo-title">
          <img
            src={
              lightMode
                ? "/assets/icon/black_logo.svg"
                : "/assets/icon/white_logo.svg"
            }
            alt="MathOLearn Logo"
          />
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
