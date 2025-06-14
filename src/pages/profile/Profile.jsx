import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import "../../css/profile/Profile.css";
import Button from "../../components/button.jsx";
import CertificationDetail from "../../components/certifDetail.jsx";
import userDetail from "../../json/user_detail.json";
import certifications from "../../json/certification.json";

function Profile() {
  const [currentUserData, setCurrentUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUsername = localStorage.getItem("username");

    if (!loggedInUsername) {
      navigate("/login");
      return;
    }

    const userData = userDetail.find((user) => user.name === loggedInUsername);
    setCurrentUserData(userData);
  }, [navigate]);

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

  const handleEditProfile = () => {
    navigate("/profile/editprofile");
  };

  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section">
        <div className="user-information">
          <div className="user-profile-picture">
            <img
              src={
                currentUserData?.profile_picture ||
                "/assets/icon/white_username_icon.svg"
              }
              alt={`${currentUserData?.name || "User"} profile picture`}
            />
          </div>
          <p className="user-name header5">{currentUserData?.name}</p>
          <p className="user-bio body2">{currentUserData?.bio}</p>
        </div>
        <Button
          link="/profile/editprofile"
          text="Edit Profile"
          onClick={handleEditProfile}
        />
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
