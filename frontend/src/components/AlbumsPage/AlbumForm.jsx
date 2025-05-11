export default function AlbumForm({ onSubmit, initialData }) {
  return (
    <form className="album-form" onSubmit={onSubmit}>
      <input
        name="title"
        defaultValue={initialData?.title || ""}
        placeholder="Album Title"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
}
