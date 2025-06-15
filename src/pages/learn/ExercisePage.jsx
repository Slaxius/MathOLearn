import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import Material from "../../json/learn_material.json";
import "../../css/learn/ExercisePage.css";
import BackButton from "../../components/backButton.jsx";
import { errorAlert } from "../../utils/Toastify.jsx";

function ExercisePage() {
  const { subject, itemId } = useParams();
  const subjectData = Material[subject.toLowerCase()];
  const exercise = subjectData
    ? subjectData.exercises.find((e) => e.id === parseInt(itemId))
    : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!exercise) {
      navigate("/learn");
    }
  }, [exercise, navigate]);

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(
    exercise ? new Array(exercise.questions.length).fill(null) : []
  );
  const [submitted, setSubmitted] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(
    exercise ? new Array(exercise.questions.length).fill(null) : []
  );
  const [currentQuestionClue, setCurrentQuestionClue] = useState(null);

  if (!exercise) {
    return (
      <div className="page">
        <Navbar />
        <Header />
        <div className="main-section">
          <p className="body1">Exercise not found.</p>
        </div>
      </div>
    );
  }

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (selectedQuestionIndex < exercise.questions.length - 1) {
      setSelectedQuestionIndex(selectedQuestionIndex + 1);
      if (
        submitted &&
        answerStatus[selectedQuestionIndex + 1] === "incorrect"
      ) {
        setCurrentQuestionClue(
          exercise.questions[selectedQuestionIndex + 1].clue
        );
      } else {
        setCurrentQuestionClue(null);
      }
    }
  };

  const handleSubmit = () => {
    const newAnswerStatus = [...answerStatus];
    const incorrectQuestionNumbers = [];

    exercise.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        newAnswerStatus[index] = "correct";
      } else {
        newAnswerStatus[index] = "incorrect";
        incorrectQuestionNumbers.push(index + 1);
      }
    });

    setAnswerStatus(newAnswerStatus);
    setSubmitted(true);

    if (incorrectQuestionNumbers.length > 0) {
      errorAlert(
        `Some answers are still incorrect for question numbers: ${incorrectQuestionNumbers.join(
          ", "
        )}`
      );

      const firstIncorrectIndex = incorrectQuestionNumbers[0] - 1;
      setSelectedQuestionIndex(firstIncorrectIndex);
      setCurrentQuestionClue(exercise.questions[firstIncorrectIndex].clue);
    } else {
      const correctAnswersCount = exercise.questions.filter(
        (question, index) => answers[index] === question.correctAnswer
      ).length;

      const totalQuestions = exercise.questions.length;

      const state = {
        title: exercise.title,
        correctAnswersCount,
        totalQuestions,
        type: "exercise",
      };

      try {
        sessionStorage.setItem("exerciseResult", JSON.stringify(state));
      } catch (e) {
        console.error("Failed to save result in sessionStorage:", e);
      }

      navigate(`/learn/subject/${subject}/exercise/${itemId}/finished`, {
        state,
      });
    }
  };

  const handleQuestionSelect = (index) => {
    setSelectedQuestionIndex(index);
    if (submitted && answerStatus[index] === "incorrect") {
      setCurrentQuestionClue(exercise.questions[index].clue);
    } else {
      setCurrentQuestionClue(null);
    }
  };

  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section">
        <div className="exercise-header">
          <div className="back-button">
            <BackButton />
          </div>
          <h3 className="subject-title header3">{subject}</h3>
        </div>
        <div className="exercise-container">
          <h4 className="exercise-title header4">
            Exercise - {exercise.title}
          </h4>
          <div className="question-numbers-container">
            {exercise.questions.map((question, index) => {
              let className = "question-number-box boldBody1";

              if (submitted) {
                if (answerStatus[index] === "correct") {
                  className += " correct";
                } else if (answerStatus[index] === "incorrect") {
                  className += " incorrect";
                }
              }

              if (index === selectedQuestionIndex) {
                className += " active";
              }

              return (
                <button
                  key={index}
                  className={className}
                  onClick={() => handleQuestionSelect(index)}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
          <div className="questions-container">
            <div
              key={exercise.questions[selectedQuestionIndex].id}
              className="question"
            >
              <div className="question-box">
                <div className="question-text-box">
                  <p className="question-text body1">
                    {exercise.questions[selectedQuestionIndex].question}
                  </p>
                </div>
                <div className="options-box">
                  {exercise.questions[selectedQuestionIndex].options.map(
                    (option, optionIndex) => (
                      <button
                        key={optionIndex}
                        className={`option-btn body1 ${
                          answers[selectedQuestionIndex] === optionIndex
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          handleAnswerChange(selectedQuestionIndex, optionIndex)
                        }
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
                {submitted &&
                  answerStatus[selectedQuestionIndex] === "incorrect" &&
                  exercise.questions[selectedQuestionIndex].clue && (
                    <div className="clue-box">
                      <p className="clue-text body2">
                        <span className="clue boldBody2">Clue:</span>{" "}
                        {exercise.questions[selectedQuestionIndex].clue}
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className="submit-container">
            {selectedQuestionIndex < exercise.questions.length - 1 ? (
              <button className="submit-btn body1" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button className="submit-btn body1" onClick={handleSubmit}>
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExercisePage;
