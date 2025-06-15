import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import Material from "../../json/learn_material.json";
import "../../css/learn/ConfirmationPage.css";

function ConfirmationPage() {
  const { subject, type, itemId } = useParams();
  const navigate = useNavigate();
  const [materialTitle, setMaterialTitle] = useState("");

  useEffect(() => {
    const subjectData = Material[subject.toLowerCase()];
    let foundMaterial = null;

    if (subjectData) {
      if (type === "exercise" && subjectData.exercises) {
        foundMaterial = subjectData.exercises.find(
          (e) => e.id === parseInt(itemId)
        );
      } else if (type === "quiz" && subjectData.quizzes) {
        foundMaterial = subjectData.quizzes.find(
          (q) => q.id === parseInt(itemId)
        );
      }
    }

    if (foundMaterial) {
      setMaterialTitle(foundMaterial.title);
    } else {
      navigate("/learn");
    }
  }, [subject, type, itemId, navigate]);

  const handleStart = () => {
    navigate(`/learn/subject/${subject}/${type}/${itemId}`);
  };

  const handleGoBack = () => {
    navigate(`/learn/subject/${subject}`);
  };

  if (!materialTitle) {
    return (
      <div className="page">
        <Navbar />
        <Header />
        <div className="main-section">
          <p className="body1">Loading or material not found...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section confirmation">
        <div className="confirmation-header">
          <h3 className="subject-title header3">{subject}</h3>
        </div>
        <div className="confirmation-container">
          <h4 className="confirmation-title header4">
            Confirm to Start {type === "exercise" ? "Exercise" : "Quiz"}
          </h4>
          <p className="confirmation-message body1">
            Are you sure you want to start{" "}
            {type === "exercise" ? "Exercise" : "Quiz"}{" "}
            <span className="material-title">"{materialTitle}"</span>?
          </p>
          <div className="confirmation-actions">
            <button className="confirm-btn body1" onClick={handleStart}>
              Start {type === "exercise" ? "Exercise" : "Quiz"}
            </button>
            <button className="back-btn body1" onClick={handleGoBack}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;
