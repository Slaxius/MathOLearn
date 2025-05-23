import "../css/comp/button.css";
import { Link } from "react-router-dom";

function button({ link, text, onClick }) {
  return (
    <Link to={link} className="button body1" onClick={onClick}>
      {text}
    </Link>
  );
}

export default button;
