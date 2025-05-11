import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginFormPage from "./components/LoginFormPage/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
import Navigation from "./components/Navigation";

import * as sessionActions from "./store/session";

// Feature pages
import PhotoList from "./components/Photos/PhotoList";
import AlbumList from "./components/Albums/AlbumList";
import FavoriteList from "./components/Favorites/FavoriteList";
import CommentList from "./components/Comments/CommentList"; // Optional

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
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "photos",
        element: <PhotoList />,
      },
      {
        path: "albums",
        element: <AlbumList />,
      },
      {
        path: "favorites",
        element: <FavoriteList />,
      },
      {
        path: "comments",
        element: <CommentList comments={[]} />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
