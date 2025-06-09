import "../css/comp/navbar.css";
import { Link, useLocation } from "react-router-dom";

function navbar() {
  const location = useLocation();

  const nav_item = [
    { id: 1, icon: "/assets/icon/learn_icon.svg", name: "Learn", link: "/learn" },
    { id: 2, icon: "/assets/icon/leaderboard_icon.svg", name: "Leaderboard", link: "/leaderboard" },
    { id: 3, icon: "/assets/icon/forum_icon.svg", name: "Forum", link: "/forum" },
    { id: 4, icon: "/assets/icon/notification_icon.svg", name: "Notification", link: "/notification" },
    { id: 5, icon: "/assets/icon/profile_icon.svg", name: "Profile", link: "/profile" },
    { id: 6, icon: "/assets/icon/setting_icon.svg", name: "Setting", link: "/settings" },
  ];

  return (
    <div className="nav">
      <div className="top">
        <div className="logo-title">
          <img src="/assets/icon/logo.svg" alt="MathOLearn Logo" />
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
