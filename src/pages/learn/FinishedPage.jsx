import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import "../../css/learn/FinishedPage.css";

const FinishedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    if (location.state) {
      setResultData(location.state);
      try {
        sessionStorage.setItem(
          "exerciseResult",
          JSON.stringify(location.state)
        );
      } catch (e) {
        console.error("Failed to save result in sessionStorage:", e);
      }
    } else {
      try {
        const saved = sessionStorage.getItem("exerciseResult");
        if (saved) {
          setResultData(JSON.parse(saved));
        } else {
          navigate("/learn", { replace: true });
        }
      } catch (e) {
        console.error("Failed to load result from sessionStorage:", e);
        navigate("/learn", { replace: true });
      }
    }
  }, [location.state, navigate]);

  if (!resultData) {
    return (
      <div className="page">
        <Navbar />
        <Header />
        <div className="main-section finished">
          <div className="finished-container">
            <p>Loading results...</p>
          </div>
        </div>
      </div>
    );
  }

  const { title, correctAnswersCount, totalQuestions, type } = resultData;

  const scorePercentage = (correctAnswersCount / totalQuestions) * 100;

  let titleMessage = "";
  if (type === "exercise") {
    titleMessage = `You have completed the exercise: ${title}`;
  } else if (type === "quiz") {
    titleMessage =
      scorePercentage >= 60
        ? `You passed the quiz: ${title}`
        : `You failed to pass the quiz: ${title}`;
  }

  const handleBack = () => {
    navigate("/learn");
  };

  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section finished">
        <div className="finished-container">
          <div className="title-container">
            <h4 className="finished-title header3">{titleMessage}</h4>
            {correctAnswersCount === totalQuestions ? (
              <p className="perfect-score header3">With a perfect score!</p>
            ) : (
              <p className="score-details header3">
                You got {correctAnswersCount} out of {totalQuestions} correct.
                Your score: {scorePercentage.toFixed(2)}%
              </p>
            )}
          </div>
          <button className="back-page-btn boldBody1" onClick={handleBack}>
            BACK
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishedPage;
