import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Header from "../components/header.jsx";
import "../css/Profile.css";
import Button from "../components/button.jsx";
import DefaultProfile from "../assets/icon/username_icon.svg";
import CertificationDetail from "../components/certifDetail.jsx";

function Profile() {
  const [currentUserData, setCurrentUserData] = useState(null);
  const navigate = useNavigate();

  const user_detail = [
    {
      profile_picture: "",
      name: "Anto",
      bio: "Student at MathOLearn",
    },
    {
      profile_picture: "",
      name: "Silverius",
      bio: "Lorem ipsum dolor gacor banget",
    },
  ];

  useEffect(() => {
    const loggedInUsername = localStorage.getItem("username");

    if (!loggedInUsername) {
      navigate("/login");
      return;
    }

    const userData = user_detail.find((user) => user.name === loggedInUsername);
    setCurrentUserData(userData);
  }, [navigate]);

  const certifications = [
    {
      title: "Certification of Completion",
      subject: "Basic Statistic",
      date: "December 2024",
    },
    {
      title: "Certification of Completion",
      subject: "Statistic 2",
      date: "November 2024",
    },
    {
      title: "Statistics and Probability",
      subject: "Calculus",
      date: "October 2024",
    },
    {
      title: "Calculus Mastery",
      subject: "Advanced Calculus 1",
      date: "September 2024",
    },
  ];

  const [selectedCertification, setSelectedCertification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCertificationClick = (certification) => {
    setSelectedCertification(certification);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCertification(null);
  };

  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section">
        <div className="user-information">
          <div className="user-profile-picture">
            <img
              src={currentUserData?.profile_picture || DefaultProfile}
              alt={`${currentUserData?.name || "User"} profile picture`}
            />
          </div>
          <p className="user-name header5">{currentUserData?.name}</p>
          <p className="user-bio body2">{currentUserData?.bio}</p>
        </div>
        <Button link="" text="Edit Profile" onClick="" />
        <div className="user-certification-container">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="user-certification header5"
              onClick={() => handleCertificationClick(cert)}
              style={{ cursor: "pointer" }}
            >
              {cert.title}
            </div>
          ))}
        </div>
      </div>
      <CertificationDetail
        isOpen={isModalOpen}
        onClose={closeModal}
        certification={selectedCertification}
      />
    </div>
  );
}

export default Profile;
