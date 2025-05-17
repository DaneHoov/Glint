import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdPhotos } from "react-icons/io";
import { IoAlbumsSharp } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import "./UserProfile.css";

function UserProfilePage() {
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="user-profile-page" style={{ padding: "2rem" }}>
      <h1>{user.username}&#39;s Profile</h1>
      <div className="profile-card-container">
        <div
          className="profile-card photos-icon"
          onClick={() => navigate("/photos")}
        >
          <h2>My Photos</h2>
          <IoMdPhotos size={40} color="#1cc1eb" />
        </div>
        <div
          className="profile-card albums-icon"
          onClick={() => navigate("/albums")}
        >
          <h2>My Albums</h2>
          <IoAlbumsSharp size={40} color="32cd32" />
        </div>
        <div
          className="profile-card favorites-icon"
          onClick={() => navigate("/favorites")}
        >
          <h2>Favorites</h2>
          <MdFavorite size={40} color="crimson" />
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
