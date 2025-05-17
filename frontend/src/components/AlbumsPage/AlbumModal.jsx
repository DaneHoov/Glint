import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  editAlbum,
  removeAlbum,
  removePhotoFromAlbumThunk,
} from "../../store/albums";
import { useNavigate } from "react-router-dom";
import "./AlbumModal.css";
import { FaEdit, FaTrashAlt, FaCheck, FaTimesCircle } from "react-icons/fa";

export default function AlbumModal({ album, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(album.title);
  const [editedDescription, setEditedDescription] = useState(
    album.description || ""
  );
  const [removedPhotoIds, setRemovedPhotoIds] = useState(new Set());
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const togglePhotoRemoval = (photoId) => {
    setRemovedPhotoIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(photoId) ? newSet.delete(photoId) : newSet.add(photoId);
      return newSet;
    });
  };

  const handleSave = async () => {
    if (
      editedTitle !== album.title ||
      editedDescription !== album.description
    ) {
      await dispatch(
        editAlbum(album.id, {
          title: editedTitle,
          description: editedDescription,
        })
      );
    }

    for (const photoId of removedPhotoIds) {
      await dispatch(removePhotoFromAlbumThunk(album.id, photoId));
    }

    setShowSavedMessage(true);
    setTimeout(() => {
      setShowSavedMessage(false);
      onClose();
    }, 1000);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this album?")) {
      await dispatch(removeAlbum(album.id));
      onClose();
      navigate("/albums");
    }
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  return (
    <div className="album-modal-backdrop" onClick={onClose}>
      <div className="album-modal" onClick={(e) => e.stopPropagation()}>
        <div className="album-modal-header">
          {isEditing ? (
            <div style={{ width: "100%" }}>
              <input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="album-title-input"
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="album-description-input"
                placeholder="Enter album description"
              />
            </div>
          ) : (
            <div>
              <h2>{album.title}</h2>
              <p>{album.description}</p>
            </div>
          )}

          <div className="album-modal-controls">
            {!isEditing && (
              <button onClick={startEditing}>
                <FaEdit />
                Edit
              </button>
            )}
            <button className="delete-btn" onClick={handleDelete}>
              <FaTrashAlt />
              Delete
            </button>
            {isEditing && (
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            )}
            <button onClick={onClose}>Close</button>
          </div>
        </div>

        {showSavedMessage && (
          <div className="saved-message">
            <FaCheck /> Changes saved!
          </div>
        )}

        <div className="photo-grid">
          {album.Photos?.map((photo) => (
            <div key={photo.id} className="photo-wrapper">
              <img
                src={photo.image_url}
                alt={photo.title}
                className="photo-thumb"
              />
              {isEditing && (
                <button
                  className="photo-remove-btn"
                  onClick={() => togglePhotoRemoval(photo.id)}
                >
                  <FaTimesCircle />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
