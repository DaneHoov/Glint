import { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../store/comments";
import "./CommentModal.css";

const CommentModal = ({ photoId, onClose, onPosted }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      setError("Comment cannot be empty.");
      return;
    }
    const newComment = await dispatch(createComment(photoId, text));
    if (newComment) {
      setText(""); // Clear textarea after successful post
      onPosted(); // Notify parent modal to update comment count
      onClose(); // Close modal after posting comment
    } else {
      setError("Failed to post comment.");
    }
  };

  return (
    <div className="comment-modal-backdrop" onClick={onClose}>
      <div
        className="comment-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Post Comment</h2>
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError(null);
            }}
            placeholder="Write your comment here"
            rows={5}
          />
          {error && <p className="error">{error}</p>}
          <button
            type="submit"
            disabled={text.trim() === ""}
            className="post-comment-btn"
          >
            Post comment
          </button>
        </form>
        <button className="close-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CommentModal;
