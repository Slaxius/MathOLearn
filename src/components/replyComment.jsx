import { useState, useRef, useLayoutEffect } from "react";
import "../css/components/replyComment.css";

const InputReply = ({ onSubmit }) => {
  const [commentText, setCommentText] = useState("");
  const textareaRef = useRef(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [commentText]);

  const handleSubmit = () => {
    if (commentText.trim()) {
      onSubmit(commentText.trim());
      setCommentText("");
    }
  };

  return (
    <div className="new-comment-input-container">
      <textarea
        ref={textareaRef}
        className="new-comment-textarea body2"
        placeholder="Write your comment..."
        value={commentText}
        onChange={(e) => {
          setCommentText(e.target.value);
        }}
        rows="3"
      ></textarea>
      <div className="post-main-comment-button">
        <button
          className="body2 post-reply-comment"
          onClick={handleSubmit}
          disabled={!commentText.trim()}
        >
          Reply
        </button>
      </div>
    </div>
  );
};

export default InputReply;
