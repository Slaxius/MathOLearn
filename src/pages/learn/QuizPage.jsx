import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import Material from "../../json/learn_material.json";
import "../../css/learn/QuizPage.css";
import { useLife } from "../../utils/LifeContext.jsx";
import { errorAlert } from "../../utils/Toastify.jsx";

function QuizPage() {
  const { subject, itemId } = useParams();
  const subjectData = Material[subject.toLowerCase()];
  const quiz = subjectData.quizzes.find((e) => e.id === parseInt(itemId));
  const navigate = useNavigate();
  const { lives } = useLife();

  const lifeCheckPerformedRef = useRef(false);

  useEffect(() => {
    if (lives <= 0 && !lifeCheckPerformedRef.current) {
      lifeCheckPerformedRef.current = true;
      errorAlert(
        "You cannot take any Quiz if you have no lives remaining! Please top up."
      );
      navigate("/learn", { replace: true });
    }
  }, [lives, navigate]);

  if (!quiz || (lives <= 0 && !lifeCheckPerformedRef.current)) {
    return (
      <div className="page">
        <Navbar />
        <Header />
        <div className="main-section">
          <p className="body1">Loading quiz or redirecting...</p>
        </div>
      </div>
    );
  }

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(
    new Array(quiz.questions.length).fill(null)
  );

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (selectedQuestionIndex < quiz.questions.length - 1) {
      setSelectedQuestionIndex(selectedQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    const unansweredQuestionNumbers = [];
    answers.forEach((answer, index) => {
      if (answer === null) {
        unansweredQuestionNumbers.push(index + 1);
      }
    });

    if (unansweredQuestionNumbers.length > 0) {
      errorAlert(
        `Please answer all questions before submitting. Unanswered questions: ${unansweredQuestionNumbers.join(
          ", "
        )}.`
      );
      setSelectedQuestionIndex(unansweredQuestionNumbers[0] - 1);
      setCurrentQuestionClue(null);
      return;
    }

    const correctAnswersCount = quiz.questions.filter(
      (question, index) => answers[index] === question.correctAnswer
    ).length;

    const totalQuestions = quiz.questions.length;

    navigate(`/learn/subject/${subject}/quiz/${itemId}/finished`, {
      state: {
        title: quiz.title,
        correctAnswersCount,
        totalQuestions,
        type: "quiz",
      },
    });
  };

  const handleQuestionSelect = (index) => {
    setSelectedQuestionIndex(index);
  };

  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section">
        <div className="quiz-header">
          <h3 className="subject-title header3">{subject}</h3>
        </div>
        <div className="quiz-container">
          <h4 className="quiz-title header4">Quiz - {quiz.title}</h4>
          <div className="question-numbers-container">
            {quiz.questions.map((question, index) => {
              let className = "question-number-box boldBody1";

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
              key={quiz.questions[selectedQuestionIndex].id}
              className="question"
            >
              <div className="question-box">
                <div className="question-text-box">
                  <p className="question-text body1">
                    {quiz.questions[selectedQuestionIndex].question}
                  </p>
                </div>
                <div className="options-box">
                  {quiz.questions[selectedQuestionIndex].options.map(
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
              </div>
            </div>
          </div>
          <div className="submit-container">
            {selectedQuestionIndex < quiz.questions.length - 1 ? (
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

export default QuizPage;
