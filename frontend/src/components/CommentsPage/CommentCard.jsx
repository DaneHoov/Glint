export default function CommentCard({ comment }) {
  return (
    <div className="comment-card">
      <p>{comment.body}</p>
    </div>
  );
}
