import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { RiCameraLensAiFill } from "react-icons/ri";
import "./Navigation.css";

function Navigation({ isLoaded, onLogout }) {
  const location = useLocation();
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
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

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
    }
  };

  const hideNavRight =
    location.pathname === "/login" || location.pathname === "/signup";

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

          {isLoaded && sessionUser && (
            <>
              <NavLink className="nav-link" to={`/users/${sessionUser.id}`}>
                Profile
              </NavLink>
              <NavLink className="nav-link" to="/photos">
                Photos
              </NavLink>
              <NavLink className="nav-link" to="/albums">
                Albums
              </NavLink>
              <NavLink className="nav-link" to="/favorites">
                Favorites
              </NavLink>
            </>
          )}
        </div>

        {!hideNavRight && (
          <div className="nav-right">
            {isLoaded && (
              <>
                <FaMagnifyingGlass
                  className="search-icon logged-in"
                  onClick={toggleSearch}
                />
                {sessionUser ? (
                  <ProfileButton user={sessionUser} logout={onLogout} />
                ) : (
                  <>
                    <NavLink className="nav-link" to="/login">
                      Log In
                    </NavLink>
                    <NavLink className="nav-link signup" to="/signup">
                      Sign Up
                    </NavLink>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navigation;
