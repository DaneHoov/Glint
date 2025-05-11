export default function PhotoForm({ onSubmit, initialData }) {
  return (
    <form className="photo-form" onSubmit={onSubmit}>
      <input
        name="title"
        defaultValue={initialData?.title || ""}
        placeholder="Title"
        required
      />
      <input
        name="url"
        defaultValue={initialData?.url || ""}
        placeholder="Image URL"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}
