import CommentCard from './CommentCard';

export default function CommentList({ comments }) {
  return (
    <div className="comment-list">
      {comments.map(comment => <CommentCard key={comment.id} comment={comment} />)}
    </div>
  );
}
