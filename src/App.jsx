import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import ResetPw from "./pages/ResetPassword.jsx";
import Learn from "./pages/Learn.jsx";
import Settings from "./pages/Settings.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/resetpassword" element={<ResetPw />} />
        <Route path="/learn" element={<Learn />} />
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
