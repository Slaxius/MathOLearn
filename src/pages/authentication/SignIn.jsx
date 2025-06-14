import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WelcomeSection from "../../components/welcome.jsx";
import Button from "../../components/button.jsx";
import userDetail from "../../json/user_detail.json";
import "../../css/authentication/Authentication.css";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();

  const handleSignIn = () => {
    setUsernameError("");
    setPasswordError("");
    setGeneralError("");

    let isValid = true;

    if (!username.trim()) {
      setUsernameError("Please enter a username.");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Please enter a password.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    let foundUser = storedUsers.find(
      (user) => user.name.toLowerCase() === username.trim().toLowerCase()
    );

    if (!foundUser) {
      foundUser = userDetail.find(
        (user) => user.name.toLowerCase() === username.trim().toLowerCase()
      );
    }

    if (foundUser) {
      if (foundUser.password === password.trim()) {
        localStorage.setItem("username", foundUser.name);
        localStorage.setItem("profile_picture", foundUser.profile_picture);
        navigate("/learn");
      } else {
        setGeneralError("Invalid username or password.");
      }
    } else {
      setGeneralError("Invalid username or password.");
    }
  };

  return (
    <div className="signin">
      <WelcomeSection />
      <div className="right-side">
        <h1 className="header2">Sign In</h1>
        <div className="form-section">
          {generalError && (
            <div className="body2 general-err error">{generalError}</div>
          )}
          <div className="user-input">
            <img
              src="/assets/icon/black_username_icon.svg"
              alt="Username-icon"
            />
            <input
              type="text"
              placeholder="Username"
              className="body1"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setUsernameError("");
                setGeneralError("");
              }}
            />
          </div>
          {usernameError && (
            <div className="body2 username-err error">{usernameError}</div>
          )}
          <div className="user-input">
            <img
              src="/assets/icon/black_password_icon.svg"
              alt="Password-icon"
            />
            <input
              type="password"
              placeholder="Password"
              className="body1"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
                setGeneralError("");
              }}
            />
          </div>
          {passwordError && (
            <div className="body2 password-err error">{passwordError}</div>
          )}
          <div className="forgot-password">
            <Link to="/resetpassword" className="body2">
              Forgot Password?
            </Link>
          </div>
          <Button text="Sign In" onClick={handleSignIn} />
        </div>
        <p className="register-now body2">
          Don't have an account? Click here to{" "}
          <Link to="/signup" className="body2">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
