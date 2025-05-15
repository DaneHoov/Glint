import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

function UserProfilePage() {
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="user-profile-page" style={{ padding: "2rem" }}>
      <h1>{user.username}&#39;s Profile</h1>
      <div className="profile-card-container">
        <div className="profile-card" onClick={() => navigate("/photos")}>
          <h2>My Photos</h2>
          <p>View and manage your uploaded photos</p>
        </div>
        <div className="profile-card" onClick={() => navigate("/albums")}>
          <h2>My Albums</h2>
          <p>View and manage your photo albums</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
