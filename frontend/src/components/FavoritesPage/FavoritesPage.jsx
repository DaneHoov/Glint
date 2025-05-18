import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites, removeFavorite } from "../../store/favorites";
import "./FavoritesPage.css";
import { FaTimesCircle } from "react-icons/fa";

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.allFavorites || []);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleRemoveFavorite = async (photoId) => {
    const success = await dispatch(removeFavorite(photoId));
    if (!success) {
      alert("Failed to remove favorite");
    }
  };

  return (
    <div className="favorites-container">
      <h2>Your Favorites</h2>
      <div className="favorite-grid">
        {favorites.length === 0 && <p>No favorites yet.</p>}
        {favorites.map((favorite) => (
          <div className="favorite-card" key={favorite.id}>
            <img
              src={favorite.Photo?.image_url}
              alt={favorite.Photo?.title || "Favorite photo"}
              className="favorite-photo"
            />
            <button
              className="photo-remove-btn"
              onClick={() => handleRemoveFavorite(favorite.photoId)}
            >
              <FaTimesCircle />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
