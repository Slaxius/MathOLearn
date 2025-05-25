import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WelcomeSection from "../../components/welcome.jsx";
import Button from "../../components/button.jsx";
import UsernameIcon from "../../assets/icon/username_icon.svg";
import PasswordIcon from "../../assets/icon/password_icon.svg";
import "../../css/auth/Authentication.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = () => {
    localStorage.setItem("username", username);
    navigate("/learn");
  };

  return (
    <div className="signin">
      <WelcomeSection />
      <div className="right-side">
        <h1 className="header2">Sign In</h1>
        <div className="form-section">
          <div className="user-input">
            <img src={UsernameIcon} alt="Username-icon" />
            <input
              type="text"
              placeholder="Username"
              className="body1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="user-input">
            <img src={PasswordIcon} alt="Password-icon" />
            <input
              type="password"
              placeholder="Password"
              className="body1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="forgot-password">
            <Link to="/resetpassword" className="body2">
              Forgot Password?
            </Link>
          </div>
          <Button link="/learn" text="Sign In" onClick={handleSignIn} />
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

export default App;
