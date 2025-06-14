import { useState, useEffect } from "react";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import { Link } from "react-router-dom";
import "../../css/forum/Forum.css";
import forumFilterOption from "../../json/forum_filter_option.json";
import forumDetail from "../../json/forum.json";
import ForumModal from "../../components/postForum.jsx";

function Forum() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allPosts, setAllPosts] = useState(
    forumDetail.map((post) => ({ ...post, isLiked: false }))
  );
  const [displayedPosts, setDisplayedPosts] = useState([]);

  const [tempSelectedSubject, setTempSelectedSubject] = useState("all");
  const [tempSelectedType, setTempSelectedType] = useState("all");

  const [activeSubjectFilter, setActiveSubjectFilter] = useState("all");
  const [activeTypeFilter, setActiveTypeFilter] = useState("all");

  useEffect(() => {
    applyFilters();
  }, [allPosts, activeSubjectFilter, activeTypeFilter]);

  const handlePost = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLike = (postId) => {
    setAllPosts((prevAllPosts) =>
      prevAllPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            like_num: post.isLiked ? post.like_num - 1 : post.like_num + 1,
            isLiked: !post.isLiked,
          };
        }
        return post;
      })
    );
  };

  const handleTempSubjectChange = (event) => {
    setTempSelectedSubject(event.target.value);
  };

  const handleTempTypeChange = (event) => {
    setTempSelectedType(event.target.value);
  };

  const handleApplyFilters = () => {
    setActiveSubjectFilter(tempSelectedSubject);
    setActiveTypeFilter(tempSelectedType);
  };

  const applyFilters = () => {
    const filtered = allPosts.filter((post) => {
      const subjectMatch =
        activeSubjectFilter === "all" ||
        post.subject.toLowerCase() === activeSubjectFilter;
      const typeMatch =
        activeTypeFilter === "all" ||
        post.type.toLowerCase() === activeTypeFilter;
      return subjectMatch && typeMatch;
    });
    setDisplayedPosts(filtered);
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
                <select
                  className="filter-select body2"
                  value={tempSelectedSubject}
                  onChange={handleTempSubjectChange}
                >
                  {forumFilterOption.subjects.map((subject, index) => (
                    <option key={index} value={subject.value}>
                      {subject.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label body1">TYPE</label>
                <select
                  className="filter-select body2"
                  value={tempSelectedType}
                  onChange={handleTempTypeChange}
                >
                  {forumFilterOption.types.map((type, index) => (
                    <option key={index} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="apply-button body2"
                onClick={handleApplyFilters}
              >
                Apply
              </button>
            </div>
          </div>
          <div className="post-forum">
            <div className="post-button" onClick={handlePost}>
              <img src="/assets/icon/white_post_icon.svg" alt="post-icon" />
              <p className="header5 post-text">Post</p>
            </div>
          </div>
        </div>
        <div className="forum-posted">
          {displayedPosts.map((post) => (
            <div key={post.id} className="forum-card">
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
                <Link
                  to={`/forum/${post.id}`}
                  className="forum-button comments boldBody2"
                >
                  {post.comment_num} Comment(s)
                </Link>
                <button
                  className={`forum-button likes boldBody2 ${
                    post.isLiked ? "liked" : ""
                  }`}
                  onClick={() => handleLike(post.id)}
                >
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
