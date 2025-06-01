import { useState } from "react";
import Navbar from "../components/navbar.jsx";
import Header from "../components/header.jsx";
import "../css/Forum.css";
import postIcon from "../assets/icon/post_icon.svg";
import forumFilterOption from "../json/forum_filter_option.json";
import forumDetail from "../json/forum.json";
import ForumModal from "../components/postForum.jsx";

function Forum() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePost = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section forum">
        <div className="forum-header">
          <div className="filter-forum">
            <div className="filter-title header3">Filter your forum</div>
            <div className="filter-control">
              <div className="filter-group">
                <label className="filter-label body1">SUBJECT</label>
                <select className="filter-select body2">
                  {forumFilterOption.subjects.map((subject, index) => (
                    <option key={index} value={subject.value}>
                      {subject.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label body1">TYPE</label>
                <select className="filter-select body2">
                  {forumFilterOption.types.map((subject, index) => (
                    <option key={index} value={subject.value}>
                      {subject.label}
                    </option>
                  ))}
                </select>
              </div>
              <button className="apply-button body2">Apply</button>
            </div>
          </div>
          <div className="post-forum">
            <div className="post-button" onClick={handlePost}>
              <img src={postIcon} alt="post-icon" />
              <p className="header5 post-text">Post</p>
            </div>
          </div>
        </div>
        <div className="forum-posted">
          {forumDetail.map((post, index) => (
            <div key={index} className="forum-card">
              <div className="post-header">
                <h5 className="header5">
                  {post.subject} - {post.type}
                </h5>
              </div>
              <div className="user-detail">
                <div className="user-profile-picture">
                  <img
                    className="body4"
                    src={post.profile_picture}
                    alt={`${post.username}'s profile picture`}
                  />
                </div>
                <div className="user-name-date">
                  <div className="user-name">
                    <p className="body2">{post.username}</p>
                  </div>
                  <div className="post-date body4">
                    {post.post_date}, {post.post_hours}
                  </div>
                </div>
              </div>
              <div className="forum-caption body2">{post.caption}</div>
              <div className="forum-card-button">
                <button className="forum-button comments boldBody2">
                  {post.comment_num} Comment(s)
                </button>
                <button className="forum-button likes boldBody2">
                  {post.like_num} Like(s)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ForumModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default Forum;
