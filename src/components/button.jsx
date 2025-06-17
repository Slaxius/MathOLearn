import "../css/components/button.css";
import { useNavigate } from "react-router-dom";

function Button({ link, text, onClick }) { 
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
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

export default Button;