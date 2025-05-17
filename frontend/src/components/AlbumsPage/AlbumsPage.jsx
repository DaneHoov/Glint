import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAlbums, createAlbum } from "../../store/albums";
import "./AlbumsPage.css";
import AlbumModal from "./AlbumModal";

export default function AlbumsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const albums = useSelector((state) => state.albums.all);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [showForm, setShowForm] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [showAlbumModal, setShowAlbumModal] = useState(false);

  const openAlbumModal = (album) => {
    setSelectedAlbum(album);
    setShowAlbumModal(true);
  };

  const closeAlbumModal = () => {
    setSelectedAlbum(null);
    setShowAlbumModal(false);
  };

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAlbum = await dispatch(createAlbum(formData));
    if (newAlbum) navigate("/albums");
    setFormData({ title: "", description: "" });
    setShowForm(false);
  };

  return (
    <div className="albums-container">
      <h2 className="albums-heading">All Albums</h2>

      {albums.length === 0 ? (
        <div className="no-albums">
          <p>You have no memories, create them now.</p>
          <button onClick={() => setShowForm(true)}>Create Album</button>
        </div>
      ) : null}

      {showForm && (
        <>
          <h2>Add New Album</h2>
          <form className="album-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Album Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Album Description"
              value={formData.description}
              onChange={handleChange}
            />
            <button type="submit" disabled={!formData.title.trim()}>
              Create Album
            </button>
          </form>
        </>
      )}

      {albums.length > 0 && (
        <div className="album-list grid-5">
          {albums.map((album) => (
            <div
              className="album-item"
              key={album.id}
              onClick={() => openAlbumModal(album)}
              style={{ cursor: "pointer" }}
            >
              <h3>{album.title}</h3>
            </div>
          ))}
        </div>
      )}

      {showAlbumModal && selectedAlbum && (
        <AlbumModal album={selectedAlbum} onClose={closeAlbumModal} />
      )}
    </div>
  );
}
