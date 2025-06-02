import { useLocation, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import "../../css/learn/VideoPage.css";
import Material from "../../json/learn_material.json";
import BackButton from "../../components/backButton.jsx";

function VideoPage() {
  const { subject, itemId } = useParams();
  const subjectData = Material[subject.toLowerCase()];
  const video = subjectData.videos.find((v) => v.id === parseInt(itemId));

  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section">
        <div className="video-header">
          <div className="back-button">
            <BackButton />
          </div>
          <h3 className="subject header3">{subject}</h3>
        </div>
        <div className="video-page-container">
          <h4 className="video-title header4">Video - {video.title}</h4>
          <div className="video-content">
            <div className="video-container">
              <div className="video-player">
                <iframe
                  src={video.url}
                  title={video.title}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="reference">
              <p>
                reference:{" "}
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reference-link"
                >
                  {video.url}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
