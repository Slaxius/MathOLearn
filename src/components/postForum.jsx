import { useState, useEffect, useRef } from "react";
import forumFilterOption from "../json/forum_filter_option.json";
import userDetail from "../json/user_detail.json";
import "../css/components/forumModal.css";

function ForumModal({ isOpen, onClose }) {
  const [currentUser, setCurrentUser] = useState(null);
  const textareaRef = useRef(null);

  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getCurrentUser = () => {
      try {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
          const foundUser = userDetail.find(
            (user) => user.name === storedUsername.trim()
          );
          if (foundUser) {
            setCurrentUser(foundUser);
          } else {
            console.warn("User not found in userDetail JSON");
            setCurrentUser(userDetail[0]);
          }
        } else {
          console.warn("No username found in localStorage");
          setCurrentUser(userDetail[0]);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
        setCurrentUser(userDetail[0]);
      }
    };

    getCurrentUser();
  }, []);

  const handleTextareaResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      handleTextareaResize();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setSelectedSubject("");
      setSelectedType("");
      setContent("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!selectedSubject || !selectedType || !content.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newPost = {
        id: Date.now(),
        subject: selectedSubject,
        type: selectedType,
        content: content.trim(),
        author: currentUser?.name || "Anonymous",
        timestamp: new Date().toISOString(),
      };

      console.log("New forum post:", newPost);
      alert("Forum post created successfully!");
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="post-forum-overlay" onClick={onClose}>
      <div className="post-forum-content" onClick={(e) => e.stopPropagation()}>
        <div className="post-forum-top">
          <div className="post-forum-card-title">
            <p className="header5">Post New Forum</p>
          </div>
          <button className="post-forum-close header5" onClick={onClose}>
            x
          </button>
        </div>
        <div className="post-forum-body">
          <div className="bot-header">
            <div className="user-profile">
              {currentUser && (
                <img
                  src={currentUser.profile_picture || "/placeholder.svg"}
                  alt={`${
                    currentUser.username || currentUser.name
                  }'s profile picture`}
                  className="profile-image body4"
                />
              )}
            </div>
            <div className="filter-control">
              <div className="filter-group">
                <label className="filter-label body2">SUBJECT</label>
                <select
                  className="filter-select body2"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  <option value="">Select Subject</option>
                  {forumFilterOption.subjects.map((subject, index) => (
                    <option key={index} value={subject.value}>
                      {subject.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label body2">TYPE</label>
                <select
                  className="filter-select body2"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">Select Type</option>
                  {forumFilterOption.types.map((type, index) => (
                    <option key={index} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="bot-content">
            <textarea
              ref={textareaRef}
              name="new-forum"
              id="new-forum"
              placeholder="What's on your mind?"
              className="text-area body2"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                handleTextareaResize();
              }}
              onInput={handleTextareaResize}
            ></textarea>
          </div>
          <div className="bot-footer">
            <div className="character-count">
              <span
                className={`body2 ${
                  content.length > 250 ? "text-warning" : ""
                }`}
              >
                {content.length}/250
              </span>
            </div>
            <button
              className="submit-btn boldBody2"
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                !selectedSubject ||
                !selectedType ||
                !content.trim()
              }
            >
              {isSubmitting ? "Posting..." : "Post Forum"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumModal;
