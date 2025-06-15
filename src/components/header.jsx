import "../css/components/header.css";
import { useLife } from "../utils/LifeContext.jsx";

function header() {
  const username = localStorage.getItem("username");
  const { lives } = useLife();

  const heartStatusArray = Array.from(
    { length: 4 },
    (_, index) => index < lives
  );

  return (
    <div className="header">
      <h5 className="greet header5">
        Hi, Student <span className="greetName">{username}</span>!
      </h5>
      <div className="life">
        {heartStatusArray.map((isAlive, index) => (
          <span key={index} className="heart-status">
            <img
              src={
                isAlive
                  ? "/assets/icon/red_heart.svg"
                  : "/assets/icon/gray_heart.svg"
              }
              alt={isAlive ? "alive-heart" : "dead-heart"}
              className="heart-icon"
            />
          </span>
        ))}
        <span className="life-text body5">
          You will lose 1 life point if you fail a quiz. Furthermore, you cannot
          take any Exercise or Quiz if you have lost all your lives.
        </span>
      </div>
    </div>
  );
}

export default header;
