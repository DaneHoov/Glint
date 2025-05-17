import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums, addPhotoToAlbumThunk } from "../../store/albums";
import "./AddToAlbumModal.css";

export default function AddToAlbumModal({ photoId, onClose }) {
  const dispatch = useDispatch();
  const albums = useSelector((state) => state.albums.all || []);
  const [selectedAlbumId, setSelectedAlbumId] = useState("");

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  // console.log("Photo ID passed into modal:", photoId);

  const handleAdd = async () => {
    if (!selectedAlbumId) return;

    try {
      console.log("Dispatching thunk with:", {
        selectedAlbumId,
        photoId,
      });

      await dispatch(addPhotoToAlbumThunk(selectedAlbumId, photoId));
      onClose();
    } catch (err) {
      // console.error("Add to album failed:", err);
      alert("Failed to add photo to album.");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Select an Album</h3>
        <select
          value={selectedAlbumId}
          onChange={(e) => setSelectedAlbumId(e.target.value)}
        >
          <option value="" disabled>
            -- Choose an album --
          </option>
          {albums.map((album) => (
            <option key={album.id} value={album.id}>
              {album.title}
            </option>
          ))}
        </select>
        <div className="modal-actions">
          <button onClick={handleAdd}>Add Photo</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
