export default function CommentForm({ onSubmit, initialData }) {
  return (
    <form className="comment-form" onSubmit={onSubmit}>
      <textarea name="body" defaultValue={initialData?.body || ""} required />
      <button type="submit">Comment</button>
    </form>
  );
}
