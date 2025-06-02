import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, FileText, PenTool, Lock } from "lucide-react";
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

  const handleSectionClick = (sectionType) => {
    const routes = {
      video: `/learn/${encodeURIComponent(currentSubject)}/video`,
      cheatsheet: `/learn/${encodeURIComponent(currentSubject)}/cheatsheet`,
      exercise: `/learn/${encodeURIComponent(currentSubject)}/exercise`,
      quiz: `/learn/${encodeURIComponent(currentSubject)}/quiz`,
    };

    navigate(routes[sectionType], {
      state: { subject: currentSubject },
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
            onClick={handleSectionClick("video")}
          />
          <ContentSection
            title="Cheatsheet"
            items={subjectData.cheatsheets}
            type="cheatsheet"
            onClick={handleSectionClick("cheatsheet")}
          />
          <ContentSection
            title="Exercise"
            items={subjectData.exercises}
            type="exercise"
            onClick={handleSectionClick("exercise")}
          />
          <ContentSection
            title="Quiz"
            items={subjectData.quizzes}
            type="quiz"
            onClick={handleSectionClick("quiz")}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectedSubject;
