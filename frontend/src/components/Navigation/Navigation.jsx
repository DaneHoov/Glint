import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import * as sessionActions from "../../store/session";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RiCameraLensAiFill } from "react-icons/ri";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const location = useLocation();
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Auto-redirect to profile if logged in and on login/signup pages
    if (
      sessionUser &&
      (location.pathname === "/login" || location.pathname === "/signup")
    ) {
      navigate(`/users/${sessionUser.id}`);
    }
  }, [sessionUser, location.pathname, navigate]);

  const toggleSearch = () => setShowSearch((prev) => !prev);
  const closeSearch = () => {
    setShowSearch(false);
    setSearchQuery("");
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
    }
  };

  const hideNavRight =
    location.pathname === "/login" || location.pathname === "/signup";

  const sessionLinks = sessionUser ? (
    <>
      <FaMagnifyingGlass
        className="search-icon logged-in"
        onClick={toggleSearch}
      />
      <ProfileButton user={sessionUser} logout={logout} />
    </>
  ) : (
    <>
      <FaMagnifyingGlass className="search-icon" onClick={toggleSearch} />
      <NavLink className="nav-link" to="/login">
        Log In
      </NavLink>
      <NavLink className="nav-link signup" to="/signup">
        Sign Up
      </NavLink>
    </>
  );

  return (
    <>
      {showSearch && (
        <div className="search-bar-container">
          <button className="search-close" onClick={closeSearch}>
            ×
          </button>
          <input
            className="search-input"
            type="text"
            placeholder="photos, people, or groups"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
      )}

      <nav className="navigation-bar">
        <div className="nav-left">
          <NavLink className="nav-home" to="/">
            <RiCameraLensAiFill className="logo-icon" />
            <span className="logo-text">Glint</span>
          </NavLink>
        </div>

        {!hideNavRight && (
          <div className="nav-right">{isLoaded && sessionLinks}</div>
        )}
      </nav>
    </>
  );
}

export default Navigation;
