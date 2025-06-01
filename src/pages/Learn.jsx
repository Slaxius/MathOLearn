import Navbar from "../components/navbar.jsx";
import Header from "../components/header.jsx";
import "../css/Learn.css";
import Calendar from "../components/calendar.jsx"

function Learn() {
  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section">
        {/* code */}
        <Calendar />
      </div>
    </div>
  );
}

export default Learn;
