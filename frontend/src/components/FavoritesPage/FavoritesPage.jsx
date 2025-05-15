import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavorites,
  addFavorite,
  removeFavorite,
} from "../../store/favorites";
import "./FavoritesPage.css";

export default function FavoritesPage() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.all);
  const [formData, setFormData] = useState({ photoId: "" });

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleAddFavorite = async () => {
    await dispatch(addFavorite(formData));
    setFormData({ photoId: "" });
  };

  const handleRemoveFavorite = (id) => {
    dispatch(removeFavorite(id));
  };

  return (
    <div className="favorites-container">
      <h2>Add Photo to Favorites</h2>
      <input
        type="text"
        placeholder="Photo ID"
        value={formData.photoId}
        onChange={(e) => setFormData({ photoId: e.target.value })}
      />
      <button onClick={handleAddFavorite}>Add Favorite</button>

      <h2>Your Favorites</h2>
      <div className="favorite-list">
        {favorites.map((favorite) => (
          <div className="favorite-item" key={favorite.id}>
            <p>Photo ID: {favorite.photoId}</p>
            <button onClick={() => handleRemoveFavorite(favorite.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
