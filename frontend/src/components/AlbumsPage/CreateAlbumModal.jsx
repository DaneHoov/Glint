import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAlbumThunk } from "../../store/albums";
import { useModal } from "../../context/Modal";
import "./CreateAlbumModal.css";

export default function CreateAlbumModal({ onSuccess }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    if (!title.trim()) return;

    const newAlbum = await dispatch(addAlbumThunk({ title, description }));

    if (newAlbum) {
      setSuccess(true);
      setTimeout(() => {
        closeModal();
        onSuccess?.();
      }, 1000);
    } else {
      setErrors(["Failed to create album."]);
    }
  };

  return (
    <div className="create-album-modal">
      <h2>Create New Album</h2>

      {errors.length > 0 && (
        <ul className="form-errors">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}

      {success && (
        <p className="success-message">Successfully created new album</p>
      )}

      {!success && (
        <form onSubmit={handleSubmit}>
          <label>
            Title *
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Description (optional)
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <button type="submit" disabled={!title.trim()}>
            Create Album
          </button>
        </form>
      )}
    </div>
  );
}
