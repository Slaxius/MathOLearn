import WelcomeSection from "../../components/welcome.jsx";
import Button from "../../components/button.jsx";
import "../../css/auth/Authentication.css";


function ResetPassword() {
  return (
    <div className="signin">
      <WelcomeSection />
      <div className="right-side">
        <h1 className="header2">Reset Password</h1>
        <div className="form-section">
          <div className="user-input">
            <img src="/assets/icon/black_username_icon.svg" alt="Username-icon" />
            <input type="text" placeholder="Username" className="body1" />
          </div>
          <div className="user-input">
            <img src="/assets/icon/black_password_icon.svg" alt="Password-icon" />
            <input
              type="password"
              placeholder="Reset Password"
              className="body1"
            />
          </div>
          <Button link="/signin" text="Reset" />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
