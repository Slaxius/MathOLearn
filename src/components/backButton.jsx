import "../css/comp/backButton.css";

function backButton() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="backButton-container">
      <button onClick={handleBack} className="backButton">
        <img src="/assets/icon/green_backButton.svg" alt="back_button" />
      </button>
    </div>
  );
}

export default backButton;
