import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar.jsx";
import Header from "../../components/header.jsx";
import forumDetail from "../../json/forum.json";
import forumComments from "../../json/forum_comments.json";
import "../../css/forum/ViewForum.css";
import BackButton from "../../components/backButton.jsx";

function ViewForum() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const foundPost = forumDetail.find((p) => p.id === postId);
    if (foundPost) {
      setPost({ ...foundPost, isLiked: false });
    } else {
      setPost(null);
    }

    const postComments = forumComments.find((pc) => pc.postId === postId);
    if (postComments) {
      setComments(postComments.comments);
    } else {
      setComments([]);
    }
  }, [postId]);

  const handleLike = () => {
    if (post) {
      setPost((prevPost) => ({
        ...prevPost,
        like_num: prevPost.isLiked
          ? prevPost.like_num - 1
          : prevPost.like_num + 1,
        isLiked: !prevPost.isLiked,
      }));
    }
  };

  if (!post) {
    return (
      <div className="page">
        <Navbar />
        <Header />
        <div className="main-section">
          <div className="view-forum-header">
            <div className="back-button">
              <BackButton />
            </div>
          </div>
          <p className="loading-text">Loading post or post not found...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <Navbar />
      <Header />
      <div className="main-section view-forum">
        <div className="view-forum-header">
          <div className="back-button">
            <BackButton />
          </div>
        </div>
        <div className="forum-detail-card">
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
        </div>
        <div className="comments-section">
          <h5 className="subHeader comments-title">
            Comments ({comments.length})
          </h5>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.commentId} className="comment-card">
                <div className="comment-user-detail">
                  <div className="user-profile-picture">
                    <img
                      className="body4"
                      src={comment.profile_picture}
                      alt={`${comment.username}'s profile picture`}
                    />
                  </div>
                  <div className="user-name-date">
                    <div className="user-name">
                      <p className="body2">{comment.username}</p>
                    </div>
                    <div className="post-date body4">
                      {comment.comment_date}, {comment.comment_hours}
                    </div>
                  </div>
                </div>
                <div className="comment-text body2">{comment.text}</div>
              </div>
            ))
          ) : (
            <p className="body2 no-comments">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewForum;
