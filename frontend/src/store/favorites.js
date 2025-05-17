import { csrfFetch } from "./csrf";

// Action Types
const SET_FAVORITES = "favorites/SET_FAVORITES";
const SET_FAVORITE_COUNT = "favorites/SET_FAVORITE_COUNT";

// Action Creators
const setFavorites = (favorites) => ({
  type: SET_FAVORITES,
  favorites,
});

const setFavoriteCount = (photoId, count) => ({
  type: SET_FAVORITE_COUNT,
  photoId,
  count,
});

// Thunks

export const fetchFavorites = () => async (dispatch) => {
  const res = await csrfFetch("/api/favorites/current");
  if (res.ok) {
    const data = await res.json();
    dispatch(setFavorites(data.favorites));
  }
};

export const addFavorite = (photoId) => async (dispatch) => {
  const res = await csrfFetch(`/api/favorites/photo/${photoId}`, {
    method: "POST",
  });

  const data = await res.json();
  dispatch(setFavoriteCount(photoId, data.count));
  dispatch(setFavorites(data.favorites));
};

export const removeFavorite = (photoId) => async (dispatch) => {
  const res = await csrfFetch(`/api/favorites/photo/${photoId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(setFavoriteCount(photoId, data.count));
    dispatch(setFavorites(data.favorites));
    return true;
  } else {
    const error = await res.json();
    console.error("Failed to remove favorite:", error);
    return false;
  }
};

export const fetchFavoriteCount = (photoId) => async (dispatch) => {
  const res = await csrfFetch(`/api/favorites/photo/${photoId}/count`);
  if (res.ok) {
    const data = await res.json();
    dispatch(setFavoriteCount(photoId, data.count));
    return data.hasFavorited;
  } else {
    throw new Error("Failed to fetch favorite count");
  }
};

// Initial State
const initialState = {
  allFavorites: [],
  favoriteCounts: {},
};

// Reducer
export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FAVORITES:
      return {
        ...state,
        allFavorites: action.favorites,
      };
    case SET_FAVORITE_COUNT:
      return {
        ...state,
        favoriteCounts: {
          ...state.favoriteCounts,
          [action.photoId]: action.count,
        },
      };
    default:
      return state;
  }
}
