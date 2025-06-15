import { useState, useEffect, useRef, useLayoutEffect } from "react";
import forumFilterOption from "../json/forum_filter_option.json";
import userDetail from "../json/user_detail.json";
import "../css/components/postForum.css";
import { errorAlert, successAlert } from "../utils/Toastify";

function PostForum({ isOpen, onClose, onPostSuccess }) {
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
            console.warn("User not found in userDetail JSON, using default.");
            setCurrentUser(userDetail[0]);
          }
        } else {
          console.warn("No username found in localStorage, using default.");
          setCurrentUser(userDetail[0]);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
        setCurrentUser(userDetail[0]);
      }
    };

    getCurrentUser();
  }, []);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [content, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setSelectedSubject("");
      setSelectedType("");
      setContent("");
      setIsSubmitting(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    console.log("handleSubmit called!");
    let validationErrors = [];

    if (!selectedSubject) {
      validationErrors.push("Subject must be selected.");
    }
    if (!selectedType) {
      validationErrors.push("Type must be selected.");
    }

    if (selectedSubject === "all") {
      validationErrors.push(
        "Please choose a specific subject, 'All Subjects' is not valid for posting."
      );
    }
    if (selectedType === "all") {
      validationErrors.push(
        "Please choose a specific type, 'All Types' is not valid for posting."
      );
    }

    if (!content.trim()) {
      validationErrors.push("Content cannot be empty.");
    }
    if (content.length > 250) {
      validationErrors.push("Content exceeds maximum character limit (250).");
    }

    if (validationErrors.length > 0) {
      errorAlert(validationErrors.join("\n"));
      return;
    }

    console.log("Validation errors collected:", validationErrors);

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const now = new Date();
      const postDate = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      const postHours = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newPost = {
        id: `post-${Date.now()}`,
        subject: selectedSubject,
        type: selectedType,
        profile_picture:
          currentUser?.profile_picture ||
          "/assets/icon/black_username_icon.svg",
        username: currentUser?.name || "Anonymous",
        post_date: postDate,
        post_hours: postHours,
        caption: content.trim(),
        comment_num: 0,
        like_num: 0,
        isLiked: false,
      };

      console.log("New forum post:", newPost);
      if (onPostSuccess) {
        onPostSuccess(newPost);
      }

      successAlert("Forum post created successfully!");
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
      errorAlert("Failed to create post. Please try again.");
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
                  src={
                    currentUser.profile_picture ||
                    "/assets/icon/black_username_icon.svg"
                  }
                  alt={`${currentUser.name}'s profile picture`}
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
                  onChange={(e) => {
                    setSelectedSubject(e.target.value);
                    console.log("Selected Subject:", e.target.value);
                  }}
                >
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
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    console.log("Selected Subject:", e.target.value);
                  }}
                >
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
                console.log("Content:", e.target.value);
              }}
              rows="3"
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
            <button className="submit-btn boldBody2" onClick={handleSubmit}>
              {isSubmitting ? "Posting..." : "Post Forum"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostForum;
