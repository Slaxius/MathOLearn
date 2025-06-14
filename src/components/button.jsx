import "../css/components/button.css";
import { Link } from "react-router-dom";

function button({ link, text, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link to={link} className="button body1" onClick={handleClick}>
      {text}
    </Link>
  );
}

export default button;
