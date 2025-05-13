import { csrfFetch } from "./csrf";

const SET_PHOTOS = "photos/SET";
const ADD_PHOTO = "photos/ADD";
const UPDATE_PHOTO = "photos/UPDATE";
const DELETE_PHOTO = "photos/DELETE";

export const setPhotos = (photos) => ({ type: SET_PHOTOS, photos });
export const addPhoto = (photo) => ({ type: ADD_PHOTO, photo });
export const updatePhoto = (photo) => ({ type: UPDATE_PHOTO, photo });
export const deletePhoto = (photoId) => ({ type: DELETE_PHOTO, photoId });

export const fetchPhotos = () => async (dispatch) => {
  const res = await csrfFetch("/api/photos");
  if (res.ok) {
    const data = await res.json();
    dispatch(setPhotos(data.photos));
  } else {
    console.error("Failed to load photos");
  }
};

export const createPhoto = (photo) => async (dispatch) => {
  const res = await csrfFetch("/api/photos", {
    method: "POST",
    body: JSON.stringify(photo),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addPhoto(data));
    return data;
  } else {
    console.error("Failed to create photo");
    return null;
  }
};

export const editPhoto = (photo) => async (dispatch) => {
  const res = await csrfFetch(`/api/photos/${photo.id}`, {
    method: "PUT",
    body: JSON.stringify(photo),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(updatePhoto(data));
    return data;
  } else {
    console.error("Failed to edit photo");
    return null;
  }
};

export const removePhoto = (photoId) => async (dispatch) => {
  const res = await csrfFetch(`/api/photos/${photoId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deletePhoto(photoId));
    return true;
  } else {
    console.error("Failed to delete photo");
    return false;
  }
};

const initialState = { allPhotos: [] };

export default function photosReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PHOTOS:
      return { ...state, allPhotos: action.photos };
    case ADD_PHOTO:
      return { ...state, allPhotos: [action.photo, ...state.allPhotos] };
    case UPDATE_PHOTO:
      return {
        ...state,
        allPhotos: state.allPhotos.map((p) =>
          p.id === action.photo.id ? action.photo : p
        ),
      };
    case DELETE_PHOTO:
      return {
        ...state,
        allPhotos: state.allPhotos.filter((p) => p.id !== action.photoId),
      };
    default:
      return state;
  }
}
