import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  removeComment,
  editComment,
} from "../../store/comments";
import {
  fetchFavoriteCount,
  addFavorite,
  removeFavorite,
  fetchFavorites,
} from "../../store/favorites";
import CommentModal from "../CommentsPage/CommentModal";
import AddToAlbumModal from "../AlbumsPage/AddToAlbumModal";

import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaTrashAlt,
  FaEdit,
  FaSave,
} from "react-icons/fa";
import { IoIosAlbums } from "react-icons/io";

import "./PhotosDetailsModal.css";

const PhotosDetailsModal = ({ photo, onClose }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const comments = useSelector((state) => state.comments[photo?.id] || []);
  const favoriteCount = useSelector(
    (state) => state.favorites.favoriteCounts?.[photo?.id] || 0
  );
  const userFavorites = useSelector((state) => state.favorites.allFavorites);

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const hasFavorited = userFavorites?.some(
    (fav) => fav?.photoId === photo?.id && fav?.userId === sessionUser?.id
  );

  useEffect(() => {
    if (photo?.id) {
      dispatch(fetchComments(photo.id));
      dispatch(fetchFavoriteCount(photo.id));
      if (sessionUser) {
        dispatch(fetchFavorites());
      }
    }
  }, [dispatch, photo?.id, sessionUser]);

  if (!photo) return null;

  const handleToggleFavorite = async () => {
    if (!sessionUser) {
      alert("Please log in to favorite.");
      return;
    }

    try {
      if (hasFavorited) {
        await dispatch(removeFavorite(photo.id));
      } else {
        await dispatch(addFavorite(photo.id));
      }

      await dispatch(fetchFavorites());
      await dispatch(fetchFavoriteCount(photo.id));
    } catch (err) {
      const errorData = await err.response?.json?.();
      console.error("Favorite error:", errorData);
      alert(errorData?.message || "An error occurred while toggling favorite.");
    }
  };

  const handleOpenCommentModal = () => {
    if (!sessionUser) return alert("Please log in to comment.");
    setShowCommentModal(true);
  };

  const handleCommentPosted = () => {
    setShowCommentModal(false);
    dispatch(fetchComments(photo.id));
  };

  const handleDelete = async (commentId) => {
    await dispatch(removeComment(commentId, photo.id));
  };

  const handleEdit = async (commentId) => {
    await dispatch(editComment(commentId, { content: editedContent }));
    setEditingCommentId(null);
    setEditedContent("");
  };

  return (
    <div className="photo-details-overlay" onClick={onClose}>
      <div className="photo-details-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <img
          src={photo.url}
          alt={photo.description || "Photo"}
          className="photo-details-image"
        />
        <h2>{photo.title || "Untitled"}</h2>
        <p>{photo.description}</p>

        <div className="photo-actions">
          <button onClick={handleToggleFavorite} className="favorite-button">
            {hasFavorited ? (
              <FaHeart color="red" style={{ marginRight: "6px" }} />
            ) : (
              <FaRegHeart color="white" style={{ marginRight: "6px" }} />
            )}
            Favorite ({favoriteCount})
          </button>
          <button onClick={handleOpenCommentModal}>
            <FaComment color="white" style={{ marginRight: "6px" }} />
            Comments ({comments.length})
          </button>
          <button onClick={() => setShowAlbumModal(true)}>
            <IoIosAlbums color="white" style={{ marginRight: "6px" }} />
            Add to Album
          </button>
        </div>

        {showCommentModal && (
          <CommentModal
            photoId={photo.id}
            onClose={() => setShowCommentModal(false)}
            onPosted={handleCommentPosted}
          />
        )}

        {showAlbumModal && (
          <AddToAlbumModal
            photoId={photo.id}
            onClose={() => setShowAlbumModal(false)}
          />
        )}

        <div className="comments-list">
          <h3>Comments</h3>
          {comments.length === 0 && <p>No comments yet.</p>}
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className="comment-item">
                <span className="comment-username">
                  {comment.User?.username || "User"}:
                </span>

                {editingCommentId === comment.id ? (
                  <>
                    <input
                      className="comment-edit-input"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <button
                      className="save-edit-button"
                      onClick={() => handleEdit(comment.id)}
                    >
                      <FaSave color="white" />
                    </button>
                  </>
                ) : (
                  <span className="comment-text">{comment.content}</span>
                )}

                {sessionUser?.id === comment.user_id && (
                  <div className="comment-actions">
                    <button
                      className="edit-comment-button"
                      onClick={() => {
                        setEditingCommentId(comment.id);
                        setEditedContent(comment.content);
                      }}
                    >
                      <FaEdit color="white" />
                    </button>
                    <button
                      className="delete-comment-button"
                      onClick={() => handleDelete(comment.id)}
                    >
                      <FaTrashAlt color="white" />
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhotosDetailsModal;
