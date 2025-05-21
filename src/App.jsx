import { useState } from "react";
import MOLogo from "./assets/linen_logo.svg";
import "./css/App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={MOLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>MathOLearn</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
