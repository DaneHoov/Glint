import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import sessionReducer from "./session";
import photosReducer from "./photos";
import albumsReducer from "./albums";
import commentsReducer from "./comments";
import favoritesReducer from "./favorites";

const rootReducer = combineReducers({
  session: sessionReducer,
  photos: photosReducer,
  albums: albumsReducer,
  comments: commentsReducer,
  favorites: favoritesReducer,
});

let enhancer;

if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
