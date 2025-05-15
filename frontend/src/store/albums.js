import { csrfFetch } from "./csrf";

const SET_ALBUMS = "albums/SET_ALBUMS";
const ADD_ALBUM = "albums/ADD_ALBUM";
const UPDATE_ALBUM = "albums/UPDATE_ALBUM";
const DELETE_ALBUM = "albums/DELETE_ALBUM";
const ADD_PHOTO_TO_ALBUM = "albums/ADD_PHOTO_TO_ALBUM";
const REMOVE_PHOTO_FROM_ALBUM = "albums/REMOVE_PHOTO_FROM_ALBUM";

export const setAlbums = (albums) => ({ type: SET_ALBUMS, albums });
export const addAlbum = (album) => ({ type: ADD_ALBUM, album });
export const updateAlbum = (album) => ({ type: UPDATE_ALBUM, album });
export const deleteAlbum = (albumId) => ({ type: DELETE_ALBUM, albumId });
export const addPhotoToAlbum = (albumId, photo) => ({
  type: ADD_PHOTO_TO_ALBUM,
  albumId,
  photo,
});
export const removePhotoFromAlbum = (albumId, photoId) => ({
  type: REMOVE_PHOTO_FROM_ALBUM,
  albumId,
  photoId,
});

// Fetch albums with photo
export const fetchAlbums = () => async (dispatch) => {
  const res = await csrfFetch("/api/albums");
  if (res.ok) {
    const data = await res.json();
    dispatch(setAlbums(data));
  } else {
    console.error("Failed to fetch albums");
  }
};

// Create album with photos
export const createAlbum = (albumData) => async (dispatch) => {
  const res = await csrfFetch("/api/albums", {
    method: "POST",
    body: JSON.stringify(albumData),
  });

  if (res.ok) {
    const newAlbum = await res.json();
    dispatch(addAlbum(newAlbum));
    return newAlbum;
  } else {
    const error = await res.json();
    console.error("Create album failed:", error);
    return null;
  }
};

// Edit album with new photo IDs
export const editAlbum = (albumId, albumData) => async (dispatch) => {
  const res = await csrfFetch(`/api/albums/${albumId}`, {
    method: "PUT",
    body: JSON.stringify(albumData),
  });

  if (res.ok) {
    const updatedAlbum = await res.json();
    dispatch(updateAlbum(updatedAlbum));
    return updatedAlbum;
  } else {
    const error = await res.json();
    console.error("Edit album failed:", error);
    return null;
  }
};

// Remove album
export const removeAlbum = (albumId) => async (dispatch) => {
  const res = await csrfFetch(`/api/albums/${albumId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteAlbum(albumId));
    return true;
  } else {
    const error = await res.json();
    console.error("Delete album failed:", error);
    return false;
  }
};

// Add photo to album
export const addPhotoToAlbumThunk = (albumId, photoId) => async (dispatch) => {
  const res = await csrfFetch(`/api/albums/${albumId}/photos`, {
    method: "POST",
    body: JSON.stringify({ photo_id: photoId }),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addPhotoToAlbum(albumId, data));
  } else {
    console.error("Failed to add photo to album");
  }
};

// Remove photo from album
export const removePhotoFromAlbumThunk =
  (albumId, photoId) => async (dispatch) => {
    const res = await csrfFetch(`/api/albums/${albumId}/photos/${photoId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      dispatch(removePhotoFromAlbum(albumId, photoId));
    } else {
      console.error("Failed to remove photo from album");
    }
  };

const initialState = { all: [] };

export default function albumsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALBUMS:
      return { ...state, all: action.albums };
    case ADD_ALBUM:
      return { ...state, all: [action.album, ...state.all] };
    case UPDATE_ALBUM:
      return {
        ...state,
        all: state.all.map((a) =>
          a.id === action.album.id ? action.album : a
        ),
      };
    case DELETE_ALBUM:
      return {
        ...state,
        all: state.all.filter((a) => a.id !== action.albumId),
      };
    case ADD_PHOTO_TO_ALBUM: {
      const newState = { ...state };
      const album = newState.all.find((a) => a.id === action.albumId);
      if (album) {
        album.photos.push(action.photo);
      }
      return newState;
    }
    case REMOVE_PHOTO_FROM_ALBUM: {
      const newState = { ...state };
      const album = newState.all.find((a) => a.id === action.albumId);
      if (album) {
        album.photos = album.photos.filter(
          (photo) => photo.id !== action.photoId
        );
      }
      return newState;
    }
    default:
      return state;
  }
}
