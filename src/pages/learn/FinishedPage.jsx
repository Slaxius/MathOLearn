import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import "../../css/learn/FinishedPage.css";

function FinishedPage() {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("Location State:", location.state);

  const { title, correctAnswersCount, totalQuestions, type } =
    location.state || {};

  console.log(location.state);

  const scorePercentage = (correctAnswersCount / totalQuestions) * 100;

  let titleMessage = "";
  if (type === "exercise") {
    titleMessage = `You have completed the exercise: ${title}`;
  } else if (type === "quiz") {
    if (scorePercentage >= 60) {
      titleMessage = `You passed the quiz: ${title}`;
    } else {
      titleMessage = `You failed to pass the quiz: ${title}`;
    }
  }

  const handleBack = () => {
    navigate("/learn");
  };

  console.log(location.state);

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
}

export default FinishedPage;
