const SET_COMMENTS = "comments/SET_COMMENTS";
const ADD_COMMENT = "comments/ADD_COMMENT";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";

export const setComments = (comments) => ({ type: SET_COMMENTS, comments });
export const addComment = (comment) => ({ type: ADD_COMMENT, comment });
export const updateComment = (comment) => ({ type: UPDATE_COMMENT, comment });
export const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId,
});

export const fetchComments = (photoId) => async (dispatch) => {
  const res = await fetch(`/api/photos/${photoId}/comments`);
  if (res.ok) {
    const data = await res.json();
    dispatch(setComments(data));
  } else {
    console.error("Failed to fetch comments");
  }
};

export const createComment = (photoId, commentData) => async (dispatch) => {
  const res = await fetch(`/api/photos/${photoId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData),
  });

  if (res.ok) {
    const newComment = await res.json();
    dispatch(addComment(newComment));
    return newComment;
  } else {
    const error = await res.json();
    console.error("Create comment failed:", error);
    return null;
  }
};

export const editComment = (commentId, commentData) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData),
  });

  if (res.ok) {
    const updatedComment = await res.json();
    dispatch(updateComment(updatedComment));
    return updatedComment;
  } else {
    const error = await res.json();
    console.error("Edit comment failed:", error);
    return null;
  }
};

export const removeComment = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteComment(commentId));
    return true;
  } else {
    const error = await res.json();
    console.error("Delete comment failed:", error);
    return false;
  }
};

const initialState = { all: [] };

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMMENTS:
      return { ...state, all: action.comments };
    case ADD_COMMENT:
      return { ...state, all: [action.comment, ...state.all] };
    case UPDATE_COMMENT:
      return {
        ...state,
        all: state.all.map((c) =>
          c.id === action.comment.id ? action.comment : c
        ),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        all: state.all.filter((c) => c.id !== action.commentId),
      };
    default:
      return state;
  }
}
