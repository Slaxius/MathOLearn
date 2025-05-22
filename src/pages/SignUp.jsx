import React from "react";
import { Link } from "react-router-dom";
import WelcomeSection from "../components/welcome.jsx";
import Button from "../components/button.jsx";
import UsernameIcon from "../assets/icon/username_icon.svg";
import PasswordIcon from "../assets/icon/password_icon.svg";
import "../css/SignNReset.css";

function SignUp() {
  return (
    <div className="signin">
      <WelcomeSection />
      <div className="right-side">
        <h1 className="header2">Sign Up</h1>
        <div className="form-section">
          <div className="user-input">
            <img src={UsernameIcon} alt="Username-icon" />
            <input type="text" placeholder="Username" className="body1" />
          </div>
          <div className="user-input">
            <img src={PasswordIcon} alt="Password-icon" />
            <input type="password" placeholder="Password" className="body1" />
          </div>
          <div className="user-input">
            <img src={PasswordIcon} alt="Password-icon" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="body1"
            />
          </div>
          <Button link="/signin" text="Sign Up" />
        </div>
        <p className="register-now body2">
          Already have account? Click here to{" "}
          <Link to="/signin" className="body2">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
