import { csrfFetch } from "./csrf";
import { removeFavoriteByPhotoId } from "./favorites"; // ✅ NEW: import

// Action Types
const SET_PHOTOS = "photos/SET_PHOTOS";
const ADD_PHOTO = "photos/ADD_PHOTO";
const DELETE_PHOTO = "photos/DELETE_PHOTO";

// Action Creators
export const setPhotos = (photos) => ({ type: SET_PHOTOS, photos });
export const addPhoto = (photo) => ({ type: ADD_PHOTO, photo });
export const deletePhoto = (photoId) => ({ type: DELETE_PHOTO, photoId });

// Thunks
export const fetchPhotos = () => async (dispatch) => {
  const res = await csrfFetch("/api/photos");
  if (res.ok) {
    const data = await res.json();
    dispatch(setPhotos(data.photos));
  } else {
    console.error("Failed to fetch photos");
  }
};

export const createPhoto = (photoData) => async (dispatch) => {
  const res = await csrfFetch("/api/photos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(photoData),
  });

  if (res.ok) {
    const newPhoto = await res.json();
    dispatch(addPhoto(newPhoto));
    return newPhoto;
  } else {
    return null;
  }
};

export const removePhoto = (photoId) => async (dispatch) => {
  const res = await csrfFetch(`/api/photos/${photoId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deletePhoto(photoId));        
    dispatch(removeFavoriteByPhotoId(photoId));
  } else {
    console.error("Delete photo failed");
  }
};

// Reducer
const initialState = { all: [] };

export default function photosReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PHOTOS:
      return { ...state, all: action.photos };
    case ADD_PHOTO:
      return { ...state, all: [action.photo, ...state.all] };
    case DELETE_PHOTO:
      return {
        ...state,
        all: state.all.filter((photo) => photo.id !== action.photoId),
      };
    default:
      return state;
  }
}
