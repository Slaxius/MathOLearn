import MOLogo from "../assets/icon/linen_logo.svg";
import forumIcon from "../assets/icon/forum_icon.svg"
import leaderboardIcon from "../assets/icon/leaderboard_icon.svg"
import learnIcon from "../assets/icon/learn_icon.svg"
import notifIcon from "../assets/icon/notification_icon.svg"
import profileIcon from "../assets/icon/profile_icon.svg"
import settingIcon from "../assets/icon/setting_icon.svg"
import "../css/navbar.css";

function navbar() {
  const nav_item = [
    {id: 1, icon: learnIcon, name: "Learn"},
    {id: 2, icon: leaderboardIcon, name: "Leaderboard"},
    {id: 3, icon: forumIcon, name: "Forum"},
    {id: 4, icon: notifIcon, name: "Notification"},
    {id: 5, icon: profileIcon, name: "Profile"},
    {id: 6, icon: settingIcon, name: "Setting"},
  ];

  return (
    <div className="nav">
      <div className="top">
        <div className="logo-title">
          <img src={MOLogo} alt="MathOLearn Logo" />
          <h1 id="navbarTitle">MathOLearn</h1>
        </div>
        <div className="nav-list">
          {nav_item.slice(0, 3).map((item) => (
            <div key={item.id} className="nav-item">
              <img src={item.icon} alt={item.name} className="nav-icon" />
              <span className="nav-name" id="navbarText">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="nav-list">
        {nav_item.slice(3, 6).map((item) => (
          <div key={item.id} className="nav-item">
            <img src={item.icon} alt={item.name} className="nav-icon" />
            <span className="nav-name"id="navbarText">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default navbar;
