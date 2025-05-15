import { csrfFetch } from "./csrf";

const SET_COMMENTS = "comments/SET_COMMENTS";
const ADD_COMMENT = "comments/ADD_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";

// Action creators
export const setComments = (comments) => ({ type: SET_COMMENTS, comments });
export const addComment = (comment) => ({ type: ADD_COMMENT, comment });
export const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId,
});
export const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  comment,
});

// Fetch comments
export const fetchComments = (photoId) => async (dispatch) => {
  const res = await csrfFetch(`/api/photos/${photoId}/comments`);
  if (res.ok) {
    const data = await res.json();
    dispatch(setComments(data));
  } else {
    console.error("Failed to fetch comments");
  }
};

// Create comment
export const createComment = (photoId, commentData) => async (dispatch) => {
  const res = await csrfFetch(`/api/photos/${photoId}/comments`, {
    method: "POST",
    body: JSON.stringify(commentData),
  });

  if (res.ok) {
    const newComment = await res.json();
    dispatch(addComment(newComment));
  } else {
    console.error("Create comment failed");
  }
};

// Edit comment
export const editComment = (commentId, commentData) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${commentId}`, {
    method: "PUT",
    body: JSON.stringify(commentData),
  });

  if (res.ok) {
    const updatedComment = await res.json();
    dispatch(updateComment(updatedComment));
  } else {
    console.error("Edit comment failed");
  }
};

// Delete comment
export const removeComment = (commentId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteComment(commentId));
  } else {
    console.error("Delete comment failed");
  }
};

const initialState = { all: [] };

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMMENTS:
      return { ...state, all: action.comments };
    case ADD_COMMENT:
      return { ...state, all: [action.comment, ...state.all] };
    case DELETE_COMMENT:
      return {
        ...state,
        all: state.all.filter((comment) => comment.id !== action.commentId),
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        all: state.all.map((c) =>
          c.id === action.comment.id ? action.comment : c
        ),
      };
    default:
      return state;
  }
}
