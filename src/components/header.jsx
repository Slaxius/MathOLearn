import "../css/components/header.css";
import { useState } from "react";

function header() {
  const username = localStorage.getItem("username");

  const [hearts, setHearts] = useState([false, true, true, true]);

  // const handleQuizFailure = () => {
  //   const newHearts = [...hearts];
  //   const firstRedHeartIndex = newHearts.indexOf(true);
  //   if (firstRedHeartIndex !== -1) {
  //     newHearts[firstRedHeartIndex] = false;
  //     setHearts(newHearts);
  //   }
  // };

  return (
    <div className="header">
      <h5 className="greet header5">Hi, Student <span className="greetName">{username}</span>!</h5>
      <div className="life">
        {hearts.map((heart, index) => (
          <span key={index} className="heart-status">
            <img
              src={heart ? "/assets/icon/red_heart.svg" : "/assets/icon/gray_heart.svg"}
              alt={heart ? "alive-heart" : "dead-heart"}
              className="heart-icon"
            />
          </span>
        ))}
        <span className="life-text body5">
          You will lose 1 life point if you fail to pass the quiz taken.
        </span>
      </div>
    </div>
  );
}

export default header;
