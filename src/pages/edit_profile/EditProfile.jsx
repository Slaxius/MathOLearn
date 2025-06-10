import "../../css/profiles/EditProfile.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import Button from "../../components/button.jsx";
import BackButton from "../../components/backButton.jsx";
import userDetail from "../../json/user_detail.json";

function EditProfile() {
  const [currentUserData, setCurrentUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });
  const navigate = useNavigate();

  const getCurrentUser = (username) => {
    return userDetail.find((user) => user.name === username);
  };

  useEffect(() => {
    const loggedInUsername = localStorage.getItem("username");

    if (!loggedInUsername) {
      navigate("/signin");
      return;
    }

    const userData = getCurrentUser(loggedInUsername);

    if (userData) {
      setCurrentUserData(userData);
      setFormData({
        name: userData.name,
        bio: userData.bio || "",
      });
    } else {
      console.error("User not found:", loggedInUsername);
      navigate("/signin");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!currentUserData) {
      alert("Error: No user data found");
      return;
    }

    console.log("Saving profile data:", formData);

    if (!formData.name.trim()) {
      alert("Name cannot be empty");
      return;
    }

    localStorage.setItem("username", formData.name);

    setCurrentUserData({
      ...currentUserData,
      name: formData.name,
      bio: formData.bio,
    });

    alert("Profile updated successfully!");
    navigate("/profile");
  };

  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section edit-profile">
        <BackButton />
        <div className="edit-profile-content">
          <div className="user-profile-picture">
            <img
              src={currentUserData?.profile_picture || "/assets/icon/white_username_icon.svg"}
              alt={`${currentUserData?.name || "User"} profile picture`}
              className="profile-picture"
            />
          </div>
          <div className="form-section">
            <div className="input-group">
              <label htmlFor="name" className="input-label header5">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="profile-input body1"
                placeholder="New username"
              />
            </div>
            <div className="input-group">
              <label htmlFor="bio" className="input-label header5">
                Bio
              </label>
              <input
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="profile-textarea body1"
                placeholder="New bio"
              />
            </div>
            <div className="save-button-container">
              <Button
                text="Save"
                onClick={handleSave}
                className="save-button"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
