import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import "../../css/learn/Learn.css";
import Calendar from "../../components/calendar.jsx";
import LearnMaterial from "../../json/learn_material.json";
import BuyLifeSection from "../../components/buyLifeSection.jsx";
import { successAlert } from "../../utils/Toastify.jsx";
import { UserContext } from "../../utils/UserContext.jsx";

function Learn() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUsername = localStorage.getItem("username");
    const isFirstLogin = localStorage.getItem("firstLogin");

    let userDisplayName = loggedInUsername || "User";

    if (loggedInUsername && isFirstLogin === "true") {
      successAlert("Welcome, " + userDisplayName + "!");
      localStorage.setItem("firstLogin", "false");
    }
  }, []);

  const handleSubjectClick = (subject) => {
    navigate(`/learn/subject/${encodeURIComponent(subject)}`, {
      state: { subject: subject },
    });
  };

  const subjectNames = Object.keys(LearnMaterial);

  const { currentUserId } = useContext(UserContext);

  return (
    <div className="page">
      <Navbar />
      <Header />
      {currentUserId ? (
        <Calendar userId={currentUserId} />
      ) : (
        <p>Loading calendar...</p>
      )}
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
