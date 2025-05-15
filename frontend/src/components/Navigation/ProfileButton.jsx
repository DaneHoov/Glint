import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./ProfileButton.css";

function ProfileButton({ user, logout }) {
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const closeMenu = () => setShowMenu(false);

  const handleLogout = (e) => {
    logout(e);
    closeMenu();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeMenu();
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="profile-button-container" ref={dropdownRef}>
      <button className="profile-icon-button" onClick={toggleMenu}>
        <FaUserCircle size={24} />
      </button>

      {showMenu && (
        <div className="profile-modal-dropdown">
          <div className="profile-greeting-section">
            <p className="greeting-title">‘Allo, {user.username}!</p>
            <p className="greeting-sub">
              Now you know how to greet people in English
            </p>
          </div>

          <div className="upload-section">
            <div className="upload-circle"></div>
            <div className="upload-text">
              <p>0 of 1,000 items</p>
              <button
                className="upload-link"
                onClick={() => navigate("/upload")}
              >
                Upload your photos
              </button>
            </div>
          </div>

          <hr className="dropdown-divider" />

          <button
            className="dropdown-item"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            Profile
          </button>
          <button
            className="dropdown-item"
            onClick={() => navigate("/messages")}
          >
            Messages (0)
          </button>
          <button
            className="dropdown-item"
            onClick={() => navigate("/settings")}
          >
            Settings
          </button>
          <button className="dropdown-item logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
