import { useNavigate } from "react-router-dom";
import "../css/components/buyLifeSection.css";

const BuyLifeSection = () => {
  const navigate = useNavigate();

  const handleSectionClick = () => {
    navigate("/buyLife");
  };

  return (
    <div className="buy-section-container" onClick={handleSectionClick}>
      <p className="header5 buy-section-text">❤️ Need More Life?</p>
      <button className="subHeader buy-section-button">Click here to Top Up!</button>
    </div>
  );
};

export default BuyLifeSection;
