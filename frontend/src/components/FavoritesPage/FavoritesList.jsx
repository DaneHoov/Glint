import PhotoCard from "../Photos/PhotoCard";

export default function FavoriteList({ favorites }) {
  return (
    <div className="favorite-list">
      {favorites.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
}
