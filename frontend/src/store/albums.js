const SET_ALBUMS = "albums/SET_ALBUMS";
const ADD_ALBUM = "albums/ADD_ALBUM";
const UPDATE_ALBUM = "albums/UPDATE_ALBUM";
const DELETE_ALBUM = "albums/DELETE_ALBUM";

export const setAlbums = (albums) => ({ type: SET_ALBUMS, albums });
export const addAlbum = (album) => ({ type: ADD_ALBUM, album });
export const updateAlbum = (album) => ({ type: UPDATE_ALBUM, album });
export const deleteAlbum = (albumId) => ({ type: DELETE_ALBUM, albumId });

export const fetchAlbums = () => async (dispatch) => {
  const res = await fetch("/api/albums");
  if (res.ok) {
    const data = await res.json();
    dispatch(setAlbums(data));
  } else {
    console.error("Failed to fetch albums");
  }
};

export const createAlbum = (albumData) => async (dispatch) => {
  const res = await fetch("/api/albums", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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

export const editAlbum = (albumId, albumData) => async (dispatch) => {
  const res = await fetch(`/api/albums/${albumId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
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

export const removeAlbum = (albumId) => async (dispatch) => {
  const res = await fetch(`/api/albums/${albumId}`, {
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
    default:
      return state;
  }
}
