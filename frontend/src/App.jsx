import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginFormPage from "./components/LoginFormPage/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
import Navigation from "./components/Navigation";

import * as sessionActions from "./store/session";

import PhotosPage from "./components/PhotosPage/PhotosPage";
import AlbumsPage from "./components/AlbumsPage/AlbumsPage";
import FavoritesPage from "./components/FavoritesPage/FavoritesPage";
import CommentsPage from "./components/CommentsPage/CommentsPage";

import UserProfilePage from "./components/UserProfilePage/UserProfilePage";

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
      { path: "/", element: <h1>See the world through a different lens</h1> },
      { path: "users/:userId", element: <UserProfilePage /> },
      { path: "login", element: <LoginFormPage /> },
      { path: "signup", element: <SignupFormPage /> },
      {
        path: "photos",
        element: <PhotosPage />,
        children: [
          { index: true, element: <PhotosPage /> },
          { path: "new", element: <PhotosPage /> },
          { path: ":photoId/edit", element: <PhotosPage /> },
        ],
      },
      {
        path: "albums",
        element: <AlbumsPage />,
        children: [
          { index: true, element: <AlbumsPage /> },
          { path: "new", element: <AlbumsPage /> },
          { path: ":albumId/edit", element: <AlbumsPage /> },
        ],
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
        children: [{ index: true, element: <FavoritesPage /> }],
      },
      {
        path: "comments",
        element: <CommentsPage />,
        children: [{ index: true, element: <CommentsPage /> }],
      },
      { path: "search", element: <SearchResults /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
