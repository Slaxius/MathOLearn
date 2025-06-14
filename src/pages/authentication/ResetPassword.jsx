import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleResetPassword = () => {
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

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const allUsers = [...userDetail, ...storedUsers];

    let userToReset = null;
    let isUserInLocalStorage = false;

    for (const user of storedUsers) {
      if (user.name.toLowerCase() === username.trim().toLowerCase()) {
        userToReset = user;
        isUserInLocalStorage = true;
        break;
      }
    }

    if (!userToReset) {
      for (const user of userDetail) {
        if (user.name.toLowerCase() === username.trim().toLowerCase()) {
          userToReset = user;
          isUserInLocalStorage = false;
          break;
        }
      }
    }

    if (userToReset) {
      let updatedUsers = [];
      if (isUserInLocalStorage) {
        updatedUsers = storedUsers.map((user) => {
          if (user.name.toLowerCase() === username.trim().toLowerCase()) {
            return { ...user, password: newPassword.trim() };
          }
          return user;
        });
      } else {
        const newUserId =
          Math.max(
            ...storedUsers.map((u) => u.id),
            ...userDetail.map((u) => u.id),
            0
          ) + 1;
        updatedUsers = [
          ...storedUsers,
          {
            ...userToReset,
            id: newUserId,
            password: newPassword.trim(),
          },
        ];
      }
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      console.log("Password reset successfully for:", username);
      alert("Password reset successfully!");
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
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
