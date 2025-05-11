import { csrfFetch } from "./csrf";

const LOAD_PHOTOS = "photos/LOAD";
const ADD_PHOTO = "photos/ADD";
const UPDATE_PHOTO = "photos/UPDATE";
const DELETE_PHOTO = "photos/DELETE";

const loadPhotos = (photos) => ({
  type: LOAD_PHOTOS,
  photos,
});

const addPhoto = (photo) => ({
  type: ADD_PHOTO,
  photo,
});

const updatePhoto = (photo) => ({
  type: UPDATE_PHOTO,
  photo,
});

const deletePhoto = (photoId) => ({
  type: DELETE_PHOTO,
  photoId,
});

export const fetchPhotos = () => async (dispatch) => {
  const res = await csrfFetch("/api/photos");
  if (res.ok) {
    const data = await res.json();
    dispatch(loadPhotos(data.photos));
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
  }
};

export const removePhoto = (photoId) => async (dispatch) => {
  const res = await csrfFetch(`/api/photos/${photoId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deletePhoto(photoId));
  }
};

const initialState = { allPhotos: [] };

export default function photosReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PHOTOS:
      return { ...state, allPhotos: action.photos };
    case ADD_PHOTO:
      return { ...state, allPhotos: [...state.allPhotos, action.photo] };
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
