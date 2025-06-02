import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Header from "../components/header.jsx";
import "../css/Learn.css";
import Calendar from "../components/calendar.jsx";
import Subject from "../json/subject.json";

function Learn() {
  const navigate = useNavigate();

  const handleSubjectClick = (subject) => {
    navigate(`/learn/subject/${encodeURIComponent(subject)}`, {
      state: { subject: subject },
    });
  };

  return (
    <div className="page">
      <Navbar />
      <Header />
      <Calendar />
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
