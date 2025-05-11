import PhotoCard from "./PhotoCard";

export default function PhotoList({ photos }) {
  return (
    <div className="photo-list">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
}
