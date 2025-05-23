import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import ResetPw from "./pages/ResetPassword.jsx";
import Learn from "./pages/Learn.jsx";
// import Leaderboard from "./pages/Leaderboard.jsx";
// import Forum from "./pages/Forum.jsx";
// import Notification from "./pages/Notification.jsx";
// import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/resetpassword" element={<ResetPw />} />
        <Route path="/learn" element={<Learn />} />
        {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}
        {/* <Route path="/forum" element={<Forum />} /> */}
        {/* <Route path="/notification" element={<Notification />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/settings" element={<Settings />} />
        {/* <Route path="/preferences" element={<Preferences />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/help" element={<Help />} />
        <Route path="/feedback" element={<Feedback />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
