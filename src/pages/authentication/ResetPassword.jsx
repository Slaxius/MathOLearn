import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WelcomeSection from "../../components/welcome.jsx";
import Button from "../../components/button.jsx";
import userDetail from "../../json/user_detail.json";
import "../../css/authentication/Authentication.css";

function ResetPassword() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    setUsernameError("");
    setNewPasswordError("");
    setGeneralError("");

    let isValid = true;

    if (!username.trim()) {
      setUsernameError("Username is required.");
      isValid = false;
    }

    if (!newPassword.trim()) {
      setNewPasswordError("New Password is required.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const inputUsernameLower = username.trim().toLowerCase();
    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    let userFoundAndUpdated = false;
    let foundUserData = null;

    const userIndexInStored = storedUsers.findIndex(
      (user) => user.name.toLowerCase() === inputUsernameLower
    );

    if (userIndexInStored !== -1) {
      storedUsers[userIndexInStored] = {
        ...storedUsers[userIndexInStored],
        password: newPassword.trim(),
      };
      localStorage.setItem("users", JSON.stringify(storedUsers));
      foundUserData = storedUsers[userIndexInStored];
      userFoundAndUpdated = true;
    } else {
      const userFromDefault = userDetail.find(
        (user) => user.name.toLowerCase() === inputUsernameLower
      );

      if (userFromDefault) {
        const getMaxId = (usersArray) => {
          if (usersArray.length === 0) return 0;
          const ids = usersArray.map((u) => parseInt(u.id));
          return Math.max(...ids);
        };
        const allExistingUsersForIdCalculation = [
          ...userDetail,
          ...storedUsers,
        ];
        const currentMaxId = getMaxId(allExistingUsersForIdCalculation);

        const newUserInStorage = {
          ...userFromDefault,
          id: currentMaxId + 1,
          password: newPassword.trim(),
        };
        localStorage.setItem(
          "users",
          JSON.stringify([...storedUsers, newUserInStorage])
        );
        foundUserData = newUserInStorage;
        userFoundAndUpdated = true;
      }
    }

    if (userFoundAndUpdated && foundUserData) {
      localStorage.setItem("username", foundUserData.name);
      localStorage.setItem("userBio", foundUserData.bio || "");
      localStorage.setItem("userPassword", foundUserData.password);
      localStorage.setItem(
        "profile_picture",
        foundUserData.profile_picture || "/assets/icon/white_username_icon.svg"
      );
      localStorage.setItem("currentUserId", foundUserData.id);

      localStorage.setItem("changePassword", "true");
      localStorage.setItem("userChangePassword", foundUserData.name);
      navigate("/signin");
    } else {
      setGeneralError("Username not found.");
    }
  };

  return (
    <div className="signin">
      <WelcomeSection />
      <div className="right-side">
        <h1 className="header2">Reset Password</h1>
        <form className="form-section" onSubmit={handleResetPassword}>
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
            <div className="username-err error body2">{usernameError}</div>
          )}
          <div className="user-input">
            <img
              src="/assets/icon/black_password_icon.svg"
              alt="Password-icon"
            />
            <input
              type="password"
              placeholder="New Password"
              className="body1"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setNewPasswordError("");
                setGeneralError("");
              }}
            />
          </div>
          {newPasswordError && (
            <div className="new-password-err error body2">
              {newPasswordError}
            </div>
          )}
          <Button text="Reset" onClick={handleResetPassword} />
        </form>
        <p className="got-acc body2">
          Remembered your password? Click here to{" "}
          <Link to="/signin" className="body2">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
