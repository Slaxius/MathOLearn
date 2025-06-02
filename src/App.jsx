import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/authentication/SignUp.jsx";
import SignIn from "./pages/authentication/SignIn.jsx";
import ResetPw from "./pages/authentication/ResetPassword.jsx";
import Learn from "./pages/Learn.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Forum from "./pages/Forum.jsx";
import Notification from "./pages/Notification.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import Preferences from "./pages/settings_account/Preferences.jsx";
import Privacy from "./pages/settings_account/Privacy.jsx";
import Help from "./pages/settings_support/Help.jsx";
import Feedback from "./pages/settings_support/Feedback.jsx";
import EditProfile from "./pages/edit_profile/EditProfile.jsx";
import SelectedSubject from "./pages/learn/SelectedSubject.jsx";
import VideoPage from "./pages/learn/VideoPage.jsx";
import CheatsheetPage from "./pages/learn/CheatsheetPage.jsx";
import ExercisePage from "./pages/learn/ExercisePage.jsx";
import QuizPage from "./pages/learn/QuizPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/resetpassword" element={<ResetPw />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/subject/:subject" element={<SelectedSubject />} />
        <Route path="/learn/subject/:subject/video" element={<VideoPage />} />
        <Route path="/learn/subject/:subject/cheatsheet" element={<CheatsheetPage />} />
        <Route path="/learn/subject/:subject/exercise" element={<ExercisePage />} />
        <Route path="/learn/subject/:subject/quiz" element={<QuizPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/editprofile" element={<EditProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/preferences" element={<Preferences />} />
        <Route path="/settings/privacy" element={<Privacy />} />
        <Route path="/settings/help" element={<Help />} />
        <Route path="/settings/feedback" element={<Feedback />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
