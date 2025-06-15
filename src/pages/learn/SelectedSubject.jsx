import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import "../../css/learn/SelectedSubject.css";
import Material from "../../json/learn_material.json";
import BackButton from "../../components/backButton.jsx";
import ContentSection from "../../components/subjectContentSection.jsx";

function SelectedSubject() {
  const { subject } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const currentSubject = subject || location.state?.subject;
  const subjectData = Material[currentSubject?.toLowerCase()];

  const handleSectionClick = (sectionType, itemId) => {
    const routes = {
      video: `/learn/subject/${encodeURIComponent(
        currentSubject
      )}/video/${itemId}`,
      cheatsheet: `/learn/subject/${encodeURIComponent(
        currentSubject
      )}/cheatsheet/${itemId}`,
      exercise: `/learn/subject/${encodeURIComponent(
        currentSubject
      )}/exercise/${itemId}/confirm`,
      quiz: `/learn/subject/${encodeURIComponent(
        currentSubject
      )}/quiz/${itemId}/confirm`,
    };

    navigate(routes[sectionType], {
      state: { subject: currentSubject, itemId },
    });
  };

  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section">
        <div className="subject-header">
          <div className="top-header">
            <div className="back-button">
              <BackButton />
            </div>
            <h3 className="subject-title header3">{currentSubject}</h3>
          </div>
        </div>
        <div className="subject-content">
          <ContentSection
            title="Video"
            items={subjectData.videos}
            type="video"
            onClick={(itemId) => handleSectionClick("video", itemId)}
          />
          <ContentSection
            title="Cheatsheet"
            items={subjectData.cheatsheets}
            type="cheatsheet"
            onClick={(itemId) => handleSectionClick("cheatsheet", itemId)}
          />
          <ContentSection
            title="Exercise"
            items={subjectData.exercises}
            type="exercise"
            onClick={(itemId) => handleSectionClick("exercise", itemId)}
          />
          <ContentSection
            title="Quiz"
            items={subjectData.quizzes}
            type="quiz"
            onClick={(itemId) => handleSectionClick("quiz", itemId)}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectedSubject;
