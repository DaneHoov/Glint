import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPhoto } from "../../store/photos";
import { useModal } from "../../context/Modal";

const PhotoFormModal = () => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = [];
    if (!url) validationErrors.push("URL is required");
    if (!description) validationErrors.push("Description is required");
    if (validationErrors.length) return setErrors(validationErrors);

    const newPhoto = await dispatch(createPhoto({ url, description }));

    if (newPhoto) {
      closeModal();
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
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <button type="submit">Create Photo</button>
      </form>
    </div>
  );
};

export default PhotoFormModal;
