import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos, removePhoto } from "../../store/photos";
// import { useNavigate } from "react-router-dom";
import "./PhotosPage.css";
import OpenModalButton from '../OpenModalButton';
import PhotoFormModal from './PhotoFormModal';

const PhotosPage = () => {
  const dispatch = useDispatch();
//   const navigate = useNavigate();

  const allPhotos = useSelector((state) => state.photos.allPhotos || {});
  const photos = Object.values(allPhotos);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  const handleDelete = (photoId) => {
    dispatch(removePhoto(photoId));
  };

  return (
    <div className="photos-page">
      <h1 className="photos-page-header">Photos</h1>

      {/* Modal button for creating new photo */}
      <OpenModalButton
        buttonText="Create New Photo"
        modalComponent={<PhotoFormModal />}
        className="create-photo-button"
      />

      <div className="photo-gallery">
        <h2>All Photos</h2>
        <div className="photos-list">
          {photos.map((photo) => (
            <div key={photo.id} className="photo-card">
              <img src={photo.url} alt={photo.description || "Photo"} />
              <p>{photo.description}</p>
              <button
                className="delete-btn"
                onClick={() => handleDelete(photo.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotosPage;
