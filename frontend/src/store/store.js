import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import sessionReducer from "./session";
import photosReducer from "./photos";
import albumsReducer from "./albums";
import commentsReducer from "./comments";
import favoritesReducer from "./favorites";
import userProfileReducer from "./userProfile"; // ✅ NEW

// Import redux-logger dynamically only in development
let logger;
if (process.env.NODE_ENV === "development") {
  import("redux-logger").then((module) => {
    logger = module.default;
  });
}

const rootReducer = combineReducers({
  session: sessionReducer,
  photos: photosReducer,
  albums: albumsReducer,
  comments: commentsReducer,
  favorites: favoritesReducer,
  userProfile: userProfileReducer,
});

const configureAppStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      const middlewares = getDefaultMiddleware();
      if (logger) {
        middlewares.push(logger);
      }
      return middlewares;
    },
    devTools: process.env.NODE_ENV !== "production",
  });
};

export default configureAppStore;
