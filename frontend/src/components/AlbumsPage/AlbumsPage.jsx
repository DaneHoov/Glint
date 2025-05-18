import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums } from "../../store/albums";
import { useModal } from "../../context/Modal";
import CreateAlbumModal from "./CreateAlbumModal";
import AlbumModal from "./AlbumModal"; // <- Import this
import "./AlbumsPage.css";

export default function AlbumsPage() {
  const dispatch = useDispatch();
  const albums = useSelector((state) => state.albums.all || []);
  const { setModalContent } = useModal();
  const [selectedAlbum, setSelectedAlbum] = useState(null); // <- for modal

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  const handleOpenCreateModal = () => {
    setModalContent(<CreateAlbumModal />);
  };

  const handleOpenAlbumModal = (album) => {
    setSelectedAlbum(album); // open modal
  };

  const handleCloseAlbumModal = () => {
    setSelectedAlbum(null); // close modal
  };

  return (
    <div className="albums-container">
      <div className="albums-heading">
        <h1>Your Albums</h1>
        <button className="create-album-btn" onClick={handleOpenCreateModal}>
          Create New Album
        </button>
      </div>

      <div className="album-list">
        {albums.map((album) => (
          <div
            key={album.id}
            className="album-item"
            onClick={() => handleOpenAlbumModal(album)}
          >
            <h3>{album.title}</h3>
            <p>{album.description}</p>
          </div>
        ))}
      </div>

      {selectedAlbum && (
        <AlbumModal album={selectedAlbum} onClose={handleCloseAlbumModal} />
      )}
    </div>
  );
}
