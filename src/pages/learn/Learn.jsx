import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import "../../css/learn/Learn.css";
import Calendar from "../../components/calendar.jsx";
import LearnMaterial from "../../json/learn_material.json";
import UserDetail from "../../json/user_detail.json";
import BuyLifeSection from "../../components/buyLifeSection.jsx";
import { successAlert } from "../../utils/Toastify.jsx";

function Learn() {
  const navigate = useNavigate();

  const [currentUserLastLogin, setCurrentUserLastLogin] = useState(null);

  useEffect(() => {
    const loggedInUsername = localStorage.getItem("username");
    const isFirstLogin = localStorage.getItem("firstLogin");

    let userDisplayName = loggedInUsername || "User";

    if (loggedInUsername && isFirstLogin === "true") {
      successAlert("Welcome, " + userDisplayName + "!");
      localStorage.setItem("firstLogin", "false");
    }

    const loggedInUserFromDetail = UserDetail.find(
      (user) => user.name.toLowerCase() === loggedInUsername?.toLowerCase()
    );
    if (loggedInUserFromDetail) {
      setCurrentUserLastLogin(loggedInUserFromDetail.last_login_date);
    }
  }, []);

  const handleSubjectClick = (subject) => {
    navigate(`/learn/subject/${encodeURIComponent(subject)}`, {
      state: { subject: subject },
    });
  };

  const subjectNames = Object.keys(LearnMaterial);

  return (
    <div className="page">
      <Navbar />
      <Header />
      <Calendar lastLoginDateFromUser={currentUserLastLogin} />
      <BuyLifeSection />
      <div className="main-section learn">
        <div className="subject-section">
          {subjectNames.map((subjectName, idx) => (
            <button
              key={idx}
              value={subjectName}
              className="subject-bubble header5"
              onClick={() => handleSubjectClick(subjectName)}
            >
              {subjectName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Learn;
