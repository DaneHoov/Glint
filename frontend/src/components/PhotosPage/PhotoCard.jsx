export default function PhotoCard({ photo }) {
  return (
    <div className="photo-card">
      <img src={photo.url} alt={photo.title} />
      <h3>{photo.title}</h3>
    </div>
  );
}
