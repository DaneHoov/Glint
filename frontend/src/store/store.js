import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux"; // Ensure combineReducers is imported
import sessionReducer from "./session";
import photosReducer from "./photos";
import albumsReducer from "./albums";
import commentsReducer from "./comments";
import favoritesReducer from "./favorites";

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
});

const configureAppStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      const middlewares = getDefaultMiddleware(); // Using getDefaultMiddleware
      if (logger) {
        middlewares.push(logger); // Conditionally apply logger middleware
      }
      return middlewares;
    },
    devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in non-production mode
  });
};

export default configureAppStore;
