import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WelcomeSection from "../../components/welcome.jsx";
import Button from "../../components/button.jsx";
import userDetail from "../../json/user_detail.json";
import "../../css/authentication/Authentication.css";
import { successAlert } from "../../utils/Toastify.jsx";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = () => {
    setUsernameError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setGeneralError("");

    let isValid = true;

    if (!username.trim()) {
      setUsernameError("Username is required.");
      isValid = false;
    } else if (username.trim().includes(" ")) {
      setUsernameError("Username cannot contain spaces.");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Confirm Password is required.");
      isValid = false;
    } else if (password.trim() !== confirmPassword.trim()) {
      setConfirmPasswordError("Password and Confirm Password do not match.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const inputUsernameLower = username.trim().toLowerCase();
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    let usernameExists = false;

    if (
      storedUsers.some((user) => user.name.toLowerCase() === inputUsernameLower)
    ) {
      usernameExists = true;
    }

    if (!usernameExists) {
      const userInDetailJson = userDetail.find(
        (user) => user.name.toLowerCase() === inputUsernameLower
      );

      if (userInDetailJson) {
        const userMigratedAndRenamed = storedUsers.some(
          (storedUser) =>
            storedUser.id === userInDetailJson.id &&
            storedUser.name.toLowerCase() !== inputUsernameLower
        );

        if (!userMigratedAndRenamed) {
          usernameExists = true;
        }
      }
    }

    if (usernameExists) {
      setGeneralError("Username already exists.");
      return;
    }

    const getMaxId = (usersArray) => {
      if (usersArray.length === 0) return 0;
      const ids = usersArray.map((user) => user.id);
      return Math.max(...ids);
    };

    const allKnownUsersForIdCalculation = [...userDetail, ...storedUsers];
    const newUserId = getMaxId(allKnownUsersForIdCalculation) + 1;

    const newUser = {
      id: newUserId,
      profile_picture: "/assets/icon/black_username_icon.svg",
      name: username.trim(),
      password: password.trim(),
      bio: "New user at MathOLearn",
    };

    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.setItem("signedUp", "true");
    navigate("/signin");
  };

  return (
    <div className="signin">
      <WelcomeSection />
      <div className="right-side">
        <h1 className="header2">Sign Up</h1>
        <div className="form-section">
          {generalError && (
            <div className="general-err error">{generalError}</div>
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
            <div className="create-username-err error body2">
              {usernameError}
            </div>
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
            <div className="create-password-err error body2">
              {passwordError}
            </div>
          )}
          <div className="user-input">
            <img
              src="/assets/icon/black_password_icon.svg"
              alt="Password-icon"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="body1"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError("");
                setGeneralError("");
              }}
            />
          </div>
          {confirmPasswordError && (
            <div className="cornfirm-password-err error body2">
              {confirmPasswordError}
            </div>
          )}
          <Button text="Sign Up" onClick={handleSignUp} />
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
