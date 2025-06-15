import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* Authentication */
import SignUp from "./pages/authentication/SignUp.jsx";
import SignIn from "./pages/authentication/SignIn.jsx";
import ResetPw from "./pages/authentication/ResetPassword.jsx";

/* Learn */
import Learn from "./pages/learn/Learn.jsx";
import SelectedSubject from "./pages/learn/SelectedSubject.jsx";
import VideoPage from "./pages/learn/VideoPage.jsx";
import CheatsheetPage from "./pages/learn/CheatsheetPage.jsx";
import ExercisePage from "./pages/learn/ExercisePage.jsx";
import QuizPage from "./pages/learn/QuizPage.jsx";
import FinishedPage from "./pages/learn/FinishedPage.jsx";

/* Leaderboard */
import Leaderboard from "./pages/leaderboard/Leaderboard.jsx";

/* Forum */
import Forum from "./pages/forum/Forum.jsx";
import ViewForum from "./pages/forum/ViewForum.jsx";

/* Notification */
import Notification from "./pages/notification/Notification.jsx";

/* Profile */
import Profile from "./pages/profile/Profile.jsx";
import EditProfile from "./pages/profile/EditProfile.jsx";

/* Settings */
import Settings from "./pages/settings/Settings.jsx";
import Preferences from "./pages/settings/Preferences.jsx";
import Privacy from "./pages/settings/Privacy.jsx";
import Help from "./pages/settings/Help.jsx";
import Feedback from "./pages/settings/Feedback.jsx";

import { MusicProvider } from "./utils/MusicProvider.jsx";

function App() {
  return (
    <MusicProvider>
      <Router>
        <Routes>
          {/* Default */}
          <Route path="/" element={<SignIn />} />

          {/* Authentication */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/resetpassword" element={<ResetPw />} />

          {/* Learn */}
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

          {/* Leaderboard */}
          <Route path="/leaderboard" element={<Leaderboard />} />

          {/* Forum */}
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:postId" element={<ViewForum />} />

          {/* Notification */}
          <Route path="/notification" element={<Notification />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/editprofile" element={<EditProfile />} />

          {/* Settings */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/preferences" element={<Preferences />} />
          <Route path="/settings/privacy" element={<Privacy />} />
          <Route path="/settings/help" element={<Help />} />
          <Route path="/settings/feedback" element={<Feedback />} />

          {/* Page Not Found */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
        <ToastContainer />
      </Router>
    </MusicProvider>
  );
}

export default App;
