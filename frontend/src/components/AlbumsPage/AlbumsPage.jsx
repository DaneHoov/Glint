import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAlbums,
  createAlbum,
  editAlbum,
  removeAlbum,
} from "../../store/albums";
import "./AlbumsPage.css";

export default function AlbumsPage() {
  const dispatch = useDispatch();
  const albums = useSelector((state) => state.albums.all);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await dispatch(editAlbum(editingId, formData));
      setEditingId(null);
    } else {
      await dispatch(createAlbum({ ...formData, user_id: 1 })); // Replace user_id
    }
    setFormData({ title: "", description: "" });
  };

  const handleDelete = (id) => {
    dispatch(removeAlbum(id));
  };

  return (
    <div className="albums-container">
      <h2>{editingId ? "Edit Album" : "Add New Album"}</h2>
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
        <button type="submit">
          {editingId ? "Update Album" : "Create Album"}
        </button>
      </form>

      <h2>All Albums</h2>
      <div className="album-list">
        {albums.map((album) => (
          <div className="album-item" key={album.id}>
            <h3>{album.title}</h3>
            <p>{album.description}</p>
            <div className="album-actions">
              <button
                onClick={() => {
                  setFormData({
                    title: album.title,
                    description: album.description,
                  });
                  setEditingId(album.id);
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(album.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
