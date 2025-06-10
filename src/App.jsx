import React, { useEffect, useState } from "react";
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
import FinishedPage from "./pages/learn/FinishedPage.jsx";

function App() {
  const [settings, setSettings] = useState(() => {
    const storedSettings = localStorage.getItem("preferences");
    return storedSettings
      ? JSON.parse(storedSettings)
      : { backgroundMusic: true };
  });

  useEffect(() => {
    const audio = document.getElementById("background-music");
    if (settings.backgroundMusic) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [settings.backgroundMusic]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/resetpassword" element={<ResetPw />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/subject/:subject" element={<SelectedSubject />} />
        <Route
          path="/learn/subject/:subject/video/:itemId"
          element={<VideoPage />}
        />
        <Route
          path="/learn/subject/:subject/cheatsheet/:itemId"
          element={<CheatsheetPage />}
        />
        <Route
          path="/learn/subject/:subject/exercise/:itemId"
          element={<ExercisePage />}
        />
        <Route
          path="/learn/subject/:subject/quiz/:itemId"
          element={<QuizPage />}
        />
        <Route
          path="/learn/subject/:subject/exercise/:itemId/finished"
          element={<FinishedPage />}
        />
        <Route
          path="/learn/subject/:subject/quiz/:itemId/finished"
          element={<FinishedPage />}
        />
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

      <audio id="background-music" loop>
        <source
          src="/assets/music/Growtopia OST - About theme.mp3"
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio>
    </Router>
  );
}

export default App;
