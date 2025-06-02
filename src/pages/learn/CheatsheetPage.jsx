import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import Material from "../../json/learn_material.json";
import BackButton from "../../components/backButton.jsx";
import "../../css/learn/CheatsheetPage.css";

function CheatsheetPage() {
  const { subject, itemId } = useParams();
  const subjectData = Material[subject.toLowerCase()];
  const cheatsheet = subjectData.cheatsheets.find(
    (c) => c.id === parseInt(itemId)
  );

  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section">
        <div className="cheatsheet-header">
          <div className="back-button">
            <BackButton />
          </div>
          <h3 className="subject header3">{subject}</h3>
        </div>
        <div className="cheatsheet-container">
          <h4 className="cheatsheet-title header4">Cheatsheet - {cheatsheet.title}</h4>
          <iframe
            src={cheatsheet.downloadUrl}
            title={cheatsheet.title}
            className="cheatsheet-pdf"
          />
          <a href={cheatsheet.downloadUrl} download className="download-cheatsheet" >
            <button className="download-btn boldBody2">
              Download {cheatsheet.title}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default CheatsheetPage;
