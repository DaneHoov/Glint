import AlbumCard from "./AlbumCard";

export default function AlbumList({ albums }) {
  return (
    <div className="album-list">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}
