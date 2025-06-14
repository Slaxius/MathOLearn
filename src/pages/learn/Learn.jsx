import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import "../../css/learn/Learn.css";
import Calendar from "../../components/calendar.jsx";
import Subject from "../../json/subject.json";
import UserDetail from "../../json/user_detail.json";

function Learn() {
  const navigate = useNavigate();

  const [currentUserLastLogin, setCurrentUserLastLogin] = useState(null);

  useEffect(() => {
    const loggedInUser = UserDetail.find((user) => user.id === 1);

    if (loggedInUser) {
      setCurrentUserLastLogin(loggedInUser.last_login_date);
    }
  }, []);

  const handleSubjectClick = (subject) => {
    navigate(`/learn/subject/${encodeURIComponent(subject)}`, {
      state: { subject: subject },
    });
  };

  return (
    <div className="page">
      <Navbar />
      <Header />
      <Calendar lastLoginDateFromUser={currentUserLastLogin} />
      <div className="main-section learn">
        <div className="subject-section">
          {Subject.map((sub, idx) => (
            <button
              key={idx}
              value={sub.subject}
              className="subject-bubble header5"
              onClick={() => handleSubjectClick(sub.subject)}
            >
              {sub.subject}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Learn;
