import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WelcomeSection from "../../components/welcome.jsx";
import Button from "../../components/button.jsx";
import userDetail from "../../json/user_detail.json";
import "../../css/authentication/Authentication.css";
import { successAlert } from "../../utils/Toastify.jsx";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const isPasswordChangedFlag = localStorage.getItem("changePassword");
    const userWhoChangedPassword = localStorage.getItem("userChangePassword");

    if (isPasswordChangedFlag === "true") {
      successAlert(
        "Password reset successfully for " + userWhoChangedPassword + "!"
      );
      localStorage.removeItem("changePassword");
      localStorage.removeItem("userChangePassword");
    }

    const newUserSignedUpFlag = localStorage.getItem("signedUp");

    if (newUserSignedUpFlag === "true") {
      successAlert("Sign Up successful! Please Sign In.");
      localStorage.removeItem("signedUp");
    }
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
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

    let authenticated = false;
    let foundUserData = null;

    const inputUsernameLower = username.trim().toLowerCase();
    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    let userFromLocalStorageArray = storedUsers.find(
      (user) => user.name.toLowerCase() === inputUsernameLower
    );

    if (userFromLocalStorageArray) {
      if (userFromLocalStorageArray.password === password.trim()) {
        authenticated = true;
        foundUserData = userFromLocalStorageArray;
      }
    } else {
      const userFromJSON = userDetail.find(
        (user) => user.name.toLowerCase() === inputUsernameLower
      );

      if (userFromJSON) {
        if (userFromJSON.password === password.trim()) {
          authenticated = true;
          foundUserData = userFromJSON;

          const getMaxId = (usersArray) => {
            if (usersArray.length === 0) return 0;
            const ids = usersArray.map((u) => u.id);
            return Math.max(...ids);
          };
          const allExistingUsersForIdCalculation = [
            ...userDetail,
            ...storedUsers,
          ];
          const currentMaxId = getMaxId(allExistingUsersForIdCalculation);

          const newUserInStorage = {
            ...userFromJSON,
            id: currentMaxId + 1,
          };
          localStorage.setItem(
            "users",
            JSON.stringify([...storedUsers, newUserInStorage])
          );
        }
      }
    }

    if (authenticated && foundUserData) {
      localStorage.setItem("username", foundUserData.name);
      localStorage.setItem("userBio", foundUserData.bio || "");
      localStorage.setItem("userPassword", foundUserData.password);
      localStorage.setItem(
        "profile_picture",
        foundUserData.profile_picture || "/assets/icon/white_username_icon.svg"
      );

      localStorage.setItem("firstLogin", "true");
      navigate("/learn");
    } else {
      setGeneralError("Invalid username or password.");
    }
  };

  return (
    <div className="signin">
      <WelcomeSection />
      <div className="right-side">
        <h1 className="header2">Sign In</h1>
        <form className="form-section" onSubmit={handleSignIn}>
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
        </form>
        <p className="got-acc body2">
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
