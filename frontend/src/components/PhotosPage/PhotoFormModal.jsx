import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPhoto } from "../../store/photos";
import { useModal } from "../../context/Modal";
import "./PhotoFormModal.css";

const PhotoFormModal = () => {
  const dispatch = useDispatch();
  const { closeModal, setModalContent } = useModal();

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  const isSubmitDisabled = url.trim() === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const newPhoto = await dispatch(createPhoto({ url, title, description }));
    if (newPhoto) {
      closeModal();
    } else {
      setModalContent(
        <div className="error-modal">
          <h2>Photo upload unsuccessful</h2>
        </div>
      );
    }
  };

  return (
    <div className="photo-form-modal">
      <h2>Create Photo</h2>
      {errors.length > 0 && (
        <ul className="form-errors">
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Image URL
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <label>
          Title (Optional)
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description (Optional)
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button type="submit" disabled={isSubmitDisabled}>
          Create Photo
        </button>
      </form>
    </div>
  );
};

export default PhotoFormModal;
