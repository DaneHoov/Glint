import { csrfFetch } from "./csrf";

const SET_COMMENTS = "comments/SET_COMMENTS";
const ADD_COMMENT = "comments/ADD_COMMENT";
const EDIT_COMMENT = "comments/EDIT_COMMENT";
const REMOVE_COMMENT = "comments/REMOVE_COMMENT";

// Action creators
export const setComments = (photoId, comments) => ({
  type: SET_COMMENTS,
  photoId,
  comments,
});

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

export const editCommentAction = (comment) => ({
  type: EDIT_COMMENT,
  comment,
});

export const removeCommentAction = (commentId, photoId) => ({
  type: REMOVE_COMMENT,
  commentId,
  photoId,
});

// Thunks

export const fetchComments = (photoId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/photo/${photoId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(setComments(photoId, data.comments));
  }
};

export const createComment = (photoId, content) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/photo/${photoId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  if (res.ok) {
    const newComment = await res.json();
    dispatch(addComment(newComment));
    return newComment;
  } else {
    return null;
  }
};

export const editComment = (commentId, updatedData) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${commentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  if (res.ok) {
    const updatedComment = await res.json();
    dispatch(editCommentAction(updatedComment));
    return updatedComment;
  }
};

export const removeComment = (commentId, photoId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeCommentAction(commentId, photoId));
  }
};

const initialState = {};

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMMENTS:
      return {
        ...state,
        [action.photoId]: action.comments,
      };

    case ADD_COMMENT: {
      const photoId = action.comment.photo_id;
      const photoComments = state[photoId] || [];
      return {
        ...state,
        [photoId]: [...photoComments, action.comment],
      };
    }

    case EDIT_COMMENT: {
      const photoId = action.comment.photo_id;
      const photoComments = state[photoId] || [];
      return {
        ...state,
        [photoId]: photoComments.map((comment) =>
          comment.id === action.comment.id ? action.comment : comment
        ),
      };
    }

    case REMOVE_COMMENT: {
      const { commentId, photoId } = action;
      const photoComments = state[photoId] || [];
      return {
        ...state,
        [photoId]: photoComments.filter((comment) => comment.id !== commentId),
      };
    }

    default:
      return state;
  }
}
