const SET_FAVORITES = "favorites/SET_FAVORITES";
const ADD_FAVORITE = "favorites/ADD_FAVORITE";
const REMOVE_FAVORITE = "favorites/REMOVE_FAVORITE";

export const setFavorites = (favorites) => ({ type: SET_FAVORITES, favorites });
export const addFavorite = (photo) => ({ type: ADD_FAVORITE, photo });
export const removeFavorite = (photoId) => ({ type: REMOVE_FAVORITE, photoId });

export const fetchFavorites = () => async (dispatch) => {
  const res = await fetch("/api/favorites");
  if (res.ok) {
    const data = await res.json();
    dispatch(setFavorites(data));
  } else {
    console.error("Failed to fetch favorites");
  }
};

export const createFavorite = (photoId) => async (dispatch) => {
  const res = await fetch(`/api/photos/${photoId}/favorite`, {
    method: "POST",
  });

  if (res.ok) {
    const favoritedPhoto = await res.json();
    dispatch(addFavorite(favoritedPhoto));
    return favoritedPhoto;
  } else {
    const error = await res.json();
    console.error("Create favorite failed:", error);
    return null;
  }
};

export const deleteFavorite = (photoId) => async (dispatch) => {
  const res = await fetch(`/api/photos/${photoId}/favorite`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeFavorite(photoId));
    return true;
  } else {
    const error = await res.json();
    console.error("Delete favorite failed:", error);
    return false;
  }
};

const initialState = { all: [] };

export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FAVORITES:
      return { ...state, all: action.favorites };
    case ADD_FAVORITE:
      return { ...state, all: [action.photo, ...state.all] };
    case REMOVE_FAVORITE:
      return {
        ...state,
        all: state.all.filter((p) => p.id !== action.photoId),
      };
    default:
      return state;
  }
}
