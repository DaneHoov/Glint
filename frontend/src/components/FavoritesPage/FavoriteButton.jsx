export default function FavoriteButton({ isFavorited, onToggle }) {
  return (
    <button
      className={`favorite-button ${isFavorited ? "active" : ""}`}
      onClick={onToggle}
    >
      {isFavorited ? "Unfavorite" : "Favorite"}
    </button>
  );
}
