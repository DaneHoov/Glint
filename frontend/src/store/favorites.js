import { csrfFetch } from "./csrf";

const SET_FAVORITES = "favorites/SET_FAVORITES";
const ADD_FAVORITE = "favorites/ADD_FAVORITE";
const REMOVE_FAVORITE = "favorites/REMOVE_FAVORITE";

export const setFavorites = (favorites) => ({ type: SET_FAVORITES, favorites });
export const addFavorite = (favorite) => ({ type: ADD_FAVORITE, favorite });
export const removeFavorite = (favoriteId) => ({
  type: REMOVE_FAVORITE,
  favoriteId,
});

// Fetch favorites
export const fetchFavorites = () => async (dispatch) => {
  const res = await csrfFetch("/api/favorites");
  if (res.ok) {
    const data = await res.json();
    dispatch(setFavorites(data));
  } else {
    console.error("Failed to fetch favorites");
  }
};

// Add favorite
export const addFavoriteThunk = (photoId) => async (dispatch) => {
  const res = await csrfFetch(`/api/favorites`, {
    method: "POST",
    body: JSON.stringify({ photoId }),
  });

  if (res.ok) {
    const newFavorite = await res.json();
    dispatch(addFavorite(newFavorite));
  } else {
    console.error("Add favorite failed");
  }
};

// Remove favorite
export const removeFavoriteThunk = (favoriteId) => async (dispatch) => {
  const res = await csrfFetch(`/api/favorites/${favoriteId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeFavorite(favoriteId));
  } else {
    console.error("Remove favorite failed");
  }
};

const initialState = { all: [] };

export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FAVORITES:
      return { ...state, all: action.favorites };
    case ADD_FAVORITE:
      return { ...state, all: [action.favorite, ...state.all] };
    case REMOVE_FAVORITE:
      return {
        ...state,
        all: state.all.filter((favorite) => favorite.id !== action.favoriteId),
      };
    default:
      return state;
  }
}
