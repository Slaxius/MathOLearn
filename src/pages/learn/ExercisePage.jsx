import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import Material from "../../json/learn_material.json";
import "../../css/learn/ExercisePage.css";
import BackButton from "../../components/backButton.jsx";

function ExercisePage() {
  const { subject, itemId } = useParams();
  const subjectData = Material[subject.toLowerCase()];
  const exercise = subjectData.exercises.find((e) => e.id === parseInt(itemId));
  const navigate = useNavigate();

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(
    new Array(exercise.questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (selectedQuestionIndex < exercise.questions.length - 1) {
      setSelectedQuestionIndex(selectedQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    const incorrectAnswers = [];
    exercise.questions.forEach((question, index) => {
      if (answers[index] !== question.correctAnswer) {
        incorrectAnswers.push(index + 1);
      }
    });

    if (incorrectAnswers.length > 0) {
      alert(
        `Beberapa jawaban masih salah pada soal nomor: ${incorrectAnswers.join(
          ", "
        )}`
      );
      setSelectedQuestionIndex(incorrectAnswers[0] - 1);
    } else {
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (submitted) {
      navigate(`/finished/${subject}/${itemId}`);
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
