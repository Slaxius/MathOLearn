import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import "../../css/learn/FinishedPage.css";
import { useLife } from "../../utils/LifeContext.jsx";
import { errorAlert } from "../../utils/Toastify.jsx";
import jsPDF from "jspdf";

const FinishedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lives, deductLife } = useLife();

  const [resultData, setResultData] = useState(null);

  const effectRunRef = useRef(false);

  useEffect(() => {
    let currentResultData = null;
    if (location.state) {
      currentResultData = location.state;
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
          currentResultData = JSON.parse(saved);
        } else {
          navigate("/learn", { replace: true });
          return;
        }
      } catch (e) {
        console.error("Failed to load result from sessionStorage:", e);
        navigate("/learn", { replace: true });
        return;
      }
    }
    setResultData(currentResultData);
  }, [location.state, navigate]);

  useEffect(() => {
    if (resultData && resultData.type === "quiz" && !effectRunRef.current) {
      const { correctAnswersCount, totalQuestions } = resultData;
      const scorePercentage = (correctAnswersCount / totalQuestions) * 100;

      if (scorePercentage < 60) {
        effectRunRef.current = true;

        if (lives > 1) {
          deductLife();
          errorAlert("You failed the quiz! 1 life has been deducted.");
        } else if (lives === 1) {
          deductLife();
          errorAlert(
            "You failed the quiz and have no lives left! Please top up."
          );
        } else {
          errorAlert(
            "You failed the quiz and have no lives left! Please top up."
          );
        }
      }
    }
  }, [resultData, lives, deductLife]);

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

  const { title, correctAnswersCount, totalQuestions, type, exerciseData } =
    resultData;
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

  const handleDownloadExercise = () => {
    if (!exerciseData || !exerciseData.questions) {
      errorAlert("No exercise data available for download.");
      return;
    }

    const doc = new jsPDF();
    let yPos = 10;
    const margin = 10;
    const lineHeight = 6;
    const maxLineWidth = doc.internal.pageSize.getWidth() - 2 * margin;
    const pageCenter = doc.internal.pageSize.getWidth() / 2;

    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text(`Exercise: ${exerciseData.title}`, pageCenter, yPos, {
      align: "center",
    });
    yPos += lineHeight * 2;

    doc.setFontSize(12);
    doc.setFont(undefined, "normal");

    exerciseData.questions.forEach((q, index) => {
      if (
        yPos >
        doc.internal.pageSize.getHeight() -
          margin -
          lineHeight * (q.options.length + 2)
      ) {
        doc.addPage();
        yPos = margin;
      }

      doc.setFont(undefined, "normal");
      const questionNumberText = `${index + 1}. ${q.question}`;
      const questionTextLines = doc.splitTextToSize(
        questionNumberText,
        maxLineWidth
      );
      questionTextLines.forEach((line) => {
        doc.text(line, margin, yPos);
        yPos += lineHeight;
      });
      doc.setFont(undefined, "normal");

      q.options.forEach((option, optionIndex) => {
        const optionLabel = String.fromCharCode(65 + optionIndex);
        const optionText = `${optionLabel}. ${option}`;

        const isCorrectAnswer = optionIndex === q.correctAnswer;

        if (isCorrectAnswer) {
          doc.setFont(undefined, "bold");
        } else {
          doc.setFont(undefined, "normal");
        }

        const optionTextLines = doc.splitTextToSize(optionText, maxLineWidth);
        optionTextLines.forEach((line) => {
          doc.text(line, margin + 5, yPos);
          yPos += lineHeight;
        });
      });
      yPos += 5;
    });

    doc.save(`${exerciseData.title}_questions.pdf`);
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
          {type === "exercise" && (
            <button
              className="download-exercise btn boldBody1"
              onClick={handleDownloadExercise}
            >
              Download Exercise Case
            </button>
          )}
          <button className="back-page btn boldBody1" onClick={handleBack}>
            BACK
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishedPage;
