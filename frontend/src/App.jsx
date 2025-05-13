import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginFormPage from "./components/LoginFormPage/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
import Navigation from "./components/Navigation";

import * as sessionActions from "./store/session";

import PhotoList from "./components/PhotosPage/PhotoList";
import AlbumList from "./components/AlbumsPage/AlbumList";
import AlbumForm from "./components/AlbumsPage/AlbumForm";

import FavoriteList from "./components/FavoritesPage/FavoritesList";
import FavoriteButton from "./components/FavoritesPage/FavoriteButton";

import CommentList from "./components/CommentsPage/CommentList";
import CommentForm from "./components/CommentsPage/CommentForm";

// 🔍 NEW: Placeholder search results component
function SearchResults() {
  const queryParams = new URLSearchParams(window.location.search);
  const query = queryParams.get("query");

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Results</h2>
      <p>
        Searching for: <strong>{query}</strong>
      </p>
      {/* You can wire this up to Redux or backend later */}
    </div>
  );
}

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <h1>Welcome!</h1> },
      { path: "login", element: <LoginFormPage /> },
      { path: "signup", element: <SignupFormPage /> },
      { path: "photos", element: <PhotoList /> },
      {
        path: "albums",
        children: [
          { index: true, element: <AlbumList /> },
          { path: "new", element: <AlbumForm /> },
          { path: ":albumId/edit", element: <AlbumForm /> },
        ],
      },
      {
        path: "favorites",
        children: [
          { index: true, element: <FavoriteList /> },
          { path: "button", element: <FavoriteButton photoId={1} /> },
        ],
      },
      {
        path: "photos/:photoId",
        children: [
          { path: "comments", element: <CommentList comments={[]} /> },
          { path: "comments/new", element: <CommentForm /> },
          { path: "comments/:commentId/edit", element: <CommentForm /> },
        ],
      },
      // 🔍 NEW: Search results route
      {
        path: "search",
        element: <SearchResults />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
