import { useState } from "react";
import WelcomeSection from "../components/welcome.jsx";
import Button from "../components/button.jsx";
import UsernameIcon from "../assets/icon/username_icon.svg";
import PasswordIcon from "../assets/icon/password_icon.svg";
import "../css/SignIn.css";

function App() {
  return (
    <div className="signin">
      <WelcomeSection />
      <div className="right-side">
        <h1 id="header2">Sign In</h1>
        <div className="form-section">
          <div className="user-input">
            <img src={UsernameIcon} alt="Username-icon" />
            <input type="text" placeholder="Username" id="body1" />
          </div>
          <div className="user-input">
            <img src={PasswordIcon} alt="Password-icon" />
            <input type="password" placeholder="Password" id="body1" />
          </div>
          <div className="forgot-password">
            <a href="" id="body2">
              Forgot Password?
            </a>
          </div>
          <Button link="" text="Sign In" />
        </div>
        <p id="body2" className="register-now">
          Don't have an account? Click here to{" "}
          <a href="" id="body2">
            Register now
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
