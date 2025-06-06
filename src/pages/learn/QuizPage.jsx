import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import Material from "../../json/learn_material.json";
import "../../css/learn/QuizPage.css";
import BackButton from "../../components/backButton.jsx";

function QuizPage() {
  const { subject, itemId } = useParams();
  const subjectData = Material[subject.toLowerCase()];
  const quiz = subjectData.quizzes.find((e) => e.id === parseInt(itemId));
  const navigate = useNavigate();

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(
    new Array(quiz.questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

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
    const correctAnswersCount = quiz.questions.filter(
      (question, index) => answers[index] === question.correctAnswer
    ).length;

    const totalQuestions = quiz.questions.length;

    console.log(quiz.title, correctAnswersCount, totalQuestions, "quiz");
    navigate(`/learn/subject/${subject}/quiz/${itemId}/finished`, {
      state: {
        title: quiz.title,
        correctAnswersCount,
        totalQuestions,
        type: "quiz",
      },
    });

    setSubmitted(true);
  };

  useEffect(() => {
    if (submitted) {
      navigate(`/learn/subject/${subject}/quiz/${itemId}/finished`);
    }
  }, [submitted, navigate, subject, itemId]);

  const handleQuestionSelect = (index) => {
    setSelectedQuestionIndex(index);
  };

  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section">
        <div className="quiz-header">
          <div className="back-button">
            <BackButton />
          </div>
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
