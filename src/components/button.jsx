import "../css/components/button.css";

function button({ link, text, onClick }) {
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
