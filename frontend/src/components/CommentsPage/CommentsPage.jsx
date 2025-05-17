import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  createComment,
  editComment,
  removeComment,
} from "../../store/comments";
import "./CommentsPage.css";

export default function CommentsPage({ photoId }) {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);
  const [formData, setFormData] = useState({ text: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (photoId) {
      dispatch(fetchComments(photoId));
    }
  }, [dispatch, photoId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photoId) return; // safety check

    if (editingId) {
      await dispatch(editComment(editingId, formData));
      setEditingId(null);
    } else {
      await dispatch(createComment(photoId, formData.text));
    }
    setFormData({ text: "" });
  };

  const handleDelete = (id) => {
    dispatch(removeComment(id));
  };

  return (
    <div className="comments-container">
      <h2>{editingId ? "Edit Comment" : "Add New Comment"}</h2>
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          name="text"
          placeholder="Your Comment"
          value={formData.text}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editingId ? "Update Comment" : "Create Comment"}
        </button>
      </form>

      <h2>All Comments</h2>
      <div className="comment-list">
        {comments.map((comment) => (
          <div className="comment-item" key={comment.id}>
            <p>{comment.text}</p>
            <div className="comment-actions">
              <button
                onClick={() => {
                  setFormData({ text: comment.text });
                  setEditingId(comment.id);
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(comment.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
