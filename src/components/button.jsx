import "../css/components/button.css";
import { useNavigate } from "react-router-dom";

function button({ link, text, onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (link) {
      navigate(link);
    }
  };

  return (
    <button className="button body1" onClick={handleClick}>
      {text}
    </button>
  );
}

export default button;
